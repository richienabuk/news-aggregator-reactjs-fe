import { useMutation, useQuery } from '@apollo/client';
import { GET_AUTHORS, GET_CATEGORIES, GET_PREFERENCES, GET_SOURCES } from '../../utilities/graphQL/queries.js';
import QueryResult from '../../components/QueryResult.jsx';
import { useState } from 'react';
import UserPreferenceViewerEditor from '../../components/UserPreferenceViewerEditor.jsx';
import { UPSERT_PREFERENCE } from '../../utilities/graphQL/mutations.js';

const UserPreference = () => {
	const [preferredSources, setPreferredSources] = useState({ value: [], key: 'Sources' });
	const [preferredAuthors, setPreferredAuthors] = useState({ value: [], key: 'Authors' });
	const [preferredCategories, setPreferredCategories] = useState({ value: [], key: 'Categories' });

	let loadingData, errorData;
	const { loading, error, data: { me } = {} } = useQuery(GET_PREFERENCES, {
		onCompleted: ({ me }) => {
			me?.preferences?.forEach(preference => {
				if (preference.key === 'Authors') {
					setPreferredAuthors(preference)
				}
				if (preference.key === 'Sources') {
					setPreferredSources(preference)
				}
				if (preference.key === 'Categories') {
					setPreferredCategories(preference)
				}
			})
		}
	});
	const { loading: authorsLoading, error: authorsError, data: { authors } = {} } = useQuery(GET_AUTHORS);
	const { loading: sourcesLoading, error: sourcesError, data: { sources } = {} } = useQuery(GET_SOURCES);
	const { loading: categoriesLoading, error: categoriesError, data: { categories } = {} } = useQuery(GET_CATEGORIES);

	const [upsertPreference, { error: upsertPreferenceError }] = useMutation(UPSERT_PREFERENCE);

	loadingData = authorsLoading || sourcesLoading || categoriesLoading || loading;
	errorData = authorsError || sourcesError || categoriesError || error || upsertPreferenceError;

	return (
		<section>
			<section className="mt-10 mb-8 flex flex-col text-center w-full">
				<h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Preferences</h1>
				<p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
					Personalize your experience by viewing and updating your sources, authors and categories
				</p>
			</section>
			<QueryResult error={errorData} loading={loadingData} data={me}>
				<section>
					{categories &&
						<UserPreferenceViewerEditor
							data={categories}
							userPreference={preferredCategories}
							upsertPreference={(values) => upsertPreference({ variables: { input: values }})}
						/>
					}

					{sources &&
						<UserPreferenceViewerEditor
							data={sources}
							userPreference={preferredSources}
							upsertPreference={(values) => upsertPreference({ variables: { input: values }})}
						/>
					}

					{authors &&
						<UserPreferenceViewerEditor
							data={authors}
							userPreference={preferredAuthors}
							upsertPreference={(values) => upsertPreference({ variables: { input: values }})}
						/>
					}
				</section>
			</QueryResult>
		</section>
	)
}

export default UserPreference;
