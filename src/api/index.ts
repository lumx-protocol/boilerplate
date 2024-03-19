import { Item, Contract } from "@/types";
import axios from "axios";
import config from "../../lumx.json";

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

protocolInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.LUMX_API_KEY}`;

export const getItemType = async () => {
  const response = await protocolInstance.get<Item>(
    `/contracts/${config.contractId}/item-types/${config.itemTypeId}`
  );

  return response.data;
};

export const getContract = async () => {
  const response = await protocolInstance.get<Contract>(
    `/contracts/${config.contractId}`
  );

  return response.data;
};
