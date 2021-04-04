import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, error } = useRequest(
        `/api/users/signup`,
        'post',
        {
            email: email,
            password: password
        },
         () => Router.push('/')
    );

    const onSubmit = async (event) => {
        event.preventDefault();

        const data = await doRequest();
        console.log(data);

    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                />
            </div>
            {error}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};

export default SignUp;