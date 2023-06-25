import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem.jsx';

const ArticleList = ({ articles = [] }) => (
	<section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-8 mb-12">
		{articles.map((article, index) => (
			<ArticleItem key={index}  article={article}/>
		))}
	</section>
)

ArticleList.propTypes = {
	articles: PropTypes.array,
};

export default ArticleList;
