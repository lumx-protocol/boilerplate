"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { startTransaction } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import {
  LoggedInUser,
  isModalVisible,
  updateModalVisibility,
} from "@lumx-protocol/embedded-wallet";
import { cn } from "@/lib/utils";
import { isSafari } from "@/helpers";
import { useToast } from "./ui/use-toast";

const initialTransactionState = {
  status: "",
  message: "",
  transactionHash: "",
  id: "",
};

const SubmitButtonForm = () => {
  const { pending } = useFormStatus();
  console.log(pending);
  const [pendingPhrase, setPendingPhrase] = useState("Preparando seu mint!");

  useEffect(() => {
    setTimeout(() => {
      if (pendingPhrase === "Preparando seu mint!")
        setPendingPhrase("Enviando para a blockchain");
    }, 2000);
  }, [pending]);

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
          {pendingPhrase}
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
  const mintWithWalletId = startTransaction.bind(null, user.walletId);
  const [transaction, formAction] = useFormState(
    mintWithWalletId,
    initialTransactionState
  );
  const { toast } = useToast();

  //TODO: better way of handling toast without useEffect
  useEffect(() => {
    console.log(transaction.id);
    if (transaction.status === "success") {
      setHash(transaction.transactionHash);
      return;
    }

    toast({
      title: "Erro",
      description: transaction.message,
      variant: "destructive",
    });
  }, [transaction.id]);

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
