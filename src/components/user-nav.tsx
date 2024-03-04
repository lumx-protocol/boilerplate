import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { createLink } from "@/helpers";
import { LoggedInUser } from "@lumx-protocol/embedded-wallet";

export const UserNav = ({
  name,
  walletAddress,
}: {
  name: string;
  walletAddress: LoggedInUser["walletAddress"];
}) => {
  const getInitialLetters = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/01.png" alt={name} />
            <AvatarFallback className="bg-[#6E05FF] text-white">
              {getInitialLetters(name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              className="flex items-center justify-between w-full"
              href={createLink({
                href: "opensea.io",
                path: walletAddress,
                prodSubdomain: "",
                testSubdomain: "testnets.",
              })}
            >
              Profile <ArrowUpRight className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
