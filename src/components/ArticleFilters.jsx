import ArticleFilterSelectItem from './ArticleFilterSelectItem.jsx';
import PropTypes from 'prop-types';

const ArticleFilters = ({ selectItems = [], onChanges}) => {
	if (!selectItems.length) {
		return;
	}
	const handleSelect = (data) => {
		onChanges(data)
	}

	return (
		<section className="mx-auto relative bg-white min-w-sm max-w-2xl grid md:grid-cols-2 gap-4 items-center justify-center py-2 px-2">
			{selectItems && selectItems.map((item, index) => (
				<ArticleFilterSelectItem key={index} {...item} onSelect={handleSelect} />
			))}
		</section>
  )
}

ArticleFilters.propTypes = {
	selectItems: PropTypes.array.isRequired,
	onChanges: PropTypes.func.isRequired,
}

export default ArticleFilters
