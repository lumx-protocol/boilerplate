"use client";

import { Header } from "@/components/header";
import {
  LoggedInUser,
  WalletContextProvider,
} from "@lumx-protocol/embedded-wallet";
import { useEffect, useState } from "react";
import config from "../../../lumx.json";
import { Footer } from "@/components/footer";
import { ModeToggle } from "@/components/toggle";

const Content = () => {
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

  useEffect(() => {
    document.cookie = `walletId=${user.walletId}`;
    if (JSON.parse(window.localStorage.getItem("wallet.user") || "{}"))
      setUser(JSON.parse(window.localStorage.getItem("wallet.user") || "{}"));
  }, [user.walletId]);

  return (
    <>
      {isClient && (
        <WalletContextProvider
          clientId={config.clientId}
          isModal
          environment={
            process.env.NEXT_PUBLIC_LUMX_ENV as "sandbox" | "production"
          }
          onFinishAuth={(user) => {
            setUser(user);
          }}
          theme="system"
        >
          <div className="min-h-screen flex flex-col justify-between">
            <ModeToggle className="absolute sm:hidden sm:top-2 sm:right-2 top-8 right-[calc(5vw)]" />
            <Header {...user} />
            <div className="flex flex-col h-full mx-auto sm:px-[calc(15vw)] px-[calc(5vw)]">
              <h4 className="text-sm leading-[14px] text-neutral-500 font-medium pb-1.5">
                WOW
              </h4>
              <h1 className="font-semibold text-3xl tracking-[-0.75%] pb-1.5">
                Você tem o que é necessário para estar aqui
              </h1>
              <h2 className="font-normal text-sm leading-[14px] text-neutral-500 pb-4">
                Insira algo muito secreto nessa página 🚀
              </h2>
            </div>
            <Footer />
          </div>
        </WalletContextProvider>
      )}
    </>
  );
};

export default Content;
