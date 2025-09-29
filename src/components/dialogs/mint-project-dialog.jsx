"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
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

export function MintProjectDialog({ onMintSuccess }) {
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleMint = async () => {
    setIsLoading(true);

    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const newProject = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      githubUrl: formData.githubUrl,
      portfolioUrl: formData.portfolioUrl,
      skills: formData.skills,
      mintDate: new Date().toISOString(),
      tokenId: `#${String(Date.now()).slice(-3).padStart(3, "0")}`,
      address: address || "",
    };

    // Store project in JSON file via API
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      const result = await response.json();
      if (!result.success) {
        console.error("Failed to save project:", result.error);
      }
    } catch (err) {
      console.error("Error saving project:", err);
    }

    onMintSuccess(newProject);
    setIsLoading(false);
    setOpen(false);

    // Reset form
    setFormData({
      title: "",
      description: "",
      githubUrl: "",
      portfolioUrl: "",
      skills: [],
      currentSkill: "",
    });
  };

  const isFormValid =
    formData.title && formData.description && formData.githubUrl;

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
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., E-Commerce Platform"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project, technologies used, and key features..."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
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
              <div className="space-y-2">
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
                  />
                </div>
              </div>

              <div className="space-y-2">
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
                  />
                </div>
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
            disabled={!isFormValid || isLoading}
            className="gap-2 bg-brand"
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
