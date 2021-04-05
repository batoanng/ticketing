import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, error } = useRequest(
		'/api/users/signin',
		'post',
		{
			email: email,
			password: password,
		},
		() => Router.push('/'),
	);

	const onSubmit = async (event) => {
		event.preventDefault();
		await doRequest();
	};

	return (
		<form onSubmit={onSubmit}>
			<div id="signin">
				<h3 className="text-center text-white pt-5">Sign In</h3>
				<div className="container">
					<div
						id="login-row"
						className="row justify-content-center align-items-center"
					>
						<div id="login-column" className="col-md-6">
							<div id="login-box" className="col-md-12">
								<h3 className="text-center text-info">
									Sign In
								</h3>
								<div className="form-group">
									<label
										htmlFor="email"
										className="text-info"
									>
										Email:
									</label>
									<br />
									<input
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<label
										htmlFor="password"
										className="text-info"
									>
										Password:
									</label>
									<br />
									<input
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										type="password"
										className="form-control"
									/>
								</div>
								{error}
								<button
									className="btn btn-info btn-md"
									type="submit"
								>
									Sign In
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default SignIn;
