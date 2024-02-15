import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col justify-between'>
			<Header />
			<main className='pb-24 px-[calc(100%-85vw)]'>
				<div className='flex gap-10 items-center pt-16'>
					<div className='h-[600px] flex-shrink-0 w-[600px] rounded-md bg-neutral-300' />
					<article>
						<h4 className='text-sm leading-[14px] text-neutral-500 font-medium pb-1.5'>
							Minting now
						</h4>
						<h1 className='font-semibold text-3xl tracking-[-0.75%] pb-1.5'>
							Token type name
						</h1>
						<h2 className='font-normal text-sm leading-[14px] text-neutral-500 pb-4'>
							Collection name
						</h2>
						<p className='break-words max-w-[600px]'>
							Lorem ipsum dolor sit amet consectetur. Purus platea cras iaculis
							aliquam suspendisse consequat pharetra justo in. Lorem ipsum dolor
							sit amet consectetur. Purus platea cras iaculis aliquam
							suspendisse consequat pharetra justo in.
						</p>
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
