import { Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { SharePortfolioButton } from "../portfolio/share-portfolio-button";

export default function ShareCard() {
  return (
    <>
      <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 " />
            Your Public Portfolio
          </CardTitle>
          <CardDescription>
            Share this link with employers and educators to showcase your
            verified projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
            <code className="text-sm text-muted-foreground font-mono">
              /portfolio/...
            </code>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="" target="_blank" rel="noopener noreferrer">
                  Preview
                </a>
              </Button>
              <SharePortfolioButton url="" variant="outline" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
