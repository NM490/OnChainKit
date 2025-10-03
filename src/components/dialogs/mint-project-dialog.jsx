"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Upload, Github, FileText, X, Loader2 } from "lucide-react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";
import { normalizeUrl } from "@/utils/input-actions";

const CONTRACT_ADDRESS = "0xEf6bd98C0306BA33C5Caf85B46E55700A02Ad977";

const ABI = [
  {
    inputs: [{ internalType: "string[]", name: "uris", type: "string[]" }],
    name: "safeMint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export function MintProjectDialog({refreshNFTs}) {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubUrl: "",
    portfolioUrl: "",
    skills: [],
    currentSkill: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    githubUrl: "",
    portfolioUrl: "",
  });
  const { writeContractAsync } = useWriteContract();

  const validateField = (field, value) => {
    let message = "";

    if (field === "title" && !value.trim()) {
      message = "Project title is required.";
    }

    if (field === "description" && !value.trim()) {
      message = "Project description is required.";
    }

    if (field === "githubUrl") {
      if (!value.trim()) {
        message = "GitHub repository URL is required.";
      } else if (!/^https?:\/\/(github\.com)\/.+/.test(value.trim())) {
        message = "Enter a valid GitHub URL.";
      }
    }

    if (field === "portfolioUrl" && value.trim()) {
      if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value.trim())) {
        message = "Enter a valid URL for the live demo.";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleInputChange = (field, value) => {
    // current value in state (previous before this change)
    const prevValue = formData[field] ?? "";

    // normalize whitespace
    let newValue = value;

    // Only auto-prepend when the user is *starting* to type into an empty field.
    // This prevents re-adding https:// on every keystroke/backspace.
    if (
      (field === "portfolioUrl" || field === "githubUrl") &&
      prevValue.trim() === "" && // user started from empty field
      newValue.trim().length > 0 && // there's something typed/pasted
      !/^http/i.test(newValue) // doesn't already start with http or https
    ) {
      newValue = `https://${newValue.trim()}`;
    }

    // Update state
    setFormData((prev) => ({ ...prev, [field]: newValue }));

    // Live-validate
    validateField(field, newValue);
  };

  const addSkill = () => {
    if (
      formData.currentSkill.trim() &&
      !formData.skills.includes(formData.currentSkill.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, formData.currentSkill.trim()],
        currentSkill: "",
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  async function mintProject(ipfsHash) {
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "safeMint",
        args: [[`ipfs://${ipfsHash}`]],
        value: parseEther("0.0004"),
      });

      toast("NFT Minted!", {
        description: "Your project NFT has been successfully minted.",
      });

      refreshNFTs();

      setIsLoading(false);
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        githubUrl: "",
        portfolioUrl: "",
        skills: [],
        currentSkill: "",
      });
    } catch (err) {
      toast("Minting failed", {
        description:
          "Transaction failed. Metadata will be cleaned up. Try again.",
        variant: "destructive",
      });

      try {
        await fetch("/api/pinata/delete-metadata", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cid: ipfsHash }),
        });
      } catch (cleanupErr) {
        console.error("Cleanup failed:", cleanupErr);
      }
      setIsLoading(false);
    }
  }

  async function waitForPinataMetadata(cid, maxRetries = 20, delay = 3000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const res = await fetch("/api/pinata/check-metadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cid }),
        });
        const data = await res.json();
        if (data.success) return true;
      } catch (err) {
        console.error("Error checking Pinata metadata:", err);
      }
      await new Promise((r) => setTimeout(r, delay)); // wait before retry
    }
    return false; // failed after maxRetries
  }

  async function handleMint() {
    setIsLoading(true);

    if (errors.title || errors.description || errors.githubUrl) {
      toast("Invalid Form", {
        description: "Please fix the errors before minting.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // 1️⃣ Upload metadata
      const res = await fetch("/api/pinata/upload-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          title: formData.title,
          description: formData.description,
          github: formData.githubUrl,
          liveDemo: formData.portfolioUrl,
          skills: formData.skills,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Pinata upload failed");

      const { ipfsHash } = data;

      toast("Metadata uploaded", {
        description: "Waiting for IPFS to propagate...",
      });

      const isPinned = await waitForPinataMetadata(ipfsHash);
      if (!isPinned) throw new Error("Metadata not fully pinned on Pinata");

      toast("Metadata confirmed", {
        description: "Minting your NFT now...",
      });

      await new Promise((resolve) => setTimeout(resolve, 15000));

      await mintProject(ipfsHash);
    } catch (err) {
      toast("Minting failed", {
        description:
          "Metadata may not be uploaded or accessible. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-brand text-white hover:bg-brand/10 transition dark:border-1 dark:bg-brand/20 dark:text-white dark:hover:bg-brand/30 dark:border-brand/80">
          <Plus className="w-4 h-4" />
          Mint New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Mint New Project NFT</DialogTitle>
          <DialogDescription>
            Create a blockchain-verified credential for your project. All
            information will be stored immutably on IPFS and linked to your NFT.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Information</CardTitle>
              <CardDescription>
                Basic details about your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 relative pb-4">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., E-Commerce Platform"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  onBlur={(e) => validateField("title", e.target.value)}
                />
                <p
                  className={`text-red-500 text-xs absolute bottom-0 left-0 ${
                    errors.title ? "" : "invisible"
                  }`}
                >
                  {errors.title}
                </p>
              </div>
              <div className="space-y-2 relative pb-4">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project, technologies used, and key features..."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  onBlur={(e) => validateField("description", e.target.value)}
                />
                <p
                  className={`text-red-500 text-xs absolute bottom-0 left-0 ${
                    errors.description ? "" : "invisible"
                  }`}
                >
                  {errors.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Links</CardTitle>
              <CardDescription>
                Links to your code repository and live demo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 relative pb-4">
                <Label htmlFor="github">GitHub Repository *</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="github"
                    placeholder="https://github.com/username/project"
                    className="pl-10"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      handleInputChange("githubUrl", e.target.value)
                    }
                    onBlur={(e) => validateField("githubUrl", e.target.value)}
                  />
                </div>
                <p
                  className={`text-red-500 text-xs absolute bottom-0 left-0 ${
                    errors.githubUrl ? "" : "invisible"
                  }`}
                >
                  {errors.githubUrl}
                </p>
              </div>

              <div className="space-y-2 relative pb-4">
                <Label htmlFor="portfolio">Live Demo / Portfolio Link</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="portfolio"
                    placeholder="https://your-project.vercel.app"
                    className="pl-10"
                    value={formData.portfolioUrl}
                    onChange={(e) =>
                      handleInputChange("portfolioUrl", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField("portfolioUrl", e.target.value)
                    }
                  />
                </div>
                <p
                  className={`text-red-500 text-xs absolute bottom-0 left-0 ${
                    errors.portfolioUrl ? "" : "invisible"
                  }`}
                >
                  {errors.portfolioUrl}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills & Technologies</CardTitle>
              <CardDescription>
                Add the technologies and skills demonstrated in this project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., React, Node.js, MongoDB"
                  value={formData.currentSkill}
                  onChange={(e) =>
                    handleInputChange("currentSkill", e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  Add
                </Button>
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Minting Info */}
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="w-5 h-5 text-brand" />
                Minting Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  • Your project metadata will be stored on IPFS for permanent
                  access
                </p>
                <p>• An ERC-721 NFT will be minted to your connected wallet</p>
                <p>
                  • The NFT will contain a tokenURI pointing to your project
                  metadata
                </p>
                <p>• Gas fees will be required for the minting transaction</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleMint}
            className="gap-2 bg-brand hover:bg-brand/50 dark:hover:bg-brand"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Minting NFT...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Mint Project NFT
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
