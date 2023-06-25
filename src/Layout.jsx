import NavBar from './components/NavBar.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<NavBar />
			<main className="container px-6 py-4 mx-auto">
				<Outlet />
			</main>
		</>
	)
}

export default Layout;
