import PropTypes from 'prop-types';
import { useState } from 'react';

const UserPreferenceViewerEditor = ({ data, userPreference, upsertPreference }) => {
	const [preference, setPreferences] = useState(userPreference.value);

	const handleChange = (e) => {
		let { checked, value } = e.target
		if (!value) {
			return
		}
		const val = JSON.parse(value);
		if (checked) {
			setPreferences(old => [...old, val.id])
		} else {
			const clearSources = preference.filter((item) => item !== val.id);
			setPreferences(clearSources)
		}
	}

	const updateSources = () => {
		const data = { value: preference, key: userPreference.key };
		if (userPreference.id) {
			data.id = userPreference.id
		}
		console.log(data)
		upsertPreference(data)
	}

	return (
		<div className="flex flex-wrap w-full my-12">
			<div className="w-full mb-6 lg:mb-0">
				<h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
					{userPreference.key}
				</h2>
				<div className="h-1 w-20 bg-red-500 rounded"></div>
			</div>
			<div className="mt-4 w-full leading-relaxed text-gray-500 flex flex-wrap">
				{data.map(item => {
					const source = {...item};
					if (preference.includes(source.id)) {
						source.selected = true;
					}
					return (
						<div key={source.id} className="flex items-center mr-2 my-2">
							<input
								onChange={handleChange}
								id={'source-' + source.id}
								type="checkbox" value={JSON.stringify(source)}
								checked={source.selected}
								className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
							/>
							<label htmlFor="purple-checkbox" className="ml-2 text-sm font-medium text-gray-900">{source.name}</label>
						</div>
					)
				})}
			</div>
			<button onClick={updateSources} className="mt-4 text-white bg-red-900 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
		</div>)
}

UserPreferenceViewerEditor.propTypes = {
	data: PropTypes.array.isRequired,
	userPreference: PropTypes.object.isRequired,
	upsertPreference: PropTypes.func.isRequired,
};

export default UserPreferenceViewerEditor;
