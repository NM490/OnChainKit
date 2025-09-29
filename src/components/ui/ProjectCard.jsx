import { Award, FileText, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { VerificationDialog } from "../dialogs/verification-dialog";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({nft, ...props}) {
  return (
    <>
      <Card {...props} className="overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl">{nft.title}</CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  {nft.tokenId}
                </Badge>
                {nft.verified && (
                  <Badge
                    variant="default"
                    className="gap-1 bg-accent text-accent-foreground"
                  >
                    <Award className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <CardDescription className="text-base leading-relaxed">
                {nft.description}
              </CardDescription>
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
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              asChild
            >
              <a href={nft.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                View Code
              </a>
            </Button>
            {nft.portfolioUrl && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                asChild
              >
                <a
                  href={nft.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-4 h-4" />
                  Live Demo
                </a>
              </Button>
            )}
            <VerificationDialog project={nft} walletAddress={""} />
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
    </>
  );
}
