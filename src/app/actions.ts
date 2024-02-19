'use server';

import { redirect } from 'next/navigation';

export const mint = async (prevState: any, formData: FormData) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_PROTOCOL_URL}/transactions/mints`,
		{
			method: 'POST',
			body: JSON.stringify({
				amount: Number(formData.get('quantity')),
				walletId: 'cda6be7a-adf6-4683-b9b9-5eb1c6942ab9',
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

		if (dataFromTransaction.status === 'completed') {
			clearInterval(interval);
			const params = new URLSearchParams({
				id: data.id,
				hash: data.transactionHash,
			});
			redirect(`?${params}`);
		}
	}, 1000);

	console.log('interval cleared', dataFromTransaction);
};
