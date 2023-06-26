import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from '../../constants.js';

const httpLink = createHttpLink({
	uri: import.meta.env.VITE_GRAPHQL_API_URL,
});

const authLink = setContext((_, { headers }) => {
	let user = localStorage.getItem(AUTH_TOKEN);
	if (user) {
		user = JSON.parse(user)
	}
	return {
		headers: {
			...headers,
			authorization: user ? `Bearer ${user.access_token}` : ''
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
