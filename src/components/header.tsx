"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import { Profile } from "./profile";

export const Header = (props: { walletAddress: string; name: string }) => {
  return (
    <>
      <header className="flex gap-4 pt-12 items-center sm:px-[calc(100%-85vw)] px-[calc(5vw)]">
        <Image src="./lumx-logo.svg" height={39} width={39} alt="lumx logo" />
        <Button className="w-fit mr-auto hidden sm:block" variant={"secondary"}>
          Welcome
        </Button>
        <Profile {...props} />
      </header>
    </>
  );
};
