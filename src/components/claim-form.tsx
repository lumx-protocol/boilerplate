"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mint } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Spinner } from "./ui/spinner";
import {
  isModalVisible,
  updateModalVisibility,
} from "@lumx-protocol/embedded-wallet";

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
          Claiming
        </div>
      ) : (
        "Mint"
      )}
    </Button>
  );
};

export const ClaimForm = ({
  walletId,
  setHash,
}: {
  walletId: string;
  setHash: (hash: string) => void;
}) => {
  const mintWithWalletId = mint.bind(null, walletId);
  const [hash, formAction] = useFormState(mintWithWalletId, transactionHash);

  useEffect(() => {
    if (hash.includes("0x")) {
      setHash(hash);
    }
  }, [hash]);

  return (
    <form action={formAction} className="flex gap-4 pt-4">
      <Input
        id="quantity"
        type="number"
        defaultValue={1}
        name="quantity"
        className="sm:w-[111px] w-full text-center"
        required
      />
      {localStorage.getItem("wallet.user") ? (
        <SubmitButtonForm />
      ) : (
        <Button
          type="button"
          onClick={() => updateModalVisibility(!isModalVisible)}
        >
          Mint
        </Button>
      )}
    </form>
  );
};
