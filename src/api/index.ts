import { Item, Contract } from '@/types';
import axios from 'axios';

export const protocolInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_PROTOCOL_URL,
});

protocolInstance.defaults.headers.common[
	'Authorization'
] = `Bearer ${process.env.PROTOCOL_KEY}`;

export const getItemType = async () => {
	const response = await protocolInstance.get<Item>(
		`/contracts/${process.env.NEXT_PUBLIC_CONTRACT_ID}/item-types/${process.env.NEXT_PUBLIC_ITEM_TYPE_ID}`
	);

	return response.data;
};

export const getContract = async () => {
	const response = await protocolInstance.get<Contract>(
		`/contracts/${process.env.NEXT_PUBLIC_CONTRACT_ID}`
	);

	return response.data;
};
