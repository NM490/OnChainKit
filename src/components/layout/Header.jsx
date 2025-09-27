import { Award } from "lucide-react";
import WalletAccount from "../features/WalletAccount";
import WalletSheet from "../features/WalletSheet";

const navBtns = [
  {
    text: "Home",
    url: "/",
    id: "home-btn",
  },
  {
    text: "About",
    url: "/",
    id: "about-btn",
  },
  {
    text: "Contact",
    url: "/",
    id: "contact-btn",
  },
];

export default function Header() {
  return (
    <>
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">
                NFT Portfolio
              </h1>
            </div>
         

          <div className="flex items-center gap-5">
            <WalletSheet />
            <WalletAccount />
          </div> </div>
        </div>
      </header>
    </>
  );
}
