"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Star, Send, Loader2 } from "lucide-react";

export function EndorsementDialog({ projectId, projectTitle, onEndorsementAdded }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    endorserName: "",
    endorserTitle: "",
    endorserOrganization: "",
    endorserWallet: "",
    endorsementText: "",
    rating: 5,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate endorsement submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newEndorsement = {
      id: Date.now(),
      projectId,
      endorserName: formData.endorserName,
      endorserTitle: formData.endorserTitle,
      endorserOrganization: formData.endorserOrganization,
      endorserWallet: formData.endorserWallet,
      endorsementText: formData.endorsementText,
      rating: formData.rating,
      timestamp: new Date().toISOString(),
      verified: true,
    };

    onEndorsementAdded(newEndorsement);
    setIsLoading(false);
    setOpen(false);

    // Reset form
    setFormData({
      endorserName: "",
      endorserTitle: "",
      endorserOrganization: "",
      endorserWallet: "",
      endorsementText: "",
      rating: 5,
    });
  };

  const isFormValid = formData.endorserName && formData.endorserTitle && formData.endorsementText;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <UserCheck className="w-4 h-4" />
          Add Endorsement
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Endorse Project</DialogTitle>
          <DialogDescription>
            Add a professional endorsement for "{projectTitle}". This will be recorded on the blockchain as a
            co-signature.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Endorser Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Endorser Information</CardTitle>
              <CardDescription>Your professional details for this endorsement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endorserName">Full Name *</Label>
                  <Input
                    id="endorserName"
                    placeholder="Dr. Sarah Johnson"
                    value={formData.endorserName}
                    onChange={(e) => handleInputChange("endorserName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endorserTitle">Title *</Label>
                  <Input
                    id="endorserTitle"
                    placeholder="Professor of Computer Science"
                    value={formData.endorserTitle}
                    onChange={(e) => handleInputChange("endorserTitle", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endorserOrganization">Organization</Label>
                <Input
                  id="endorserOrganization"
                  placeholder="Stanford University"
                  value={formData.endorserOrganization}
                  onChange={(e) => handleInputChange("endorserOrganization", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endorserWallet">Wallet Address (Optional)</Label>
                <Input
                  id="endorserWallet"
                  placeholder="0x..."
                  className="font-mono text-sm"
                  value={formData.endorserWallet}
                  onChange={(e) => handleInputChange("endorserWallet", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Providing your wallet address enables blockchain co-signature verification
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Endorsement Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Endorsement</CardTitle>
              <CardDescription>Your professional assessment of this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Overall Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleInputChange("rating", star)}
                      className={`p-1 rounded ${star <= formData.rating ? "text-yellow-500" : "text-muted-foreground"}`}
                    >
                      <Star className={`w-5 h-5 ${star <= formData.rating ? "fill-current" : ""}`} />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">{formData.rating} out of 5 stars</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endorsementText">Endorsement Text *</Label>
                <Textarea
                  id="endorsementText"
                  placeholder="This project demonstrates exceptional technical skills and innovative problem-solving..."
                  className="min-h-[120px]"
                  value={formData.endorsementText}
                  onChange={(e) => handleInputChange("endorsementText", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Info */}
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-accent" />
                Blockchain Endorsement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• Your endorsement will be recorded as metadata linked to the project NFT</p>
                <p>• If you provide a wallet address, you can co-sign the endorsement on-chain</p>
                <p>• Endorsements are immutable and publicly verifiable</p>
                <p>• This creates a permanent record of your professional assessment</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid || isLoading} className="gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Endorsement
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}