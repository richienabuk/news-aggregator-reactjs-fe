import PropTypes from 'prop-types';

const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const ArticleItem = ({ article }) => (
	<article className="article">
		<img
			src={article.preview_image}
			alt={article.title}
			className="object-contain hover:object-cover h-48 w-96"
		/>
		<h2>
			<a href={article.url} target="_blank" rel="noreferrer">{article.title}</a>
		</h2>
		<span>{article.source.name}</span>
		<span>{article.category.name}</span>
		{/*Add authors*/}
		<time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
		<p>{article.description}</p>
	</article>
)

ArticleItem.propTypes = {
	article: PropTypes.object.isRequired,
};

export default ArticleItem;
