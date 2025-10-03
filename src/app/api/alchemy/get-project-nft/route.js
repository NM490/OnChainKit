import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");

  if (!owner) {
    return NextResponse.json(
      { error: "Owner address required" },
      { status: 400 }
    );
  }

  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  const CONTRACT_ADDRESS = "0xEf6bd98C0306BA33C5Caf85B46E55700A02Ad977";
  const NETWORK = "base-sepolia";

  try {
    // 1️⃣ Fetch owned NFTs
    const nftsUrl = `https://${NETWORK}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${owner}&contractAddresses[]=${CONTRACT_ADDRESS}`;
    const response = await fetch(nftsUrl);
    if (!response.ok) {
      const text = await response.text();
      console.error("Alchemy error:", text);
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();
    const ownedNfts = data.ownedNfts || [];
    if (ownedNfts.length === 0) {
      return NextResponse.json({ ownedNfts: [] });
    }

    // 2️⃣ Fetch mint transfers (for timestamps + tx hashes)
    const rpcUrl = `https://${NETWORK}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
    const transfersRes = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            category: ["erc721"],
            contractAddresses: [CONTRACT_ADDRESS],
            fromAddress: "0x0000000000000000000000000000000000000000",
            withMetadata: true,
          },
        ],
      }),
    });

    const transfersData = await transfersRes.json();
    const mintTransfers = transfersData?.result?.transfers || [];

    // 3️⃣ Build tokenId → enriched metadata map
    const mintMap = {};
    for (const t of mintTransfers) {
      const tokenId = BigInt(t.tokenId).toString();
      const mintedAt = t.metadata?.blockTimestamp
        ? new Date(t.metadata.blockTimestamp)
        : null;
      const transactionHash = t.hash || null;
      const blockNumber = t.blockNum ? parseInt(t.blockNum, 16) : null;

      let gasUsed = null;
      if (transactionHash) {
        try {
          const receiptRes = await fetch(rpcUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: 1,
              jsonrpc: "2.0",
              method: "eth_getTransactionReceipt",
              params: [transactionHash],
            }),
          });
          const receiptData = await receiptRes.json();
          gasUsed = receiptData?.result?.gasUsed
            ? parseInt(receiptData.result.gasUsed, 16)
            : null;
        } catch (err) {
          console.error("Receipt fetch failed:", err);
        }
      }

      mintMap[tokenId] = {
        mintedAt,
        transactionHash,
        blockNumber,
        gasUsed,
      };
    }

    // 4️⃣ Enrich owned NFTs
    const enrichedNFTs = ownedNfts.map((nft) => {
      const tokenId = BigInt(nft.tokenId).toString();
      return {
        ...nft,
        ...mintMap[tokenId], // attach mintedAt, txHash, blockNumber, gasUsed
      };
    });

    // Sort enriched NFTs by mintedAt descending (newest first)
    const sortedNFTs = enrichedNFTs.sort((a, b) => {
      const dateA = a.mintedAt ? new Date(a.mintedAt).getTime() : 0;
      const dateB = b.mintedAt ? new Date(b.mintedAt).getTime() : 0;
      return dateB - dateA; // newest first
    });

    return NextResponse.json({ ownedNfts: sortedNFTs });
  } catch (err) {
    console.error("Server error fetching NFTs:", err);
    return NextResponse.json(
      { error: "Failed to fetch NFTs" },
      { status: 500 }
    );
  }
}
