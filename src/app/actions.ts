'use server';

import { redirect } from 'next/navigation';

export const mint = async (
	walletId: string,
	prevState: any,
	formData: FormData
) => {
	console.log('minting', walletId, prevState, formData);
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_PROTOCOL_URL}/transactions/mints`,
		{
			method: 'POST',
			body: JSON.stringify({
				amount: Number(formData.get('quantity')),
				walletId,
				itemTypeId: process.env.NEXT_PUBLIC_ITEM_TYPE_ID,
			}),
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${process.env.PROTOCOL_KEY}`,
			},
		}
	);

	const data = await response.json();

	let dataFromTransaction;

	// const interval =

	// console.log(dataFromTransaction, 'dataFromTransaction after setinterval');

	function interval() {
		return new Promise(function (resolve, reject) {
			const interval = setInterval(async () => {
				console.log('interval started');
				const responseFromTransaction = await fetch(
					`${process.env.NEXT_PUBLIC_PROTOCOL_URL}/transactions/${data.id}`,
					{
						headers: {
							'Content-type': 'application/json',
							Authorization: `Bearer ${process.env.PROTOCOL_KEY}`,
						},
					}
				);

				dataFromTransaction = await responseFromTransaction.json();

				console.log(dataFromTransaction, 'dataFromTransaction');

				if (['failed', 'error'].includes(dataFromTransaction.status))
					clearInterval(interval);

				if (dataFromTransaction.status === 'success') {
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
