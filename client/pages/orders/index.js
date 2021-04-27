import Link from 'next/link';
import Router from 'next/router';

const OrderPage = ({ orders }) => {
	return (
		<div>
			<h1>Orders</h1>
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{orders &&
						orders.map((order) => (
							<tr key={order.id}>
								<td>{order.ticket.title}</td>
								<td>{order.ticket.price}</td>
								<td>{order.status}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

OrderPage.getInitialProps = async (context, client, currentUser) => {
	if (!currentUser) Router.push('/');
	const { data } = await client.get('/api/orders');
	return { orders: data };
};

export default OrderPage;
