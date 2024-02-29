import { Item, Contract } from "@/types";
import axios from "axios";
import config from "../../lumx.json";

export const protocolInstance = axios.create({
  baseURL: config.protocolUrl,
});

protocolInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.PROTOCOL_KEY}`;

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
