"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import { Profile } from "./profile";
import { LoggedInUser } from "@lumx-protocol/embedded-wallet";

export interface HeaderProps extends LoggedInUser {}

export const Header = (props: HeaderProps) => {
  return (
    <>
      <header className="flex gap-4 pt-12 items-center sm:px-[calc(15vw)] px-[calc(5vw)]">
        <Image src="./lumx-logo.svg" height={39} width={39} alt="lumx logo" />
        <Button className="w-fit mr-auto hidden sm:block" variant={"secondary"}>
          Welcome
        </Button>
        <Profile {...props} />
      </header>
    </>
  );
};
