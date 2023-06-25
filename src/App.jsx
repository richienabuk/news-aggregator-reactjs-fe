import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/HomePage.jsx'
import Categories from './pages/news/NewsCategories.jsx'
import Sources from './pages/news/NewsSources.jsx'
import Authors from './pages/news/NewsAuthors.jsx'
import Authentication from './pages/user/UserAuth.jsx'
import UserPreference from './pages/user/UserPreference.jsx'
import NotFound from './pages/NotFound.jsx';

const App = () => {
  return (
      <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='categories' element={<Categories />} />
              <Route path='sources' element={<Sources />} />
              <Route path='authors' element={<Authors />} />
              <Route path='auth/:action' element={<Authentication />} />
              <Route path='user/preferences' element={<UserPreference />} />
              <Route path='*' element={<NotFound />} />
          </Route>
      </Routes>
  )
}

export default App
