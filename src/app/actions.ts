"use server";

import { getBaseApiUrl } from "@/api";
import config from "../../lumx.json";

export const mint = async (
  walletId: string,
  prevState: any,
  formData: FormData
) => {
  console.log("minting", walletId, prevState, formData, config.itemTypeId);

  let response;
  try {
    response = await fetch(`${getBaseApiUrl()}/transactions/mints`, {
      method: "POST",
      body: JSON.stringify({
        amount: Number(formData.get("quantity")),
        walletId,
        itemTypeId: config.itemTypeId,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.LUMX_API_KEY}`,
      },
    });
  } catch (e) {
    console.log(e);
  }

  const data = await response?.json();

  let dataFromTransaction;

  function interval() {
    return new Promise<string>(function (resolve, reject) {
      const interval = setInterval(async () => {
        console.log("interval started");
        const responseFromTransaction = await fetch(
          `${getBaseApiUrl()}/transactions/${data.id}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${process.env.LUMX_API_KEY}`,
            },
          }
        );

        dataFromTransaction = await responseFromTransaction.json();

        console.log(dataFromTransaction, "dataFromTransaction");

        if (["failed", "error"].includes(dataFromTransaction.status))
          clearInterval(interval);

        if (dataFromTransaction.status === "success") {
          clearInterval(interval);
          resolve(dataFromTransaction.transactionHash);
        }
      }, 1000);
    });
  }

  let hash: string;

  const val = await interval();

  hash = val;

  return hash;
};
