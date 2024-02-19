import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ItemInfo } from '@/components/item';
import { SuccessDialog } from '@/components/success-dialog';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';

export type Item = {
	id: string;
	contractId: string;
	name: string;
	description: string;
	supply: number;
	traits: {
		[key: string]: string;
	};
	imageUrl: string;
	uriNumber: number;
};

export type Contract = {
	name: string;
	description: string;
	maxPerAddress: number;
	id: string;
	address: string;
	baseUri: string;
	type: 'fungible' | 'non-fungible';
	blockchainName: 'ethereum' | 'polygon';
	startsAt: string;
	endsAt: string;
	abi: { [key: string]: string }[];
};

export default async function Home({
	searchParams,
}: {
	searchParams: { hash: string; id: string };
}) {
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
			{searchParams.id && searchParams.hash && (
				<SuccessDialog imageUrl={item.imageUrl} />
			)}
			<main className='pb-24 px-[calc(100%-85vw)]'>
				<ItemInfo contract={contract} item={item} />
			</main>
			<Footer />
		</div>
	);
}
