"use client";

import { Header } from "@/components/header";
import { ItemInfo } from "@/components/item";
import { SuccessDialog } from "@/components/success-dialog";
import { Contract, Item } from "@/types";
import {
  LoggedInUser,
  Wallet,
  WalletContextProvider,
  WalletContextProviderProps,
} from "@lumx-protocol/embedded-wallet";
import { useEffect, useState } from "react";
import config from "../lumx.json";
import { Footer } from "@/components/footer";
import { ModeToggle } from "@/components/toggle";
import { useTheme } from "next-themes";

export const Content = ({
  item,
  contract,
}: {
  item: Item;
  contract: Contract;
}) => {
  const [user, setUser] = useState<LoggedInUser>({
    name: "",
    walletId: "",
    walletAddress: "0x",
    email: "",
    cpf: "",
    phone: "",
    birthDate: "",
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [hash, setHash] = useState("");
  const props = { item, contract, user, setHash };
  const { theme } = useTheme();

  useEffect(() => {
    document.cookie = `walletId=${user.walletId}`;
    if (JSON.parse(window.localStorage.getItem("wallet.user") || "{}"))
      setUser(JSON.parse(window.localStorage.getItem("wallet.user") || "{}"));
  }, [user.walletId]);

  const successDialogProps = { item, hash, user, setHash };

  return (
    <>
      {isClient && (
        <WalletContextProvider
          clientId={config.clientId}
          isModal
          modalButton={{
            cta: "Conecte sua carteira",
            size: "small",
          }}
          lang="pt"
          colorScheme={theme === "dark" ? "purple" : "purple"}
          environment={process.env.NEXT_PUBLIC_LUMX_ENV}
          onFinishAuth={(user) => {
            setUser(user);
            document.cookie = `walletId=${user.walletId}`;
          }}
          theme={theme}
        >
          <div className="min-h-screen relative flex flex-col justify-between">
            <ModeToggle className="absolute sm:hidden sm:top-2 sm:right-2 top-8 right-[calc(5vw)]" />
            <Header {...user} />
            {hash && <SuccessDialog {...successDialogProps} />}
            <main className="sm:pb-24 pb-0 sm:px-[calc(15vw)] px-[calc(5vw)]">
              <ItemInfo {...props} />
            </main>
            <Footer />
          </div>
        </WalletContextProvider>
      )}
    </>
  );
};
