import axios from 'axios';

export const protocolInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_PROTOCOL_URL,
});

protocolInstance.defaults.headers.common[
	'Authorization'
] = `Bearer ${process.env.PROTOCOL_KEY}`;
