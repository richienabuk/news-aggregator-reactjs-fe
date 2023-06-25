import PropTypes from 'prop-types';
import { useState } from 'react';

const ArticleFilterSelectItem = ({ description = '', list = [], mutationKey, onSelect }) => {
	const [selected, setSelected] = useState('');

	const handleChange = (e) => {
		onSelect({[mutationKey]: e.target.value})
		setSelected(e.target.value);
	}

	return (
		<select value={selected} onChange={handleChange} className="px-3 py-2 max-w-full border-gray-300 focus-within:border-gray-300 h-12 border">
			<option value="" disabled hidden>{description}</option>
			{list && list.map((item) => (
				<option key={item.id} value={item.id}>{item.name}</option>
			))}
		</select>
  )
}

ArticleFilterSelectItem.propTypes = {
	onSelect: PropTypes.func,
	list: PropTypes.array,
	mutationKey: PropTypes.string,
	description: PropTypes.string.isRequired,
}

export default ArticleFilterSelectItem
