import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { MintProjectDialog } from "../dialogs/mint-project-dialog";

export default function MintFirstProject({ refreshNFTs }) {
  return (
    <>
      <Card className="text-center py-12">
        <CardContent>
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="mb-2">No Projects Yet</CardTitle>
          <CardDescription className="mb-6">
            Start building your blockchain portfolio by minting your first
            project
          </CardDescription>
          <MintProjectDialog refreshNFTs={refreshNFTs} />
        </CardContent>
      </Card>
    </>
  );
}
