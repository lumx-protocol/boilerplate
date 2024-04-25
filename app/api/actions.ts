"use server";

import { getBaseApiUrl } from "@/api";
import config from "../../lumx.json";
import { typedFetch } from "@/api/typed-fetch";

type Transaction = {
  status: string;
  message: string;
  transactionHash: string;
  id: string;
};

export const startTransaction = async (
  walletId: string,
  prevState: any,
  formData: FormData
): Promise<Transaction> => {
  console.log(
    "minting",
    walletId,
    formData,
    process.env.NEXT_PUBLIC_ITEM_TYPE_ID
  );

  const transaction = await typedFetch<Transaction>(
    `${getBaseApiUrl()}/transactions/mints`,
    {
      method: "POST",
      body: JSON.stringify({
        amount: Number(formData.get("quantity")),
        walletId,
        itemTypeId: process.env.NEXT_PUBLIC_ITEM_TYPE_ID,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.LUMX_API_KEY}`,
      },
    }
  );

  if (transaction.status === "error") {
    return {
      status: "error",
      message: transaction.message,
      transactionHash: "",
      id: "",
    };
  }

  const pollTransaction = () => {
    return new Promise<Transaction>(function (resolve) {
      const interval = setInterval(async () => {
        const responseFromTransaction = await fetch(
          `${getBaseApiUrl()}/transactions/${transaction.id}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${process.env.LUMX_API_KEY}`,
            },
          }
        );

        const dataFromTransaction = await responseFromTransaction.json();

        const { status, transactionHash = null } = dataFromTransaction;

        if (["failed", "error"].includes(status)) {
          console.log("ERROR", dataFromTransaction);
          clearInterval(interval);
          resolve({
            status: "error",
            message: "Houve um erro com seu mint",
            transactionHash: "",
            id: transaction.id,
          });
        }

        if (status === "success") {
          console.log("SUCCESS", dataFromTransaction);
          clearInterval(interval);
          resolve({
            status: "success",
            transactionHash,
            id: transaction.id,
            message: "",
          });
        }
      }, 1000);
    });
  };

  const transactionResult = await pollTransaction();

  return transactionResult;
};
