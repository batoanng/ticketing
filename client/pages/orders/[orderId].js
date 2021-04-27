import Router from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
	const [timeLeft, setTimeLeft] = useState(0);
	const { doRequest, error } = useRequest(
		'/api/payments',
		'post',
		{
			token: 'tok_visa',
			orderId: order.id,
		},
		() => {
			Router.push('/orders');
		},
	);

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
			<StripeCheckout
				token={({ token }) => doRequest(token)}
				// Stripe publishable key
				stripeKey="pk_test_51IkApBKPuAe3CMG58DmD76ODYTE6HWFyPAACfJbZfVz7O6TvuEyP0aEM1aH1f3hNtJZN8fDhcOewlz58LfQsdDCQ00MK0bGrnq"
				amount={order.ticket.price * 100}
				email={currentUser.email}
				description="4242424242424242-futureDate-3digits"
				name="Checkout"
			></StripeCheckout>
		</div>
	);
};

OrderShow.getInitialProps = async (context, client, currentUser) => {
	const { orderId } = context.query;
	if (!currentUser) Router.push('/');
	const { data } = await client.get(`/api/orders/${orderId}`);
	return { order: data, currentUser };
};

export default OrderShow;
