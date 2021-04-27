import axios from 'axios';
import { useState } from 'react';

const useRequest = (url, method, body, onSuccess) => {
	const [error, setError] = useState(null);

	const doRequest = async () => {
		try {
			const res = await axios[method](url, body);
			setError(null);
			onSuccess && onSuccess(res.data);
			return res.data;
		} catch (e) {
			const errors =
				e.response && e.response.data && e.response.data.errors;
			errors &&
				errors.length > 0 &&
				setError(
					<div className="alert alert-danger">
						<h4>Oops...</h4>
						<ul className="my-0">
							{errors.map((error) => (
								<li key={error.message}>{error.message}</li>
							))}
						</ul>
					</div>,
				);
		}
	};

	return { doRequest, error };
};

export default useRequest;
