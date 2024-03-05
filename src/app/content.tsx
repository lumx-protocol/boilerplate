"use client";

import { Header } from "@/components/header";
import { ItemInfo } from "@/components/item";
import { SuccessDialog } from "@/components/success-dialog";
import { Contract, Item } from "@/types";
import {
  Wallet,
  WalletContextProvider,
  WalletContextProviderProps,
} from "@lumx-protocol/embedded-wallet";
import { useEffect, useState } from "react";
import config from "../../lumx.json";
import { Footer } from "@/components/footer";
import { ModeToggle } from "@/components/toggle";
import { useTheme } from "next-themes";
import { MobileNav } from "@/components/mobile-nav";

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
  const { theme } = useTheme();

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
      theme={theme as WalletContextProviderProps["theme"]}
    >
      <div className="min-h-screen relative flex flex-col justify-between">
        <ModeToggle className="absolute sm:hidden sm:top-2 sm:right-2 top-8 right-[calc(5vw)]" />
        {Object.keys(user).length ? (
          <MobileNav {...user} />
        ) : (
          <div className="flex sm:hidden w-fit mt-8 ml-[calc(5vw)]">
            <Wallet />
          </div>
        )}
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
