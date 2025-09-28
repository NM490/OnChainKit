import { Award, Wallet, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export function CardInfo({ icon, title, description }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export const card1 = {
  icon: <Award className="w-6 h-6" />,
  title: "Share Portfolio",
  description: "Get a shareable link to your verified portfolio for employers",
};

export const card2 = {
  icon: <Wallet className="w-6 h-6" />,
  title: "Connect Wallet",
  description: "Sign in with your crypto wallet using MetaMask or WalletConnect",
};

export const card3 = {
  icon: <Plus className="w-6 h-6" />,
  title: "Mint Projects",
  description: "Upload project details and mint them as NFTs on the blockchain",
};
    