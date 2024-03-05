"use client";

import { Header } from "@/components/header";
import { ItemInfo } from "@/components/item";
import { SuccessDialog } from "@/components/success-dialog";
import { Contract, Item } from "@/types";
import { WalletContextProvider } from "@lumx-protocol/embedded-wallet";
import { useEffect, useState } from "react";
import config from "../../lumx.json";
import { Footer } from "@/components/footer";

export const Content = ({
  item,
  contract,
}: {
  item: Item;
  contract: Contract;
}) => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("wallet.user") || "{}")
  );
  const [hash, setHash] = useState("");
  const props = { item, contract, user, setHash };

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("wallet.user") || "{}"))
      document.cookie = `walletId=${user.walletId}`;
  }, []);

  const successDialogProps = { item, hash, user, contract };

  return (
    <WalletContextProvider
      clientId={config.clientId}
      isModal
      environment="sandbox"
      onFinishAuth={(user) => {
        setUser(user);
        document.cookie = `walletId=${user.walletId}`;
      }}
      theme="light"
    >
      <div className="min-h-screen flex flex-col justify-between">
        <Header {...user} />
        {hash && <SuccessDialog {...successDialogProps} />}
        <main className="sm:pb-24 pb-0 sm:px-[calc(15vw)] px-[calc(5vw)]">
          <ItemInfo {...props} />
        </main>
        <Footer />
      </div>
    </WalletContextProvider>
  );
};
