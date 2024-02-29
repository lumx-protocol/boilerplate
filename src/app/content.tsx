"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ItemInfo } from "@/components/item";
import { SuccessDialog } from "@/components/success-dialog";
import { Contract, Item } from "@/types";
import { WalletContextProvider } from "@lumx-protocol/embedded-wallet";
import { useState } from "react";
import config from "../../lumx.json";

export const Content = ({
  searchParams,
  item,
  contract,
}: {
  searchParams: { hash: string };
  item: Item;
  contract: Contract;
}) => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("wallet.user") || "{}")
  );
  const props = { item, contract, user };

  return (
    <WalletContextProvider
      clientId={config.clientId}
      isModal
      environment="sandbox"
      onFinishAuth={(user) => {
        setUser(user);
      }}
      theme="system"
    >
      <div className="min-h-screen flex flex-col justify-between">
        <Header {...user} />
        {searchParams.hash && (
          <SuccessDialog item={item} hash={searchParams.hash} />
        )}
        <main className="sm:pb-24 pb-0 sm:px-[calc(15vw)] px-[calc(5vw)]">
          <ItemInfo {...props} />
        </main>
        <Footer />
      </div>
    </WalletContextProvider>
  );
};
