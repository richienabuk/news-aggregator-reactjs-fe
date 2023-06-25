import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useState, useContext } from 'react';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../../utilities/graphQL/mutations.js';
import { AuthContext } from '../../context/authContext.jsx';
import { useForm } from '../../utilities/formHook.js';
import DisplayError from '../../components/DisplayError.jsx';

const UserAuth = () => {
	const context = useContext(AuthContext);
	const navigate = useNavigate();
	const [errors, setErrors] = useState([]);

	const { action} = useParams();  // sign-up, login
	const isSignUp = action === 'sign-up'; // default is login

	let formFields = {
		name: { label: 'Name', type: 'text', placeholder: 'John Doe', required: true },
		email: { label: 'Email', type: 'text', placeholder: 'name@company.com', required: true },
		password: { label: 'Password', type: 'password', placeholder: '••••••••', required: true }
	}

	if (!isSignUp) {
		delete formFields.name
	}

	const formState = Object.keys(formFields).reduce((accumulator, value) => {
		return {...accumulator, [value]: ''};
	}, {});

	const onSubmitForm = () => {
		isSignUp ? signup() : loginUser()
	}

	const { onChange, onSubmit, values } = useForm(onSubmitForm, formState)

	const [loginUser] = useMutation(LOGIN_MUTATION, {
		update(cache, { data: { loginUser: userData }}) {
			context.login(userData);
			navigate('/')
		},
		onError({ graphQLErrors }) {
			setErrors(graphQLErrors)
		},
		variables: { input: values }
	});

	const [signup] = useMutation(SIGNUP_MUTATION, {
		update(cache, { data: { createUser: userData }}) {
			context.login(userData);
			navigate('/')
		},
		onError({ graphQLErrors }) {
			setErrors(graphQLErrors)
		},
		variables: { input: values }
	});

	const FormFooter = () => {
		if (!isSignUp) {
			return (
				<p className="text-sm font-light text-gray-500">
					Don’t have an account yet? <Link to="/auth/sign-up" className="font-medium text-red-600 hover:underline">Sign up</Link>
					{/*<a href="/auth/sign-up" className="font-medium text-red-600 hover:underline">Sign up</a>*/}
				</p>
			)
		}

		return (
			<p className="text-sm font-light text-gray-500">
				Already have an account? <Link to="/auth/login" className="font-medium text-red-600 hover:underline">Log in</Link>
				{/*<a href="/auth/login" className="font-medium text-red-600 hover:underline">Log in</a>*/}
			</p>
		)
	}

	return (
		<div className="flex flex-col items-center justify-center py-6 md:h-screen lg:py-0">
			<div
				className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 className="text-xl font-bold text-gray-900 md:text-2xl">
						{isSignUp ? 'Create account' : 'Sign in to your account'}
					</h1>
					<DisplayError  errors={errors}/>
					<form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
						{Object.keys(formFields).map((item, index) => {
							const field = formFields[item];
							return (
							<div key={index}>
								<label htmlFor={item} className="block mb-2 text-sm font-medium text-gray-900">{field.label}</label>
								<input
									type={field.type}
									name={item}
									id={item}
									onChange={onChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
									placeholder={field.placeholder}
									required={field.required}
								/>
							</div>
							)
						})}
						<button type="submit" className="w-full text-white bg-red-900 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
							{isSignUp ? 'Create' : 'Login'}
						</button>
						<FormFooter />
					</form>
				</div>
			</div>
		</div>
	);
};

export default UserAuth;
