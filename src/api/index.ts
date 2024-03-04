import { Item, Contract } from "@/types";
import axios from "axios";
import config from "../../lumx.json";

export const getBaseApiUrl = () =>
  process.env.LUMX_ENV === "sandbox"
    ? "https://protocol-sandbox.lumx.io/v1/"
    : "https://protocol.lumx.io/v1/";

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
