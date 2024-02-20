import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';

export const UserNav = ({ user }: { user: any }) => {
	const getInitialLetters = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('');
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-10 w-10'>
						<AvatarImage src='/avatars/01.png' alt={user.name} />
						<AvatarFallback className='bg-[#6E05FF] text-white'>
							{getInitialLetters(user.name)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48' align='end' forceMount>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile <ArrowUpRight className='ml-auto h-4 w-4' />
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
