"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ExternalLink,
  Shield,
  CheckCircle,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import { CopyButton } from "../ui/CopyButton";

export function VerificationDialog({ project, walletAddress }) {
  const etherscanUrl = `https://sepolia.basescan.org/tx/${project?.transactionHash}`;
  const ipfsUrl = project?.raw.tokenUri.replace(
    "ipfs://",
    "https://amethyst-selective-lemming-575.mypinata.cloud/ipfs/"
  );

  const blockNumber = project?.blockNumber
    ? parseInt(project?.blockNumber, 16).toLocaleString()
    : "N/A";
  const gasUsed = project?.gasUsed
    ? parseInt(project?.gasUsed, 16).toLocaleString()
    : "N/A";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={project ? false : true}
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent"
        >
          <Shield className="w-4 h-4" />
          Verify on Blockchain
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-700" />
            Blockchain Verification
          </DialogTitle>
          <DialogDescription>
            Independent verification of NFT authenticity and ownership on the
            Ethereum blockchain
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Verification Status */}
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-700" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Badge
                  variant="default"
                  className="gap-1 bg-accent text-green-700-foreground"
                >
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </Badge>
                <span className="text-sm text-muted-foreground">
                  This NFT has been successfully verified on the blockchain
                </span>
              </div>
            </CardContent>
          </Card>

          {/* NFT Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">NFT Information</CardTitle>
              <CardDescription>
                Basic details about this NFT token
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Project Title
                  </div>
                  <div className="font-medium">{project?.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Token ID
                  </div>
                  <div className="font-mono">{project?.tokenId}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Owner Address
                  </div>
                  <div className="font-mono text-sm flex items-center gap-2">
                    <CopyButton
                      variant={"ghost"}
                      size="sm"
                      className="p-0 hover:bg-transparent"
                      value={walletAddress}
                    >
                      {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                    </CopyButton>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Network
                  </div>
                  <div>Base Sepolia</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Blockchain Transaction</CardTitle>
              <CardDescription>
                On-chain transaction details for this NFT mint
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">Transaction Hash</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {project?.transactionHash.slice(0, 10)}...
                      {project?.transactionHash.slice(-8)}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={etherscanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Etherscan
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Block Number
                    </div>
                    <div className="font-mono">{blockNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Gas Used
                    </div>
                    <div className="font-mono">{gasUsed}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Contract Address
                  </div>
                  <div className="font-mono text-sm flex items-center gap-2">
                    <CopyButton
                      variant={"ghost"}
                      size="sm"
                      className="p-0 hover:bg-transparent"
                      value={project?.contract.address}
                    >
                      {project?.contract.address.slice(0, 10)}...
                      {project?.contract.address.slice(-8)}
                    </CopyButton>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IPFS Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Decentralized Storage</CardTitle>
              <CardDescription>
                Project metadata stored on IPFS for permanent access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="text-sm font-medium">IPFS Hash</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {project?.raw.tokenUri.replace("ipfs://", "").slice(0, 10)}
                    ...
                    {project?.raw.tokenUri.replace("ipfs://", "").slice(-8)}
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Metadata
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Verification Steps */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">
                How to Verify Independently
              </CardTitle>
              <CardDescription>
                Steps for employers and educators to verify this NFT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Check Etherscan</div>
                    <div className="text-muted-foreground">
                      Click "View on Etherscan" to see the transaction on the
                      blockchain explorer
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Verify Ownership</div>
                    <div className="text-muted-foreground">
                      Confirm the NFT is owned by the wallet address shown in
                      this portfolio
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Check Metadata</div>
                    <div className="text-muted-foreground">
                      View the IPFS metadata to see the original project details
                      and links
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timestamp */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4 border-t">
            <Clock className="w-4 h-4" />
            Minted on {new Date(project?.mintedAt).toLocaleDateString()} at{" "}
            {new Date(project?.mintedAt).toLocaleTimeString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
