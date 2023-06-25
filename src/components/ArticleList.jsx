import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem.jsx';

const ArticleList = ({ articles = [] }) => (
	<section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-12">
		{articles.map((article, index) => (
			<ArticleItem key={index}  article={article}/>
		))}
	</section>
)

ArticleList.propTypes = {
	articles: PropTypes.array,
};

export default ArticleList;
