import Image from 'next/image';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { type Contract, type Item } from '@/app/page';
import { Clock } from './ui/clock';
import { ClaimForm } from './claim-form';

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
				<Image src={imageUrl} alt={name} width={232} height={232} />
			) : (
				<div className='h-[232px] flex-shrink-0 w-[232px] rounded-md bg-neutral-300' />
			)}
			<article>
				<h4 className='text-sm leading-[14px] text-neutral-500 font-medium pb-1.5'>
					Congratulations!
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
