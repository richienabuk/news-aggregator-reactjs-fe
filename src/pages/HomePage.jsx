import { useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_NEWS, GET_SOURCES } from '../utilities/graphQL/queries.js';
import { useContext, useState } from 'react';
import ArticleList from '../components/ArticleList.jsx';
import QueryResult from '../components/QueryResult.jsx';
import ArticleSearch from '../components/ArticleSearch.jsx';
import ListPagination from '../components/ListPagination.jsx';
import ArticlesPersonalizedFeedToggle from '../components/ArticlesPersonalizedFeedToggle.jsx';
import { AuthContext } from '../context/authContext.jsx';
import ArticleFilters from '../components/ArticleFilters.jsx';

const HomePage = () => {
	const { user: { user } = {} } = useContext(AuthContext);
	const [searchFilter, setSearchFilter] = useState({});
	const [articleFilterData, setArticleFilterData] = useState([])

	const { loading, error, data: { news } = {}, refetch } = useQuery(GET_NEWS);
	useQuery(GET_SOURCES, {
		onCompleted: ({ sources }) => {
			const data = {
				description: 'Filter by source',
				list: sources,
				mutationKey: 'sourceId'
			}
			setArticleFilterData((old) => [...old, data])
		}
	});
	useQuery(GET_CATEGORIES, {
		onCompleted: ({ categories }) => {
			const data = {
				description: 'Filter by category',
				list: categories,
				mutationKey: 'categoryId'
			}
			setArticleFilterData((old) => [...old, data])
		}
	});

	const onSearchFilterUpdate = (data) => {
		if (data.reset) {
			data = {}
			setSearchFilter(data)
			refetch(data)
			return;
		}
		const searchQuery = { ...searchFilter, ...data };
		for (const item in searchQuery) {
			if (searchQuery[item] === null || searchQuery[item] === '') {
				delete searchQuery[item];
				continue;
			}
			if (typeof searchQuery[item] === "string") {
				if (!(searchQuery[item]).trim()) {
					delete searchQuery[item];
					continue;
				}
				searchQuery[item] = (searchQuery[item]).trim();
			}
		}

		setSearchFilter(searchQuery);

		if (!Object.keys(searchQuery).length) {
			return;
		}

		refetch(searchQuery)
	}

	const SearchResultHeader = () => {
		if (news?.data?.length > 0) {
			return (
				<h2 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-gray-900">
					Search result for &quot;{searchFilter.searchTerm}&quot;
				</h2>
			)
		}
		return (
			<h2 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-gray-900">
				No search result for &quot;{searchFilter.searchTerm}&quot;
			</h2>
		)
	}

	return (
		<section>
			<section className="mt-10 mb-8 flex flex-col text-center w-full">
				<h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">News from around the globe</h1>
				<p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
					Stay on top of the matter and know first hand events happening round the world.
				</p>
			</section>
			{user && <ArticlesPersonalizedFeedToggle toggleFeed={onSearchFilterUpdate}/>}
			<section className="mb-16">
				<ArticleSearch searchFilterUpdate={onSearchFilterUpdate} />
				{searchFilter.searchTerm && <ArticleFilters onChanges={onSearchFilterUpdate}  selectItems={articleFilterData}/>}
			</section>
			<QueryResult error={error} loading={loading} data={news}>
				{searchFilter.searchTerm && !loading && <SearchResultHeader />}
				<ArticleList  articles={news?.data} />
			</QueryResult>
			<ListPagination  {...news?.paginatorInfo} onPaginate={onSearchFilterUpdate} />
		</section>
	)
}

export default HomePage;
