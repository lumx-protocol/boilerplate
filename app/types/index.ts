export type Item = {
  id: string;
  contractId: string;
  name: string;
  description: string;
  supply: number;
  traits: {
    [key: string]: string;
  };
  imageUrl: string;
  uriNumber: number;
};

export interface WalletItems {
  id: string;
  address: string;
  tokens: {
    [key: string]: {
      itemTypeId: string;
      contractType: string;
      tokenAddress: string;
      tokenId: string;
      tokenUri: string;
      metadata: {};
      name: string;
      symbol: string;
      amount: number;
    }[];
  };
}

export type Contract = {
  name: string;
  description: string;
  maxPerAddress: number;
  id: string;
  address: string;
  baseUri: string;
  type: "fungible" | "non-fungible";
  blockchainName: "ethereum" | "polygon";
  startsAt: string;
  endsAt: string;
  abi: { [key: string]: string }[];
};

export interface WalletItems {
  id: string;
  address: string;
  tokens: {
    [key: string]: {
      itemTypeId: string;
      contractType: string;
      tokenAddress: string;
      tokenId: string;
      tokenUri: string;
      metadata: {};
      name: string;
      symbol: string;
      amount: number;
    }[];
  };
}
