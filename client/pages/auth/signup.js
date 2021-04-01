import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(`${process.env.AUTH_SERIVCE}/api/users/signup`, {
                email: email,
                password: password
            });
            console.log(res.data);
        } catch (e) {
            console.log(e.response.data.errors)
            setErrors(e.response.data);
        }
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
            {errors.length > 0 && <div className="alert alert-danger">
                <h4>Oops...</h4>
                <ul className="my-0">
                    {errors.map(error => <li key={error.message}>{error.message}</li>)}
                </ul>
            </div>}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};

export default SignUp;