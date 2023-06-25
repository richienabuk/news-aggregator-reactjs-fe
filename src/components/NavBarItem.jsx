import { Link } from "react-router-dom";
import { useState } from 'react';
import PropTypes from 'prop-types';
import NavBarMenuList from './NavBarMenuList.jsx';
import BaseIcon from './BaseIcon.jsx';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

const NavBarItem = ({ item, logOut }) => {
	// @todo manage state in upper scope or with context to allow for closing opened toggle before opening another.
	const [isDropdownActive, setIsDropdownActive] = useState(false)
	const componentClass = [
		'mt-2 transition-colors duration-300 transform text-black lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer',
		isDropdownActive
			? ''
			: 'text-black hover:text-blue-500 py-2 px-3',
		item.menu ? 'lg:py-2 lg:px-3' : 'py-2 px-3',
	].join(' ')

	const handleMenuClick = () => {
		if (item.menu) {
			setIsDropdownActive(!isDropdownActive)
		}

		if (item.isLogout) {
			logOut()
		}
	}

	const NavBarItemComponentContents = (
		<>
			<div
				className={`flex items-center ${
					item.menu
						? 'bg-gray-100 lg:bg-transparent p-3 lg:p-0'
						: ''
				}`}
				onClick={handleMenuClick}
			>
				<span className={`px-2 transition-colors`}>
                 {item.label}
                </span>
				{item.menu && (
					<BaseIcon
						path={isDropdownActive ? mdiChevronUp : mdiChevronDown}
						className="hidden lg:inline-flex transition-colors"
					/>
				)}
			</div>
			{item.menu && (
				<div
					className={`${
						!isDropdownActive ? 'lg:hidden' : ''
					} text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg`}
				>
					<NavBarMenuList menu={item.menu} />
				</div>
			)}
		</>
	)

	if (item.to) {
		return (
			<Link to={item.to} className={componentClass}>
				{NavBarItemComponentContents}
			</Link>
		)
	}

	if (item.href) {
		return (
			<a href={item.href} target="_blank" rel="noreferrer" className={componentClass}>
				{NavBarItemComponentContents}
			</a>
		)
	}

	return <div className={componentClass}>{NavBarItemComponentContents}</div>
};

NavBarItem.propTypes = {
	item: PropTypes.object.isRequired,
	logOut: PropTypes.func
};

export default NavBarItem
