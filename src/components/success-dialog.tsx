'use client';

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { DialogHeader, DialogFooter } from './ui/dialog';
import Image from 'next/image';

export const SuccessDialog = ({ imageUrl }: { imageUrl: string }) => {
	return (
		<>
			<Dialog open={true}>
				{/* <DialogTrigger asChild>
					<Button variant='outline'>Edit Profile</Button>
				</DialogTrigger> */}

				<DialogContent className='sm:max-w-[520px]'>
					<div className='flex gap-4 items-center'>
						{imageUrl ? (
							<Image
								src={imageUrl}
								alt={'image'}
								className='flex-1'
								width={600}
								height={600}
							/>
						) : (
							<div className='h-[600px] flex-shrink-0 w-[600px] rounded-md bg-neutral-300' />
						)}
						<article className='flex-1'>
							<h4 className='text-sm leading-[14px] text-neutral-500 font-medium pb-1.5'>
								Minting now
							</h4>
							<h1 className='font-semibold text-xl tracking-[-0.75%] pb-1.5'>
								{'Item Name'}
							</h1>
							<h2 className='font-normal text-sm leading-[14px] text-neutral-500 pb-4'>
								{'Contract Name'}
							</h2>
							<p className='break-words max-w-[600px]'>fato</p>
						</article>
					</div>
					<DialogFooter className='flex-1'>
						<Button className='w-full'>Go to profile</Button>
						<Button variant='outline' type='submit'>
							Fechar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
