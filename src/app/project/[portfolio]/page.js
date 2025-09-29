"use client";

import { MintProjectDialog } from "@/components/dialogs/mint-project-dialog";
import MintFirstProject from "@/components/features/MintFirstProject";
import { SharePortfolioButton } from "@/components/portfolio/share-portfolio-button";
import ConnectCard from "@/components/ui/ConnectCard";
import ProjectCard from "@/components/ui/ProjectCard";
import ShareCard from "@/components/ui/ShareCard";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

export default function Portfolio() {
  const { address, isConnected } = useAccount();
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      if (!address) return;
      try {
        const res = await fetch("/api/projects");
        const allProjects = await res.json();
        const filtered = allProjects.filter((p) => p.address === address);
        setUserNFTs(filtered);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }
    fetchProjects();
  }, [address]);

  const handleMintSuccess = (newProject) => {
    setUserNFTs((prev) => [{ ...newProject, verified: true }, ...prev]);
  };
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
                <SharePortfolioButton url="" variant="outline" />
                <MintProjectDialog onMintSuccess={handleMintSuccess} />
              </div>
            </div>

            {/* Portfolio Preview Card */}
            {userNFTs.length > 0 && <ShareCard />}

            <div className="grid gap-6">
              {userNFTs.map((nft) => (
                <ProjectCard nft={nft} key={nft.id} />
              ))}
            </div>

            {userNFTs.length === 0 && (
              <MintFirstProject handleMintSuccess={handleMintSuccess} />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

