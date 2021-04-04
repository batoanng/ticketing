import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const SignOut = () => {

	const { doRequest } = useRequest(
		`/api/users/signout`,
		'post',
		{},
		() => Router.push('/')
	);

	useEffect(() => {
		doRequest();
	}, []);

	return (
		<div>Signing out...</div>
	);
};

export default SignOut;