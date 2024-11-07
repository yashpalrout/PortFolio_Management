'use client';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn, getInitials } from '@/lib/utils';
import AuthService from '@/services/auth.service';
import { IUser } from '@/types/user';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineStock } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { FaUserGear, FaUserGroup } from 'react-icons/fa6';
import { GrFavorite, GrMoney } from 'react-icons/gr';
import { MdChevronRight } from 'react-icons/md';
import { RiDashboard3Line, RiExchangeFundsFill, RiFundsLine, RiStockLine } from 'react-icons/ri';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ThemeSwitch from './ThemeSwitch';
import { AddMoney } from './dialogs/AddMoney';
import { ChangePassword } from './dialogs/ChangePassword';
import { EditProfile } from './dialogs/EditProfile';

export function AppSidebar({ user, wallet_balance }: { user: IUser; wallet_balance: number }) {
	const router = useRouter();

	const handleLogout = async () => {
		await AuthService.logout();
		router.push('/');
	};

	return (
		<Sidebar>
			<SidebarHeader className='p-2 select-none'>
				<div className='flex gap-5 hover:bg-sidebar-accent p-2 transition-all rounded-md'>
					<div className='bg-primary p-2 rounded-md w-fit'>
						<Image src={'/logo.png'} width={25} height={25} alt={''} />
					</div>
					<div className='cursive-font font-bold text-4xl'>mInvest</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<Collapsible defaultOpen className='group/collapsible'>
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								Console
								<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<MenuButton
											icon={<RiDashboard3Line />}
											text='Dashboard'
											href='/console/dashboard'
										/>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>

				{user.role === 'PORTAL_MANAGER' ? <PortalManagerSidebar /> : null}
				{user.role === 'FUND_MANAGER' ? <FundManagerSidebar /> : null}
				{user.role === 'INVESTOR' ? <InvestorSidebar /> : null}

				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className='flex justify-start items-center gap-2 p-2 bg-sidebar-accent rounded-md '>
							<Avatar>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
							</Avatar>
							<div className='flex flex-col'>
								<span className='text-primary'>{user.name}</span>
								<span className='text-neutral-500 text-sm'>{user.email}</span>
							</div>
							<ChevronUp className='ml-auto' />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56 md:w-[18rem]'>
						<DropdownMenuLabel>Hi {user.name}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className='cursor-pointer' onSelect={(e) => e.preventDefault()}>
								<EditProfile user={user}>Profile</EditProfile>
							</DropdownMenuItem>
							<DropdownMenuItem className='cursor-pointer' onSelect={(e) => e.preventDefault()}>
								<ChangePassword>Change Password</ChangePassword>
							</DropdownMenuItem>
							{!isNaN(wallet_balance) && (
								<DropdownMenuItem>
									Balance : $<span className='font-bold'>{wallet_balance}</span>
								</DropdownMenuItem>
							)}
							<DropdownMenuItem>
								<ThemeSwitch />
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='cursor-pointer' onSelect={(e) => e.preventDefault()}>
							<AddMoney>Add to Wallet</AddMoney>
						</DropdownMenuItem>
						<DropdownMenuItem disabled>API</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

function InvestorSidebar() {
	return (
		<>
			<Collapsible defaultOpen className='group/collapsible'>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<CollapsibleTrigger>
							Mutual Funds
							<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
						</CollapsibleTrigger>
					</SidebarGroupLabel>
					<CollapsibleContent>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<MenuButton icon={<RiFundsLine />} text='All Funds' href='/console/funds/all' />
									<MenuButton
										icon={<RiStockLine />}
										text='Invested Funds'
										href='/console/funds/invested'
									/>
									<MenuButton
										icon={<GrFavorite />}
										text='Favorites Funds'
										href='/console/funds/favorites'
									/>
									<MenuButton icon={<RiExchangeFundsFill />} text='IPO' href='/console/funds/ipo' />
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>
			<Collapsible defaultOpen className='group/collapsible'>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<CollapsibleTrigger>
							Transactions
							<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
						</CollapsibleTrigger>
					</SidebarGroupLabel>
					<CollapsibleContent>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<MenuButton
										icon={<GrMoney />}
										text='Fund Transaction'
										href='/console/transactions/fund'
									/>
									<MenuButton
										icon={<RiStockLine />}
										text='Wallet Transaction'
										href='/console/transactions/wallet'
									/>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>
		</>
	);
}

function FundManagerSidebar() {
	return (
		<>
			<Collapsible defaultOpen className='group/collapsible'>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<CollapsibleTrigger>
							Repository
							<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
						</CollapsibleTrigger>
					</SidebarGroupLabel>
					<CollapsibleContent>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<MenuButton
										icon={<AiOutlineStock />}
										text='Stocks Repository'
										href='/console/tickers/repository'
									/>
									<MenuButton
										icon={<RiStockLine />}
										text='Ticker Performance'
										href='/console/tickers'
									/>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>

			<Collapsible defaultOpen className='group/collapsible'>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<CollapsibleTrigger>
							Mutual Funds
							<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
						</CollapsibleTrigger>
					</SidebarGroupLabel>
					<CollapsibleContent>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<MenuButton
										icon={<RiFundsLine />}
										text='Managed Funds'
										href='/console/funds/managed'
									/>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>

			<Collapsible defaultOpen className='group/collapsible'>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<CollapsibleTrigger>
							Transactions
							<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
						</CollapsibleTrigger>
					</SidebarGroupLabel>
					<CollapsibleContent>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<MenuButton
										icon={<RiStockLine />}
										text='Wallet Transaction'
										href='/console/transactions/wallet'
									/>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>
		</>
	);
}

function PortalManagerSidebar() {
	return (
		<>
			<Collapsible defaultOpen className='group/collapsible'>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<CollapsibleTrigger>
							Repository
							<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
						</CollapsibleTrigger>
					</SidebarGroupLabel>
					<CollapsibleContent>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<MenuButton
										icon={<AiOutlineStock />}
										text='Stocks Repository'
										href='/console/tickers/repository'
									/>
									<MenuButton
										icon={<RiStockLine />}
										text='Ticker Performance'
										href='/console/tickers'
									/>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>

			<Collapsible defaultOpen className='group/collapsible'>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<CollapsibleTrigger>
							Mutual Funds
							<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
						</CollapsibleTrigger>
					</SidebarGroupLabel>
					<CollapsibleContent>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<MenuButton icon={<RiFundsLine />} text='All Funds' href='/console/funds/all' />
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>

			<Collapsible defaultOpen className='group/collapsible'>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<CollapsibleTrigger>
							Transactions
							<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
						</CollapsibleTrigger>
					</SidebarGroupLabel>
					<CollapsibleContent>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<MenuButton
										icon={<GrMoney />}
										text='Fund Transaction'
										href='/console/transactions/fund'
									/>
									<MenuButton
										icon={<RiStockLine />}
										text='Wallet Transaction'
										href='/console/transactions/wallet'
									/>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>

			<Collapsible defaultOpen className='group/collapsible'>
				<SidebarGroup>
					<SidebarGroupLabel asChild>
						<CollapsibleTrigger>
							Users
							<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
						</CollapsibleTrigger>
					</SidebarGroupLabel>
					<CollapsibleContent>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<MenuButton
										icon={<FaUserGear />}
										text='Portal Managers'
										href='/console/users/portal-managers'
									/>
									<MenuButton
										icon={<FaUserGroup />}
										text='Fund Managers'
										href='/console/users/fund-managers'
									/>
									<MenuButton icon={<FaUser />} text='Investors' href='/console/users/investors' />
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>
		</>
	);
}

function MenuButton({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) {
	const pathname = usePathname();

	const isActive = pathname.startsWith(href);

	return (
		<SidebarMenuButton asChild>
			<Link href={href} className={isActive ? 'bg-sidebar-accent p-2' : 'hover:bg-sidebar-hover'}>
				<div className={cn('w-full inline-flex items-center gap-2 text-lg justify-between')}>
					<div className='w-full inline-flex items-center gap-2 text-lg '>
						{icon}
						<span className='text-base'>{text}</span>
					</div>
					<MdChevronRight className='float-right' />
				</div>
			</Link>
		</SidebarMenuButton>
	);
}
