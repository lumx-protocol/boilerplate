"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { createLink } from "@/helpers";
import { MenuIcon } from "lucide-react";
import config from "../../lumx.json";

export function MobileNav({
  name,
  walletAddress,
}: {
  name: string;
  walletAddress: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="self-star p-0 mt-8 mb-2 ml-auto mr-20 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <MenuIcon size={36} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        side="right"
        className="pr-0"
      >
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          {name ? <span className="font-medium">Olá, {name}</span> : null}
        </MobileLink>
        <ScrollArea className="my-6 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-4">
            <MobileLink key={"/"} href={"/"} onOpenChange={setOpen}>
              Home
            </MobileLink>
            {config.addons.includes("tokengating") && (
              <MobileLink href={"/secret-page"} onOpenChange={setOpen}>
                Página secreta
              </MobileLink>
            )}
            {name ? (
              <>
                <MobileLink
                  href={createLink({
                    href: "rarible.com",
                    path: `user/${walletAddress}/owned`,
                    prodSubdomain: "",
                    testSubdomain: "testnet.",
                  })}
                >
                  Ver perfil
                </MobileLink>
                <Button
                  variant={"ghost"}
                  className="text-sm w-fit p-0 h-4 font-normal"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                    document.cookie = `walletId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                  }}
                >
                  Sair
                </Button>
              </>
            ) : null}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      target={href.toString().includes("rarible") ? "_blank" : "_self"}
      className={cn(className, "text-sm")}
      {...props}
    >
      {children}
    </Link>
  );
}
