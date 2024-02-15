import { Button } from './ui/button';
import Image from 'next/image';

export const Header = () => {
	return (
		<header className='flex gap-4 pt-12 px-[calc(100%-85vw)]'>
			<Image src='./lumx-logo.svg' height={39} width={39} alt='lumx logo' />
			<Button className='w-fit' variant={'secondary'}>
				Welcome
			</Button>
			<Button className='ml-auto'>Connect Wallet</Button>
		</header>
	);
};
