import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const NewTicket = () => {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const { doRequest, error } = useRequest(
		'/api/tickets',
		'post',
		{
			title,
			price,
		},
		() => Router.push('/'),
	);

	const handleBlurPrice = () => {
		const value = parseFloat(price);
		if (isNaN(value)) {
			return;
		}
		setPrice(value.toFixed(2));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		doRequest();
	};

	return (
		<div>
			<h1>Create a ticket</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Title</label>
					<input
						className="form-control"
						name="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Price</label>
					<input
						className="form-control"
						name="price"
						value={price}
						onBlur={handleBlurPrice}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
				{error}
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};

export default NewTicket;
