"use client";

import { WalletContextProvider } from "@lumx-protocol/embedded-wallet";
import { Button } from "./ui/button";
import Image from "next/image";
import { Profile } from "./profile";
import { useState } from "react";

export const Header = () => {
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
      <header className="flex gap-4 pt-12 items-center sm:px-[calc(100%-85vw)] px-[calc(5vw)]">
        <Image src="./lumx-logo.svg" height={39} width={39} alt="lumx logo" />
        <Button className="w-fit mr-auto hidden sm:block" variant={"secondary"}>
          Welcome
        </Button>
        <Profile {...user} />
      </header>
    </WalletContextProvider>
  );
};
