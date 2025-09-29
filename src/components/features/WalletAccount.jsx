"use client";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletAdvancedAddressDetails,
  WalletAdvancedTokenHoldings,
  WalletAdvancedTransactionActions,
  WalletAdvancedWalletActions,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WalletAccount({ ...props }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  function setWalletCookie(address) {
    document.cookie = `wallet=${address}; path=/; SameSite=Lax`;
  }

  function clearWalletCookie() {
    document.cookie = "wallet=; path=/; Max-Age=0";
  }

  useEffect(() => {
    if (isConnected && address) {
      setWalletCookie(address);
      router.refresh();
    } else {
      clearWalletCookie();
      router.refresh();
    }
  }, [isConnected, address]);

  return (
    <>
      <div {...props}>
        <Wallet>
          <ConnectWallet
            className={`h-[38px] px-4 py-2 rounded-md flex items-center justify-center bg-white border border-brand text-brand hover:bg-brand/10 transition dark:border-0 dark:bg-brand/80 dark:text-white`}
          >
            <Name className="text-brand dark:text-white" />
          </ConnectWallet>
          <WalletDropdown>
            <WalletAdvancedWalletActions />
            <Identity hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownLink
              target="_blank"
              href="https://keys.coinbase.com"
              icon="wallet"
              className={"relative"}
            >
              Wallet
            </WalletDropdownLink>
            <WalletDropdownDisconnect className="text-brand dark:text-white" />
          </WalletDropdown>
        </Wallet>
      </div>
    </>
  );
}
