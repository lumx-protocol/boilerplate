'use client';

import { WalletContextProvider } from '@lumx-protocol/embedded-wallet';

export default function Providers({ children }: { children: React.ReactNode }) {
	// const [queryClient] = React.useState(() => new QueryClient());

	return (
		<WalletContextProvider
			clientId='cb63683f-c98b-4ac4-8dfc-4692daaab6a0'
			environment='sandbox'
			isModal
		>
			{children}
		</WalletContextProvider>
	);
}
