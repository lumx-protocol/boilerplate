"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import { Profile } from "./profile";
import { LoggedInUser } from "@lumx-protocol/embedded-wallet";
import Link from "next/link";
import config from "../../lumx.json";

export interface HeaderProps extends LoggedInUser {}

export const Header = (props: HeaderProps) => {
  return (
    <>
      <header className="sm:flex hidden gap-4 pt-12 items-center sm:px-[calc(15vw)] px-[calc(5vw)]">
        <Image src="./lumx-logo.svg" height={39} width={39} alt="lumx logo" />
        <Button asChild variant={"secondary"}>
          <Link href="/">Welcome</Link>
        </Button>
        {config.addons.includes("tokengating") && (
          <Button asChild variant="outline" className="mr-auto">
            {/* <div className="relative"> */}
            {/* <span className="left-0.5 rounded-[4px] right-0.5 h-2 bg-gradient-to-b top-0.5 from-white/20 absolute" /> */}
            <Link className="" href="/secret-page">
              Secret Page
            </Link>
            {/* </div> */}
          </Button>
        )}
        <Profile {...props} />
      </header>
    </>
  );
};
