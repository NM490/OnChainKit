import { QRCodeSVG } from "qrcode.react";
import { Name } from "@coinbase/onchainkit/identity";
import { Button } from "../ui/button";
import { CopyButton } from "../ui/CopyButton";

export default function BaseDeposit({ address }) {
  return (
    <>
      <div className="w-full h-full relative flex flex-col items-center gap-5">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="p-3 border-2 rounded-lg w-50 h-50 shadow-2xl shadow-brand/50">
            <QRCodeSVG value={address} className="w-full h-full" />
          </div>
          <Name address={address} className={`text-2xl`} />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <CopyButton
            className={
              "bg-brand hover:bg-brand/50 dark:hover:bg-brand dark:text-white"
            }
            value={address}
          >
            Copy wallet address
          </CopyButton>
          <p className="text-sm text-center">
            You can recieve any token from any EVM-based network with this
            address.
          </p>
        </div>
      </div>
    </>
  );
}
