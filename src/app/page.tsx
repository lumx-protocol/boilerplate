import { protocolInstance } from '@/api';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ItemInfo } from '@/components/item';
import { SuccessDialog } from '@/components/success-dialog';

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
	searchParams: { hash: string };
}) {
	const getItemType = async () => {
		const response = await protocolInstance.get<Item>(
			`/contracts/${process.env.NEXT_PUBLIC_CONTRACT_ID}/item-types/${process.env.NEXT_PUBLIC_ITEM_TYPE_ID}`
		);

		return response.data;
	};

	const getContract = async () => {
		const response = await protocolInstance.get<Contract>(
			`/contracts/${process.env.NEXT_PUBLIC_CONTRACT_ID}`
		);

		return response.data;
	};

	const item = await getItemType();
	const contract = await getContract();

	return (
		<div className='min-h-screen flex flex-col justify-between'>
			<Header />
			{searchParams.hash && <SuccessDialog item={item} />}
			<main className='pb-24 px-[calc(100%-85vw)]'>
				<ItemInfo contract={contract} item={item} />
			</main>
			<Footer />
		</div>
	);
}
