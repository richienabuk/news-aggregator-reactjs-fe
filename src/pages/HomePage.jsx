import { useQuery } from '@apollo/client';
import { GET_NEWS } from '../utilities/graphQL/queries.js';
import { useState } from 'react';
import ArticleList from '../components/ArticleList.jsx';
import QueryResult from '../components/QueryResult.jsx';
import ArticleSearchFilter from '../components/ArticleSearchFilter.jsx';
import ListPagination from '../components/ListPagination.jsx';

const HomePage = () => {
	const [searchTerm, setSearchTerm] = useState(null);
	const { loading, error, data: { news } = {}, refetch } = useQuery(GET_NEWS);
	const onSearchFilterUpdate = (data) => {
		for (const item in data) {
			if (!data[item]) {
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
			<h1 className="mt-10 text-2xl font-bold md:text-3xl">Latest News from round the globe</h1>
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
