"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useAccount } from "wagmi";

import {
  Wallet,
  Plus,
  ExternalLink,
  Github,
  FileText,
  Award,
  Share2,
} from "lucide-react";
import { SharePortfolioButton } from "@/components/portfolio/share-portfolio-button";
import { MintProjectDialog } from "@/components/dialogs/mint-project-dialog";
import { Badge } from "@/components/ui/badge";
import { VerificationDialog } from "@/components/dialogs/verification-dialog";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [userNFTs, setUserNFTs] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack React application with payment integration and admin dashboard",
      githubUrl: "https://github.com/student/ecommerce-app",
      portfolioUrl: "https://portfolio.example.com/ecommerce",
      skills: ["React", "Node.js", "MongoDB", "Stripe"],
      mintDate: "2024-01-15",
      tokenId: "#001",
      verified: true,
    },
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
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <main className="container mx-auto px-6 py-12">
        {!isConnected ? (
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-balance leading-tight">
                Showcase Your Projects as{" "}
                <span className="text-green-700">Verifiable NFTs</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
                Transform your academic and personal projects into
                blockchain-verified credentials. Create an immutable portfolio
                that employers and educators can trust.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-6 h-6 " /></div>
                  <CardTitle className="text-lg">Connect Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sign in with your crypto wallet using MetaMask or
                    WalletConnect
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">Mint Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Upload project details and mint them as NFTs on the
                    blockchain
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                 <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6" />
                  </div> <CardTitle className="text-lg">Share Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get a shareable link to your verified portfolio for
                    employers
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              {isConnected ? address : "Connect Wallet"}
            </Button>
          </div>
        ) : (
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
            {userNFTs.length > 0 && (
              <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 " />
                    Your Public Portfolio
                  </CardTitle>
                  <CardDescription>
                    Share this link with employers and educators to showcase
                    your verified projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                    <code className="text-sm text-muted-foreground font-mono">
                      /portfolio/{address.slice(0, 6)}...{address.slice(-4)}
                    </code>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href="" target="_blank" rel="noopener noreferrer">
                          Preview
                        </a>
                      </Button>
                      <SharePortfolioButton url="" variant="outline" /></div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6">
              {userNFTs.map((nft) => (
                <Card key={nft.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-xl">{nft.title}</CardTitle>
                          <Badge variant="outline" className="font-mono text-xs">
                            {nft.tokenId}
                          </Badge>
                          {nft.verified && (
                            <Badge variant="default" className="gap-1 bg-accent text-accent-foreground">
                              <Award className="w-3 h-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base leading-relaxed">{nft.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {nft.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                        <a href={nft.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      </Button>
                      {nft.portfolioUrl && (
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                          <a href={nft.portfolioUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                        <VerificationDialog project={nft} walletAddress={address} />
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                      >
                        View on Etherscan
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground pt-2 border-t border-border">
                      Minted on {new Date(nft.mintDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

           {userNFTs.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <CardTitle className="mb-2">No Projects Yet</CardTitle>
                  <CardDescription className="mb-6">
                    Start building your blockchain portfolio by minting your first project
                  </CardDescription>
                  <MintProjectDialog onMintSuccess={handleMintSuccess} />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
