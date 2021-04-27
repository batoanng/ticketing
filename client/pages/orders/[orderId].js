import Router from 'next/router';
import { useEffect, useState } from 'react';

const OrderShow = ({ order }) => {
	const [timeLeft, setTimeLeft] = useState(0);

	useEffect(() => {
		const findTimeLeft = () => {
			const msLeft = new Date(order.expireAt) - new Date();
			setTimeLeft(Math.round(msLeft / 1000));
		};
		findTimeLeft();
		const timerId = setInterval(findTimeLeft, 1000);
		if (timeLeft < 0) {
			clearInterval(timerId);
		}
		return () => {
			clearInterval(timerId);
		};
	}, []);

	if (timeLeft < 0) {
		return <div>Order expired.</div>;
	}
	return (
		<div>
			<h1>Purchasing Form</h1>
			Time left to pay: {timeLeft} seconds.
		</div>
	);
};

OrderShow.getInitialProps = async (context, client, currentUser) => {
	const { orderId } = context.query;
	if (!currentUser) Router.push('/');
	const { data } = await client.get(`/api/orders/${orderId}`);
	return { order: data };
};

export default OrderShow;
