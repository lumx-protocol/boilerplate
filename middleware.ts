import { WalletItems } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
//No support for axios on middleware..
export async function middleware(request: NextRequest) {
  const cookie = cookies().get("walletId");

  if (!cookie) {
    return NextResponse.redirect(new URL("/not-allowed", request.url));
  }

  const getUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PROTOCOL_URL}/wallets/${cookie?.value}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PROTOCOL_KEY}`,
        },
      }
    );

    const data = await response.json();

    return data as WalletItems;
  };

  const items = await getUser();

  console.log(items);

  const hasAccess = items.tokens["polygon"].find(
    (i) => i.itemTypeId === process.env.NEXT_PUBLIC_ITEM_TYPE_ID
  );

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/not-allowed", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/secret-page",
};
