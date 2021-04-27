import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
	const { doRequest, error } = useRequest(
		'/api/orders',
		'post',
		{
			ticketId: ticket.id,
		},
		(order) => {
			Router.push(`/orders/${order.id}`);
		},
	);

	return (
		<div>
			<h1>{ticket.title}</h1>
			<h4>Price: {ticket.price}</h4>
			{error}
			<button onClick={() => doRequest()} className="btn btn-primary">
				Purchase
			</button>
		</div>
	);
};

TicketShow.getInitialProps = async (context, client, currentUser) => {
	const { ticketId } = context.query;
	if (!currentUser) Router.push('/');
	const { data } = await client.get(`/api/tickets/${ticketId}`);
	return { ticket: data };
};

export default TicketShow;
