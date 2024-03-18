"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mint } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Spinner } from "./ui/spinner";
import {
  LoggedInUser,
  isModalVisible,
  updateModalVisibility,
} from "@lumx-protocol/embedded-wallet";
import { cn } from "@/lib/utils";
import { isSafari } from "@/helpers";

const transactionHash = "";

const SubmitButtonForm = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="disabled:opacity-50 sm:w-auto w-full"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <Spinner className="stroke-white" />
          Resgatando..
        </div>
      ) : (
        "Resgatar"
      )}
    </Button>
  );
};

export const ClaimForm = ({
  user,
  setHash,
}: {
  user: LoggedInUser;
  setHash: (hash: string) => void;
}) => {
  const mintWithWalletId = mint.bind(null, user.walletId);
  const [hash, formAction] = useFormState(mintWithWalletId, transactionHash);

  useEffect(() => {
    if (hash.includes("0x")) {
      setHash(hash);
    }
  }, [hash]);

  return (
    <form
      action={formAction}
      className={cn("flex gap-4 pt-4", { "pb-2": isSafari() })}
    >
      <Input
        id="quantity"
        type="number"
        defaultValue={1}
        max={5}
        name="quantity"
        className="sm:w-[111px] w-full text-center"
        required
      />
      {user.walletId ? (
        <SubmitButtonForm />
      ) : (
        <Button
          type="button"
          className="sm:w-auto w-full"
          onClick={() => updateModalVisibility(!isModalVisible)}
        >
          Resgatar
        </Button>
      )}
    </form>
  );
};
