"use client";

import { MintProjectDialog } from "@/components/dialogs/mint-project-dialog";
import MintFirstProject from "@/components/features/MintFirstProject";
import { SharePortfolioButton } from "@/components/portfolio/share-portfolio-button";
import { Button } from "@/components/ui/button";
import ConnectCard from "@/components/ui/ConnectCard";
import ProjectCard from "@/components/ui/ProjectCard";
import ShareCard from "@/components/ui/ShareCard";
import { addressToSlug } from "@/lib/slug-actions";
import { RotateCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";

export default function Portfolio() {
  const { address, isConnected } = useAccount();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNFTs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/alchemy/get-project-nft?owner=${address}`);
      const data = await res.json();
      setProjects(data.ownedNfts || []);
    } catch (err) {
      console.error("Failed to fetch NFTs:", err);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (!address || !isConnected) return;
    fetchNFTs();
  }, [address, isConnected]);

  const refreshNFTs = async () => {
    await fetchNFTs();
  };

  const url = address
    ? `http://localhost:3000/browse/project/${addressToSlug(address)}`
    : "";

  return (
    <>
      <div className="w-full grow flex flex-co justify-center ">
        <main className="container mx-auto px-6 py-12">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Your NFT Portfolio
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage and showcase your blockchain-verified projects
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={refreshNFTs} variant={"outline"}><RotateCw /></Button>
                <SharePortfolioButton url={url} variant="outline" />
                <MintProjectDialog refreshNFTs={refreshNFTs} />
              </div>
            </div>

            {/* Portfolio Preview Card */}
            <ShareCard url={url} />

            {loading ? (
              <ProjectCard />
            ) : (
              <div className="grid gap-6">
                {projects.map((nft) => (
                  <ProjectCard
                    nft={nft}
                    key={`${nft.contract.address}-${nft.tokenId}`}
                    address={address}
                  />
                ))}
              </div>
            )}

            {projects.length === 0 && !loading && (
              <MintFirstProject refreshNFTs={refreshNFTs} />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
