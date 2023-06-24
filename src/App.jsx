import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Pages/HomePage.jsx'
import Categories from './Pages/News/NewsCategories.jsx'
import Sources from './Pages/News/NewsSources.jsx'
import Authors from './Pages/News/NewsAuthors.jsx'
import Authentication from './Pages/User/UserAuth.jsx'
import UserPreference from './Pages/User/UserPreference.jsx'
import ErrorPage from './Pages/ErrorPage.jsx';

const App = () => {
  return (
      <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='categories' element={<Categories />} />
              <Route path='sources' element={<Sources />} />
              <Route path='authors' element={<Authors />} />
              <Route path='auth/*' element={<Authentication />} />
              <Route path='user/preferences' element={<UserPreference />} />
              <Route path='*' element={<ErrorPage />} />
          </Route>
      </Routes>
  )
}

export default App
