import siteLogo from '../assets/aggrenews.svg';
import NavBarMenuList from './NavBarMenuList.jsx';
import { mainMenu, userMenu } from '../menuItems.js';
import { useContext, useState } from 'react';
import BaseIcon from './BaseIcon.jsx';
import { mdiClose, mdiMenu } from '@mdi/js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const { user } = useContext(AuthContext)

	const handleMenuNavBarToggleClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<nav className="bg-white shadow">
			<div className="container px-6 py-4 mx-auto">
				<div className="lg:flex lg:items-center">
					<div className="flex items-center justify-between">
						<Link to="/">
							<img src={siteLogo} className="w-auto h-6 sm:h-7" alt="site logo" />
						</Link>

						{/*Mobile menu button*/}
						<div onClick={handleMenuNavBarToggleClick} className="flex lg:hidden cursor-pointer">
							<BaseIcon path={isOpen ? mdiClose : mdiMenu} size="24" />
						</div>
					</div>

					<div className={`${
						isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
					} absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between`}>
						<NavBarMenuList menu={mainMenu} className={"flex flex-col text-gray-600 capitalize lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center"} />

						<NavBarMenuList menu={userMenu} user={user ? user.user : {}} className="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2" />
					</div>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
