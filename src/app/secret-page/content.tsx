"use client";

import { Header } from "@/components/header";
import { WalletContextProvider } from "@lumx-protocol/embedded-wallet";
import { useState } from "react";
import config from "../../../lumx.json";
import { Footer } from "@/components/footer";

const Content = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("wallet.user") || "{}")
  );
  return (
    <WalletContextProvider
      clientId={config.clientId}
      isModal
      environment={process.env.LUMX_ENV as "sandbox" | "production"}
      onFinishAuth={(user) => {
        setUser(user);
      }}
      theme="system"
    >
      <div className="min-h-screen flex flex-col justify-between">
        <Header {...user} />
        <div className="flex flex-col h-full mx-auto sm:px-[calc(15vw)] px-[calc(5vw)]">
          <h4 className="text-sm leading-[14px] text-neutral-500 font-medium pb-1.5">
            WOW
          </h4>
          <h1 className="font-semibold text-3xl tracking-[-0.75%] pb-1.5">
            You have the credentials to get here
          </h1>
          <h2 className="font-normal text-sm leading-[14px] text-neutral-500 pb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            inventore beatae corrupti!
          </h2>
          <p className="break-words max-w-[600px]">Something here</p>
        </div>
        <Footer />
      </div>
    </WalletContextProvider>
  );
};

export default Content;
