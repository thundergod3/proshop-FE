import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import adminAction from "../../stores/redux/actions/adminAction";
import utilsAction from "../../stores/redux/actions/utilsAction";

import Message from "../../components/utils/Message";
import Loading from "../../components/utils/Loading";
import { UserDataI } from "../../stores/redux/reducers/authsReducer";
import { OrderItemI } from "../../stores/redux/reducers/ordersReducer";

const OrderListPage = (): JSX.Element => {
	const {
		authsReducer: { checkAuthentication, userData },
		adminReducer: { orderList },
		utilsReducer: { loading, error },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { fetchOrderListRequest } = adminAction;
	const { loadingUI } = utilsAction;

	useEffect(() => {
		if (checkAuthentication && userData && userData.isAdmin) {
			dispatch(loadingUI());
			dispatch(fetchOrderListRequest());
		}
	}, [checkAuthentication]);

	if (checkAuthentication === false) return <Redirect to="/login" />;

	if (checkAuthentication && !userData.isAdmin) return <Redirect to="/" />;

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loading />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					{checkAuthentication === undefined ? (
						<Loading />
					) : (
						<Table striped bordered hover responsive className="table-sm">
							<thead>
								<tr>
									<td>ID</td>
									<td>USER</td>
									<td>DATE</td>
									<td>TOTAL</td>
									<td>PAID</td>
									<td>DELIVERED</td>
									<td></td>
								</tr>
							</thead>
							<tbody>
								{orderList.map(
									(orderItem: OrderItemI): JSX.Element => (
										<tr key={orderItem._id}>
											<td>{orderItem._id}</td>
											<td>{orderItem.user && orderItem.user.name}</td>
											<td>{orderItem.createdAt.substring(0, 10)}</td>
											<td>${orderItem.totalPrice.toFixed(2)}</td>
											<td>
												{orderItem.isPaid ? (
													String(orderItem.paidAt).substring(0, 10)
												) : (
													<i className="fas fa-times" style={{ color: "red" }}></i>
												)}
											</td>
											<td>
												{orderItem.isDelivered ? (
													String(orderItem.deliveredAt).substring(0, 10)
												) : (
													<i className="fas fa-times" style={{ color: "red" }}></i>
												)}
											</td>
											<td>
												<LinkContainer to={`/order/${orderItem._id}`}>
													<Button variant="light" className="btn-sm">
														Details
													</Button>
												</LinkContainer>
											</td>
										</tr>
									)
								)}
							</tbody>
						</Table>
					)}
				</>
			)}
		</>
	);
};

export default OrderListPage;
