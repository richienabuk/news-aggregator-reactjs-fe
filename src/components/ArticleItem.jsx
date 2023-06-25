import PropTypes from 'prop-types';

const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const ArticleItem = ({ article }) => (
	<article className="article">
		<a href={article.url} target="_blank" rel="noreferrer">
			<img
				src={article.preview_image}
				alt={article.title}
				className="object-cover max-h-48 w-full mb-5"
				// className="object-contain hover:object-cover h-48 w-96 mb-5"
			/>
			<div className="flex items-center mb-3">
				<span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold leading-5 text-white font-display mr-2 capitalize bg-red-500">
					{article.source.name}
				</span>
				<p className="font-mono text-xs font-normal opacity-75 text-black"><time dateTime={article.published_at}>{formatDate(article.published_at)}</time></p>
			</div>
			<p className="font-display max-w-sm text-2xl font-bold leading-tight mb-2">
                <span className="link-underline link-underline-black text-black">
                    {article.title}
                </span>
			</p>
			{article.description && <p className="mb-2">{article.description?.substring(0, 160)}...</p>}
			<div className="flex flex-wrap justify-between text-sm">
				<span className="text-red-500">{article.category.name}</span>
				<ul>
					By: {article.authors.map(author => (
						<span key={author.id}>{author.name}, &nbsp;</span>
					))}
				</ul>
			</div>
		</a>
	</article>
)

ArticleItem.propTypes = {
	article: PropTypes.object.isRequired,
};

export default ArticleItem;
