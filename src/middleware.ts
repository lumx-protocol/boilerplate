import { WalletItems } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getBaseApiUrl } from "./api";
import lumxConfig from "../lumx.json";

// This function can be marked `async` if using `await` inside
//No support for axios on middleware..
export async function middleware(request: NextRequest) {
  const cookie = cookies().get("walletId");

  if (cookie?.value === "undefined") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const getUser = async () => {
    try {
      const response = await fetch(
        `${getBaseApiUrl()}wallets/${cookie?.value}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.LUMX_API_KEY}`,
          },
        }
      );

      const data = await response.json();

      return data as WalletItems;
    } catch (error) {
      NextResponse.redirect(new URL("/", request.url));
    }
  };

  const items = await getUser();

  const hasAccess = items?.tokens["polygon"].find(
    (i) => i.itemTypeId === lumxConfig.itemTypeId
  );

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/secret-page",
};
