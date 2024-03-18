"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import { Profile } from "./profile";
import { LoggedInUser, Wallet } from "@lumx-protocol/embedded-wallet";
import Link from "next/link";
import config from "../../lumx.json";
import { MobileNav } from "./mobile-nav";
import useCheckMobileScreen from "@/hooks/is-mobile";

export interface HeaderProps extends LoggedInUser {}

export const Header = (props: HeaderProps) => {
  const isMobile = useCheckMobileScreen();

  return (
    <>
      <header className="sm:flex hidden gap-4 pt-12 items-center sm:px-[calc(15vw)] px-[calc(5vw)]">
        <Image src="./lumx-logo.svg" height={39} width={39} alt="lumx logo" />
        <Button asChild variant={"secondary"}>
          <Link href="/">Home</Link>
        </Button>
        {config.addons.includes("tokengating") && (
          <Button asChild variant="outline" className="mr-auto">
            <Link className="" href="/secret-page">
              Página secreta
            </Link>
          </Button>
        )}
        {!isMobile && <Profile {...props} />}
      </header>
      {isMobile ? (
        Object.keys(props).length ? (
          <div className="flex">
            <Image
              src="./lumx-logo.svg"
              height={39}
              width={39}
              alt="lumx logo"
              className="mt-8 ml-[calc(5vw)]"
            />
            <MobileNav {...props} />
          </div>
        ) : (
          <div className="flex sm:hidden w-fit mt-8 ml-[calc(5vw)]">
            <Wallet />
          </div>
        )
      ) : null}
    </>
  );
};
