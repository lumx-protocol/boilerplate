"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ItemInfo } from "@/components/item";
import { SuccessDialog } from "@/components/success-dialog";
import { Contract, Item, User } from "@/types";
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
  const [user, setUser] = useState<User>(
    JSON.parse(window.localStorage.getItem("wallet.user") || "{}")
  );

  const props = { item, contract, user };

  return (
    <WalletContextProvider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}
      isModal
      environment="sandbox"
      onFinishAuth={(user) => {
        setUser(user as User);
      }}
      theme="system"
    >
      <div className="min-h-screen flex flex-col justify-between">
        <Header {...user} />
        {searchParams.hash && (
          <SuccessDialog item={item} hash={searchParams.hash} />
        )}
        <main className="sm:pb-24 pb-0 sm:px-[calc(100%-85vw)] px-[calc(5vw)]">
          <ItemInfo {...props} />
        </main>
        <Footer />
      </div>
    </WalletContextProvider>
  );
};
