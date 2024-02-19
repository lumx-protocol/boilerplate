'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mint } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState, useTransition } from 'react';
import { useServerAction } from '@/hooks/useServerAction';

const initialState = {
	id: '',
	itemTypeId: '',
	amount: 0,
	status: 'pre-submit',
	transactionHash: null,
};

const SubmitButtonForm = ({ isLoading }: { isLoading: boolean }) => {
	const { pending, data } = useFormStatus();
	// const status = data?.get('status');

	return (
		<Button type='submit' aria-disabled={pending}>
			{isLoading ? 'minting...' : 'Mint'}
		</Button>
	);
};

export const ClaimForm = () => {
	const [state, formAction] = useFormState(mint, initialState);

	const [runAction, isRunning] = useServerAction(formAction, (hahah) => {
		console.log('hahaha');
	});

	const onSubmit = async (formData: FormData) => {
		// run some validarion here
		var result = await runAction(formData);
		// continue running some code after the action completed
	};

	return (
		<form action={onSubmit} className='flex gap-4 pt-4'>
			<Input
				id='quantity'
				type='number'
				name='quantity'
				className='w-[111px] text-center'
				required
			/>
			<SubmitButtonForm isLoading={isRunning} />
		</form>
	);
};
