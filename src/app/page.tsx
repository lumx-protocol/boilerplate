import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export type Item = {
	id: string;
	name: string;
	description: string;
	imageUrl: string;
};

export type Contract = {
	name: string;
	description: string;
};

export default async function Home() {
	const getItemType = async () => {
		const responseForItemType = await fetch(
			`${process.env.NEXT_PUBLIC_PROTOCOL_URL}/contracts/${process.env.NEXT_PUBLIC_CONTRACT_ID}/item-types/${process.env.NEXT_PUBLIC_ITEM_TYPE_ID}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.PROTOCOL_KEY}`,
				},
			}
		);

		const item = (await responseForItemType.json()) as Item;

		return item;
	};

	const getContract = async () => {
		const responseForContract = await fetch(
			`${process.env.NEXT_PUBLIC_PROTOCOL_URL}/contracts/${process.env.NEXT_PUBLIC_CONTRACT_ID}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.PROTOCOL_KEY}`,
				},
			}
		);

		const contract = (await responseForContract.json()) as Contract;

		return contract;
	};

	const item = await getItemType();
	const contract = await getContract();

	return (
		<div className='min-h-screen flex flex-col justify-between'>
			<Header />
			<main className='pb-24 px-[calc(100%-85vw)]'>
				<div className='flex gap-10 items-center pt-16'>
					{item.imageUrl ? (
						<Image
							src={item.imageUrl}
							alt={item.name}
							width={600}
							height={600}
						/>
					) : (
						<div className='h-[600px] flex-shrink-0 w-[600px] rounded-md bg-neutral-300' />
					)}
					<article>
						<h4 className='text-sm leading-[14px] text-neutral-500 font-medium pb-1.5'>
							Minting now
						</h4>
						<h1 className='font-semibold text-3xl tracking-[-0.75%] pb-1.5'>
							{item.name || 'Item Name'}
						</h1>
						<h2 className='font-normal text-sm leading-[14px] text-neutral-500 pb-4'>
							{contract.name || 'Contract Name'}
						</h2>
						<p className='break-words max-w-[600px]'>{item.description}</p>
						<form className='flex gap-4 pt-4'>
							<Input className='w-[111px] text-center' />
							<Button>Claim</Button>
						</form>
						<Separator className='mt-9 mb-4' />
						<span className='font-medium text-sm text-neutral-500'>
							Mints 9999
						</span>
						<span className='pl-4 font-medium text-sm text-neutral-500'>
							17h 16m 32s left
						</span>
					</article>
				</div>
			</main>
			<Footer />
		</div>
	);
}
