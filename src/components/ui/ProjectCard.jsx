import { Award, FileText, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { VerificationDialog } from "../dialogs/verification-dialog";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({ nft, address, ...props }) {
  const skillsArray = nft?.raw.metadata.attributes[2].value
    ? nft.raw.metadata.attributes[2].value.split(",").map((s) => s.trim())
    : [];

  const skeletonArray = [
    `${"\u00A0".repeat(10)}`,
    `${"\u00A0".repeat(10)}`,
    `${"\u00A0".repeat(10)}`,
  ];

  const skills = nft ? skillsArray : skeletonArray;

  return (
    <>
      <Card {...props} className="overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl">
                  {nft ? nft.name : <SkeletonLoad value={100} />}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={`font-mono text-xs ${!nft && "animate-pulse"}`}
                >
                  {nft ? nft.tokenId : "\u00A0"}
                </Badge>
                <Badge
                  variant="default"
                  className={`gap-1 bg-accent text-accent-foreground ${
                    !nft && "animate-pulse"
                  }`}
                >
                  <Award className="w-3 h-3" />
                  Verified
                </Badge>
              </div>
              <CardDescription className="text-base leading-relaxed">
                {nft ? nft.description : <SkeletonLoad value={800} />}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${
                  nft ? "" : "bg-neutral-200 rounded-md animate-pulse"
                }`}
              >
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              disabled={nft ? false : true}
              asChild={nft ? true : false}
            >
              <a
                className="flex items-center gap-2"
                href={nft?.raw.metadata.attributes[0].value}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            </Button>
            {nft?.raw.metadata.attributes[1].value && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                asChild
              >
                <a
                  className="flex items-center gap-2"
                  href={nft?.raw.metadata.attributes[1].value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
              disabled={nft ? false : true}
              asChild={nft ? true : false}
            >
              <a
                className="flex items-center gap-2"
                href={`https://sepolia.basescan.org/token/${nft?.contract.address}?a=${nft?.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Etherscan
              </a>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground pt-2 border-t border-border">
            Minted on{" "}
            {nft ? (
              new Date(nft?.mintedAt).toLocaleDateString()
            ) : (
              <SkeletonLoad value={20} />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function SkeletonLoad({ customClassName = "", value = 5 }) {
  const placeholder = "\u00A0".repeat(value);

  return (
    <span
      className={`${customClassName} bg-neutral-200 rounded-md animate-pulse px-3 wrap-anywhere`}
    >
      {placeholder}
    </span>
  );
}
