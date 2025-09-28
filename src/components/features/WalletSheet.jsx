"use client";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { FaEthereum } from "react-icons/fa";
import { EthBalance } from "@coinbase/onchainkit/identity";
import SheetActions from "../layout/SheetActions";
import { useAccount } from "wagmi";

import dynamic from "next/dynamic";

const MoonPayProvider = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayProvider),
  { ssr: false }
);

export default function WalletSheet() {
  const { address, isConnected } = useAccount();

  return (
    <>
    <MoonPayProvider 
      apiKey="pk_test_123" 
      debug
    >
      {isConnected && (
        <Sheet >
          <SheetTrigger asChild className=" border border-brand bg-white text-brand hover:bg-brand/10 transition dark:border-0 dark:bg-brand/80 dark:text-white"
>
            <Button
              className={`h-full font-bold flex justify-center items-center`}
            >
              <FaEthereum size={24} />
              <EthBalance className={`text-brand dark:text-white`} address={address} />
            </Button>
          </SheetTrigger>
          <SheetActions />
        </Sheet>
      )}
      </MoonPayProvider>
    </>
  );
}
