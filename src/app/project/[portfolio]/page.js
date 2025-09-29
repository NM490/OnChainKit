"use client";

import { MintProjectDialog } from "@/components/dialogs/mint-project-dialog";
import MintFirstProject from "@/components/features/MintFirstProject";
import { SharePortfolioButton } from "@/components/portfolio/share-portfolio-button";
import ConnectCard from "@/components/ui/ConnectCard";
import ProjectCard from "@/components/ui/ProjectCard";
import ShareCard from "@/components/ui/ShareCard";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Portfolio() {
  const { address, isConnected } = useAccount();
  const [userNFTs, setUserNFTs] = useState([
    // {
    //   id: 1,
    //   title: "E-Commerce Platform",
    //   description:
    //     "Full-stack React application with payment integration and admin dashboard",
    //   githubUrl: "https://github.com/student/ecommerce-app",
    //   portfolioUrl: "https://portfolio.example.com/ecommerce",
    //   skills: ["React", "Node.js", "MongoDB", "Stripe"],
    //   mintDate: "2024-01-15",
    //   tokenId: "#001",
    //   verified: true,
    // },
    {
      id: 2,
      title: "AI Chat Application",
      description:
        "Real-time chat app with AI integration and modern UI design",
      githubUrl: "https://github.com/student/ai-chat",
      portfolioUrl: "https://portfolio.example.com/ai-chat",
      skills: ["Next.js", "OpenAI", "WebSocket", "TailwindCSS"],
      mintDate: "2024-02-20",
      tokenId: "#002",
      verified: true,
    },
  ]);

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
