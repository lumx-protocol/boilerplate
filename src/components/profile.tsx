"use client";

import { LoggedInUser, Wallet } from "@lumx-protocol/embedded-wallet";

import { UserNav } from "./user-nav";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./toggle";

export interface ProfileProps extends LoggedInUser {}

export const Profile = ({ name, walletAddress }: ProfileProps) => {
  const getAbbreviatedWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const userNavProps = { name, walletAddress };

  return (
    <div className="ml-auto sm:ml-0 flex gap-4">
      {Boolean(walletAddress && name) ? (
        <div className="flex h-10 items-center space-x-4 text-sm">
          <div className="hidden sm:block">
            <h4 className="text-sm font-medium">Hello, {name}</h4>
            <p className="text-xs text-neutral-700">
              {getAbbreviatedWalletAddress(walletAddress)}
            </p>
          </div>
          <Separator className="hidden sm:block" orientation="vertical" />
          <UserNav {...userNavProps} />
        </div>
      ) : (
        <Wallet />
      )}
      <ModeToggle />
    </div>
  );
};
