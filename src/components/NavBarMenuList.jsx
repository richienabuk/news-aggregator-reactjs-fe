import PropTypes from 'prop-types';
import NavBarItem from './NavBarItem'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext.jsx';
import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../utilities/graphQL/mutations.js';
import { useNavigate } from 'react-router-dom';

const NavBarMenuList = ({ menu, className = '', user = {} }) => {
	const { logout } = useContext(AuthContext)
	const navigate = useNavigate();
	const [logOut, { data, loading, error }] = useMutation(LOGOUT_MUTATION, {
		update(cache, { data: { logout: userData }}) {
			logout(userData);
			navigate('/')
		},
	});
	const displayMenu = menu.filter(item => (item.protected && user.id) || (item.anonymous && !user.id) || (!item.anonymous && !item.protected))
	return (
		<div className={className}>
			{displayMenu.map((item, index) => {
				// If there are multiple placeholders, a function or switch statement can be used to swap em out.
				if (user.name) {
					item.label = item.label === '{userName}' ? user.name : item.label;
				}

				return (<NavBarItem key={index} item={item} logOut={logOut} />)
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
