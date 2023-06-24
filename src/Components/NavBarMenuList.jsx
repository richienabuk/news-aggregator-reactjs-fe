import PropTypes from 'prop-types';
import NavBarItem from './NavBarItem'

function NavBarMenuList({ menu, className = '', user = {} }) {
	const displayMenu = menu.filter(item => (item.protected && user.id) || (item.anonymous && !user.id) || (!item.anonymous && !item.protected))
	return (
		<div className={className}>
			{displayMenu.map((item, index) => {
				// If there are multiple placeholders, a function or switch statement can be used to swap em out.
				if (user.name) {
					item.label = item.label === '{userName}' ? user.name : item.label;
				}

				return (<NavBarItem key={index} item={item} />)
			})}
		</div>
	)
}

NavBarMenuList.propTypes = {
	menu: PropTypes.array.isRequired,
	user: PropTypes.object,
	className: PropTypes.string,
};

export default NavBarMenuList
