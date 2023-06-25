import { useQuery } from '@apollo/client';
import { GET_NEWS } from '../utilities/graphQL/queries.js';
import { useContext, useState } from 'react';
import ArticleList from '../components/ArticleList.jsx';
import QueryResult from '../components/QueryResult.jsx';
import ArticleSearchFilter from '../components/ArticleSearchFilter.jsx';
import ListPagination from '../components/ListPagination.jsx';
import ArticlesPersonalizedFeedToggle from '../components/ArticlesPersonalizedFeedToggle.jsx';
import { AuthContext } from '../context/authContext.jsx';

const HomePage = () => {
	const { user: { user } = {} } = useContext(AuthContext);
	const [searchTerm, setSearchTerm] = useState(null);
	const { loading, error, data: { news } = {}, refetch } = useQuery(GET_NEWS);
	const onSearchFilterUpdate = (data) => {
		for (const item in data) {
			if (data[item] === null) {
				delete data[item];
			}
		}

		if (data.searchTerm) {
			setSearchTerm(data.searchTerm)
		} else {
			setSearchTerm(null)
		}

		refetch(data)
	}

	return (
		<section>
			<section className="mt-10 mb-8 flex flex-col text-center w-full">
				<h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">News from round the globe</h1>
				<p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
					Stay on top of the matter and know first hand events happening round the world.
				</p>
			</section>
			{user && <ArticlesPersonalizedFeedToggle toggleFeed={onSearchFilterUpdate}/>}
			<ArticleSearchFilter searchFilterUpdate={onSearchFilterUpdate} />
			{searchTerm &&
				<section className="mb-3">Result for &quot;{searchTerm}&quot;:</section>
			}
			<QueryResult error={error} loading={loading} data={news}>
				<ArticleList  articles={news?.data} />
			</QueryResult>
			<ListPagination  {...news?.paginatorInfo} onPaginate={onSearchFilterUpdate} />
		</section>
	)
}

export default HomePage;
