'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mint } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState, useTransition } from 'react';
import { useServerAction } from '@/hooks/useServerAction';
import { redirect } from 'next/navigation';

const transactionHash = '';

const SubmitButtonForm = ({ isLoading }: { isLoading: boolean }) => {
	const { pending, data } = useFormStatus();
	// const status = data?.get('status');

	return (
		<Button type='submit' aria-disabled={pending}>
			{pending ? 'minting...' : 'Mint'}
		</Button>
	);
};

export const ClaimForm = () => {
	const mintWithWalletId = mint.bind(
		null,
		'fc779ee2-3a3b-4332-9900-71bde7545aee'
	);
	const [state, formAction] = useFormState(mintWithWalletId, transactionHash);

	// const [runAction, isRunning] = useServerAction(formAction, (result) => {
	// 	console.log(result, 'result');
	// });

	useEffect(() => {
		if (state.includes('0x')) {
			redirect(`?hash=${state}`);
		}
	}, [state]);

	// const onSubmit = async (formData: FormData) => {
	// 	await runAction(formData);
	// };

	return (
		<form action={formAction} className='flex gap-4 pt-4'>
			<Input
				id='quantity'
				type='number'
				name='quantity'
				className='w-[111px] text-center'
				required
			/>
			{JSON.stringify(state)}
			<SubmitButtonForm isLoading />
		</form>
	);
};
