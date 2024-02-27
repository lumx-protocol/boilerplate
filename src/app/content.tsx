"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ItemInfo } from "@/components/item";
import { SuccessDialog } from "@/components/success-dialog";
import { Contract, Item } from "@/types";
import { WalletContextProvider } from "@lumx-protocol/embedded-wallet";
import { useState } from "react";

export const Content = ({
  searchParams,
  item,
  contract,
}: {
  searchParams: { hash: string };
  item: Item;
  contract: Contract;
}) => {
  const [user, setUser] = useState<{ walletAddress: string; name: string }>(
    JSON.parse(window.localStorage.getItem("wallet.user") || "{}")
  );

  return (
    <WalletContextProvider
      clientId="cb63683f-c98b-4ac4-8dfc-4692daaab6a0"
      isModal
      environment="sandbox"
      onFinishAuth={(user) => {
        setUser(user as { walletAddress: string; name: string });
      }}
      theme="system"
    >
      <div className="min-h-screen flex flex-col justify-between">
        <Header {...user} />
        {searchParams.hash && (
          <SuccessDialog item={item} hash={searchParams.hash} />
        )}
        <main className="sm:pb-24 pb-0 sm:px-[calc(100%-85vw)] px-[calc(5vw)]">
          <ItemInfo contract={contract} item={item} />
        </main>
        <Footer />
      </div>
    </WalletContextProvider>
  );
};
