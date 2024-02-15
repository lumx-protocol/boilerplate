import { Separator } from '@/components/ui/separator';

export const Footer = () => {
	return (
		<footer>
			<Separator />
			<div className='flex h-[80px] items-center justify-between px-[calc(100%-85vw)]'>
				<p className='text-sm leading-6'>
					Launch your project with{' '}
					<a
						className='underline text-neutral-900'
						href='https://docs.lumx.io/get-started/introduction'
						target='_blank'
					>
						Lumx Protocol
					</a>
				</p>
				<div className='ml-auto flex gap-4 text-neutral-500 font-medium text-sm'>
					<a>Community</a>
					<a>Terms of Service</a>
					<a>Privacy Policy</a>
				</div>
			</div>
		</footer>
	);
};
