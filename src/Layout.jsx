import NavBar from './Components/NavBar.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<NavBar />
			<div className="container px-6 py-4 mx-auto">
				<Outlet />
			</div>
		</>
	)
}

export default Layout;
