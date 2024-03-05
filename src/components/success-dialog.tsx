"use client";

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import Image from "next/image";
import { Contract, Item } from "@/types";
import { useState } from "react";
import Link from "next/link";
import { LoggedInUser } from "@lumx-protocol/embedded-wallet";
import { createLink } from "@/helpers";

export const SuccessDialog = ({
  item,
  hash,
  user,
  contract,
}: {
  item: Item;
  hash: string;
  user: LoggedInUser;
  contract: Contract;
}) => {
  const [closeModal, setCloseModal] = useState(true);

  return (
    <>
      <Dialog open={closeModal} onOpenChange={setCloseModal}>
        <DialogContent className="sm:max-w-[520px] w-screen h-screen sm:h-auto">
          <div className="flex sm:flex-row flex-col gap-4 sm:items-center pt-6 sm:pt-0">
            {/* {contract.type === "non-fungible" && ( */}
            <>
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={"image"}
                  className="sm:flex-1 rounded-md"
                  width={232}
                  height={232}
                  objectFit="cover"
                />
              ) : (
                <div className="h-[600px] flex-shrink-0 w-[600px] rounded-md bg-neutral-300" />
              )}
            </>
            {/* )} */}
            <article className="sm:flex-1">
              <h4 className="text-sm leading-[14px] text-neutral-500 font-medium pb-1.5">
                Congratulations
              </h4>
              <h1 className="font-semibold text-xl tracking-[-0.75%] pb-1.5">
                {item.name || "Item Name"}
              </h1>
              <p className="break-words text-neutral-500 text-sm">
                {item.description || "item description"}
              </p>
              <p className="text-sm text-neutral-500 pt-4">
                You can{" "}
                <a
                  target="black"
                  href={createLink({
                    href: "polygonscan.com/tx/",
                    path: hash,
                    prodSubdomain: "",
                    testSubdomain: "mumbai.",
                  })}
                  className="underline text-black"
                >
                  verify on chain
                </a>
              </p>
            </article>
          </div>
          <DialogFooter className="flex-1 gap-2">
            <Button className="w-full" asChild>
              <Link
                target="_blank"
                href={createLink({
                  href: "opensea.io",
                  path: user.walletAddress,
                  prodSubdomain: "",
                  testSubdomain: "testnets.",
                })}
              >
                See my profile
              </Link>
            </Button>
            <DialogClose asChild>
              <Button className="!ml-0" variant="outline" type="button">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
