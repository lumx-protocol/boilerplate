"use server";

import config from "../../lumx.json";

export const mint = async (
  walletId: string,
  prevState: any,
  formData: FormData
) => {
  console.log("minting", walletId, prevState, formData);
  const response = await fetch(`${config.protocolUrl}/transactions/mints`, {
    method: "POST",
    body: JSON.stringify({
      amount: Number(formData.get("quantity")),
      walletId,
      itemTypeId: config.itemTypeId,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.PROTOCOL_KEY}`,
    },
  });

  const data = await response.json();

  let dataFromTransaction;

  function interval() {
    return new Promise<string>(function (resolve, reject) {
      const interval = setInterval(async () => {
        console.log("interval started");
        const responseFromTransaction = await fetch(
          `${config.protocolUrl}/transactions/${data.id}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${process.env.PROTOCOL_KEY}`,
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
