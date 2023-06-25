import { useReducer, createContext } from 'react';
import { AUTH_TOKEN } from '../constants.js';

const authTypes = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT'
}

const initialState = {
	user: {}
}

let existing = localStorage.getItem(AUTH_TOKEN)
if (existing) {
	// @todo check if token has expired before assigning it.
	initialState.user = JSON.parse(existing);
}

const AuthContext = createContext({
	user: {},
	login: (userData) => {},
	logout: () => {}
})

const authReducer = (state, action) => {
	switch (action.type) {
		case authTypes.LOGIN:
			return {
				...state,
				user: action.payload
			}
		case authTypes.LOGOUT:
			return {
				...state,
				user: {}
			}
		default:
			return state
	}
}

function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const login = (userData) => {
		localStorage.setItem(AUTH_TOKEN, JSON.stringify(userData));
		dispatch({
			type: authTypes.LOGIN,
			payload: userData
		})
	}

	const logout = () => {
		localStorage.removeItem(AUTH_TOKEN);
		dispatch({
			type: authTypes.LOGOUT
		})
	}

	return (
		<AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
	)
}

export { AuthContext, AuthProvider }
