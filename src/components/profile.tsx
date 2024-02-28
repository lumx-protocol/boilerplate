"use client";

import { Wallet } from "@lumx-protocol/embedded-wallet";

import { UserNav } from "./user-nav";
import { Separator } from "./ui/separator";
import { User } from "@/types";

export interface ProfileProps extends User {}

export const Profile = ({ name, walletAddress }: ProfileProps) => {
  const getAbbreviatedWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="ml-auto sm:ml-0">
      {Boolean(walletAddress && name) ? (
        <div className="flex h-10 items-center space-x-4 text-sm">
          <div>
            <h4 className="text-sm font-medium">Hello, {name}</h4>
            <p className="text-xs text-neutral-700">
              {getAbbreviatedWalletAddress(walletAddress)}
            </p>
          </div>
          <Separator orientation="vertical" />
          <UserNav name={name} />
        </div>
      ) : (
        <Wallet />
      )}
    </div>
  );
};
