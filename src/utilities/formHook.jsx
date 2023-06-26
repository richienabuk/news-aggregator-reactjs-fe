import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useForm = (callback, initialState = {}) => {
	const location = useLocation();
	const [values, setValues] = useState(initialState);

	useEffect(() => {
		// execute on location change
		setValues(initialState);
	}, [initialState, location]);

	const onChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value })
	}

	const onSubmit = (event) => {
		event.preventDefault()
		callback()
	}

	return {
		onChange,
		onSubmit,
		values
	}
}
