"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import Image from "next/image";

export default function ConnectCard() {

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image src="/favicon.ico" alt="Logo" width={50} height={50} />
            </div>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Please connect your wallet to access this feature and start
              earning ETH rewards.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
