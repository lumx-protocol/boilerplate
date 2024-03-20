import { Item, Contract } from "@/types";
import axios from "axios";
import config from "../../lumx.json";
import { typedFetch } from "./typed-fetch";

const environmentURLs = {
  sandbox: "https://protocol-sandbox.lumx.io/v1/",
  production: "https://protocol.lumx.io/v1/",
  staging: "https://protocol-staging.lumx.io/v1/",
};

export const getBaseApiUrl = () =>
  environmentURLs[
    (process.env.NEXT_PUBLIC_ENVIRONMENT as keyof typeof environmentURLs) ||
      "sandbox"
  ];

export const protocolInstance = axios.create({
  baseURL: getBaseApiUrl(),
});

export const getItemType = async () => {
  try {
    return typedFetch<Item>(
      `${getBaseApiUrl()}/contracts/${config.contractId}/item-types/${
        config.itemTypeId
      }`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.LUMX_API_KEY}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const getContract = async () => {
  try {
    return typedFetch<Contract>(
      `${getBaseApiUrl()}/contracts/${config.contractId}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.LUMX_API_KEY}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};
