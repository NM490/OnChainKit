"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, Download, Eye, Loader2 } from "lucide-react";

export function ResumeGenerator({ portfolioData }) {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeGenerated, setResumeGenerated] = useState(false);

  const generateResume = async () => {
    setIsGenerating(true);
    // Simulate resume generation
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setResumeGenerated(true);
  };

  const downloadResume = () => {
    // In production, this would generate and download an actual PDF
    const element = document.createElement("a");
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent("Resume content would be here");
    element.download = `${portfolioData.name.replace(" ", "_")}_Resume.pdf`;
    element.click();
  };

  const allSkills = [...new Set(portfolioData.projects.flatMap((p) => p.skills))];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <FileText className="w-4 h-4" />
          Generate Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">AI-Generated Resume</DialogTitle>
          <DialogDescription>
            Generate a traditional PDF resume from your blockchain-verified portfolio data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!resumeGenerated ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resume Preview</CardTitle>
                <CardDescription>
                  Your resume will be automatically generated from your NFT portfolio data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <div className="text-center border-b pb-4">
                    <h2 className="text-2xl font-bold">{portfolioData.name}</h2>
                    <p className="text-lg text-muted-foreground">{portfolioData.title}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      Blockchain Portfolio: {portfolioData.address.slice(0, 6)}...{portfolioData.address.slice(-4)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Professional Summary</h3>
                    <p className="text-sm text-muted-foreground">{portfolioData.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {allSkills.slice(0, 10).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {allSkills.length > 10 && (
                        <Badge variant="outline" className="text-xs">
                          +{allSkills.length - 10} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Blockchain-Verified Projects</h3>
                    <div className="space-y-3">
                      {portfolioData.projects.slice(0, 3).map((project, index) => (
                        <div key={index} className="border-l-2 border-accent pl-3">
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Verified on blockchain • {new Date(project.mintDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={generateResume} disabled={isGenerating} className="gap-2">
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating Resume...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        Generate PDF Resume
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Resume Generated Successfully
                </CardTitle>
                <CardDescription>Your blockchain-verified resume is ready for download</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{portfolioData.name}_Resume.pdf</div>
                      <div className="text-sm text-muted-foreground">
                        Generated from {portfolioData.projects.length} verified projects • {allSkills.length} skills
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                      <Button onClick={downloadResume} size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ Professional formatting with blockchain verification badges</p>
                  <p>✓ All project details with verifiable links to GitHub and live demos</p>
                  <p>✓ Skills automatically categorized and highlighted</p>
                  <p>✓ QR code linking to your public blockchain portfolio</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}