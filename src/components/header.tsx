"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import { Profile } from "./profile";
import { LoggedInUser } from "@lumx-protocol/embedded-wallet";
import Link from "next/link";
import config from "../../lumx.json";
import { cn } from "@/lib/utils";

export interface HeaderProps extends LoggedInUser {}

export const Header = (props: HeaderProps) => {
  return (
    <>
      <header className="flex gap-4 pt-12 items-center sm:px-[calc(15vw)] px-[calc(5vw)]">
        <Image
          src="./lumx-logo.svg"
          height={39}
          width={39}
          alt="lumx logo"
          className=""
        />
        <Button
          className={cn("w-fit hidden sm:block", {
            "mr-auto": !config.addons.includes("tokengating"),
          })}
          variant={"secondary"}
        >
          Welcome
        </Button>
        {config.addons.includes("tokengating") && (
          <Button
            className="mr-auto bg-[length:400%_400%] bg-right-bottom bg-gradient-to-tr animate-moving-gradient from-[#401689] from-30% via-[#6e05ff] to-[#00B7FF]  hover:scale-110 hover:animate-moving-gradient-fast transition-all shadow-md"
            asChild
          >
            <div className="relative">
              <span className="left-0.5 rounded-[4px] right-0.5 h-2 bg-gradient-to-b top-0.5 from-white/20 absolute" />
              <Link href="/secret-page">Secret Page</Link>
            </div>
          </Button>
        )}
        <Profile {...props} />
      </header>
    </>
  );
};
