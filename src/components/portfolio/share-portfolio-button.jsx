"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function SharePortfolioButton({ url, variant = "default" }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "NFT Portfolio",
          text: "Check out this blockchain-verified portfolio",
          url: url,
        });
      } catch (err) {
        console.error("Error sharing: ", err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} className="gap-2">
          <Share2 className="w-4 h-4" />
          Share Portfolio
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyToClipboard} className="gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Link"}
        </DropdownMenuItem>
        {navigator.share && (
          <DropdownMenuItem onClick={shareViaWebShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share via...
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}