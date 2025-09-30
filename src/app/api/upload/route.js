import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
   const { jsonContent, previousHash } = await req.json();

let finalContent = [];

if (previousHash) {
  // fetch old JSON from IPFS
  const url = `https://gateway.pinata.cloud/ipfs/${previousHash}`;
  const res = await fetch(url);
  const oldData = await res.json();

  if (Array.isArray(oldData)) {
    finalContent = [...oldData, ...jsonContent];
  } else {
    finalContent = [oldData, ...jsonContent];
  }
} else {
  finalContent = jsonContent;
}

// derive filename from first object’s id
const fileName = `${finalContent.id }.json`;

const pinataRes = await axios.post(
  "https://api.pinata.cloud/pinning/pinJSONToIPFS",
  {
    pinataMetadata: {
      name: fileName, // 👈 file name is the `id`
    },
    pinataContent: finalContent,
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
  }
);

return NextResponse.json({ IpfsHash: pinataRes.data.IpfsHash });

  } catch (err) {
    console.error("Pinata upload error:", err.response?.data || err.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
