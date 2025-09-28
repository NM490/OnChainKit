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

export default function WalletAccount() {
  return (
    <>
      <div>
        <Wallet>
          <ConnectWallet className={`h-[38px] px-4 py-2 rounded-md flex items-center justify-center bg-white border border-brand text-brand hover:bg-brand/10 transition dark:border-0 dark:bg-brand/80 dark:text-white`}>
            <Name className="text-brand dark:text-white"/>
          </ConnectWallet>
          <WalletDropdown>
            <WalletAdvancedWalletActions/>
            <Identity hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address/>
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
            <WalletDropdownDisconnect className="text-brand dark:text-white"/>
          </WalletDropdown>
        </Wallet>
      </div>
    </>
  );
}
