import { getItemType, getContract } from '@/api';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ItemInfo } from '@/components/item';
import { SuccessDialog } from '@/components/success-dialog';

export default async function Home({
	searchParams,
}: {
	searchParams: { hash: string };
}) {
	const item = await getItemType();
	const contract = await getContract();

	return (
		<div className='min-h-screen flex flex-col justify-between'>
			<Header />
			{searchParams.hash && (
				<SuccessDialog item={item} hash={searchParams.hash} />
			)}
			<main className='sm:pb-24 pb-0 sm:px-[calc(100%-85vw)] px-[calc(5vw)]'>
				<ItemInfo contract={contract} item={item} />
			</main>
			<Footer />
		</div>
	);
}
