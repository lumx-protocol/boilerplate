import Image from 'next/image';
import { Separator } from './ui/separator';
import { Clock } from './ui/clock';
import { ClaimForm } from './claim-form';
import { Contract, Item } from '@/types';

export interface ItemInfoProps {
	item: Item;
	contract: Contract;
}

export const ItemInfo = ({ item, contract }: ItemInfoProps) => {
	const { name, description, imageUrl } = item;
	const { maxPerAddress, startsAt, name: contractName, endsAt } = contract;

	const defineMintWindow = () => {
		const start = new Date(startsAt).getTime();
		const end = new Date(endsAt).getTime();
		if (end > start && end) {
			return end;
		}

		return start;
	};

	return (
		<div className='flex gap-10 items-center pt-16'>
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt={name}
					width={600}
					height={600}
					className='rounded-md'
				/>
			) : (
				<div className='h-[600px] flex-shrink-0 w-[600px] rounded-md bg-neutral-300' />
			)}
			<article>
				<h4 className='text-sm leading-[14px] text-neutral-500 font-medium pb-1.5'>
					Minting now
				</h4>
				<h1 className='font-semibold text-3xl tracking-[-0.75%] pb-1.5'>
					{name || 'Item Name'}
				</h1>
				<h2 className='font-normal text-sm leading-[14px] text-neutral-500 pb-4'>
					{contractName || 'Contract Name'}
				</h2>
				<p className='break-words max-w-[600px]'>{description}</p>
				{maxPerAddress} (max peraddress)
				<ClaimForm />
				<Separator className='mt-9 mb-4' />
				{/* <span className='font-medium text-sm text-neutral-500'>Mints 9999</span> */}
				<Clock deadline={defineMintWindow()} />
			</article>
		</div>
	);
};
