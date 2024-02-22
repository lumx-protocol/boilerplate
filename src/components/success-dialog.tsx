'use client';

import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { DialogFooter } from './ui/dialog';
import Image from 'next/image';
import { Item } from '@/types';
import { useState } from 'react';

export const SuccessDialog = ({ item }: { item: Item }) => {
	const [closeModal, setCloseModal] = useState(true);

	return (
		<>
			<Dialog open={closeModal} onOpenChange={setCloseModal}>
				<DialogContent className='sm:max-w-[520px]'>
					<div className='flex gap-4 items-center'>
						{item.imageUrl ? (
							<Image
								src={item.imageUrl}
								alt={'image'}
								className='flex-1 rounded-md'
								width={236}
								height={600}
							/>
						) : (
							<div className='h-[600px] flex-shrink-0 w-[600px] rounded-md bg-neutral-300' />
						)}
						<article className='flex-1'>
							<h4 className='text-sm leading-[14px] text-neutral-500 font-medium pb-1.5'>
								Congratulations
							</h4>
							<h1 className='font-semibold text-xl tracking-[-0.75%] pb-1.5'>
								{item.name || 'Item Name'}
							</h1>
							<p className='break-words text-neutral-500 text-sm'>
								{item.description || 'item description'}
							</p>
						</article>
					</div>
					<DialogFooter className='flex-1'>
						<Button className='w-full'>Go to profile</Button>
						<DialogClose asChild>
							<Button variant='outline' type='button'>
								Fechar
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
