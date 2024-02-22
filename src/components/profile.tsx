'use client';

import { Wallet } from '@lumx-protocol/embedded-wallet';

import { UserNav } from './user-nav';
import { Separator } from './ui/separator';

export const Profile = () => {
	const user = JSON.parse(localStorage.getItem('wallet.user')!) || {};
	const getAbbreviatedWalletAddress = (address: string) => {
		return `${address.slice(0, 4)}...${address.slice(-4)}`;
	};

	return (
		<div className='ml-auto sm:ml-0'>
			{Object.keys(user).length > 0 ? (
				<div className='flex h-10 items-center space-x-4 text-sm'>
					<div>
						<h4 className='text-sm font-medium'>Hello, {user.name}</h4>
						<p className='text-xs text-neutral-700'>
							{getAbbreviatedWalletAddress(user.walletAddress)}
						</p>
					</div>
					<Separator orientation='vertical' />
					<UserNav user={user} />
				</div>
			) : (
				<Wallet />
			)}
		</div>
	);
};
