import React, { useState, useEffect } from "react";
import { RouteComponentProps, Redirect, Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";

import axios, { AxiosResponse } from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import { CartItemI } from "../../stores/redux/reducers/cartsReducer";
import ordersAction from "../../stores/redux/actions/ordersAction";
import utilsAction from "../../stores/redux/actions/utilsAction";
import adminAction from "../../stores/redux/actions/adminAction";

import Loading from "../../components/utils/Loading";
import Message from "../../components/utils/Message";

const OrderPage = ({ match }: RouteComponentProps | any): JSX.Element => {
	const orderId: string = match.params.id;
	const {
		authsReducer: { checkAuthentication, userData },
		ordersReducer: { orderInfo, orderPaySuccess },
		utilsReducer: { error, loading },
		adminReducer: { orderDeliverSuccess },
	} = useSelector((state: RootReducerI) => state);
	const [sdkReady, setSdkReady] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { getOrderDetailRequest, orderPayRequest, orderPayRest } = ordersAction;
	const { orderDeliverRequest, orderDeliverRest } = adminAction;
	const { loadingUI } = utilsAction;

	const addPayPalScript = async () => {
		const { data: clientId }: AxiosResponse = await axios.get("/api/config/paypal");
		const script: HTMLScriptElement = document.createElement("script");
		script.type = "text/javascript";
		script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
		script.async = true;
		script.onload = (): void => setSdkReady(true);
		document.body.appendChild(script);
	};

	const successOrderPayHandler = (paymentResult: any): void => {
		dispatch(loadingUI());
		dispatch(orderPayRequest(orderId, paymentResult));
	};

	const successOrderDeliverHandler = (): void => {
		dispatch(loadingUI());
		dispatch(orderDeliverRequest(orderId));
	};

	useEffect(() => {
		if (
			checkAuthentication &&
			(!orderInfo || orderInfo._id !== orderId || orderPaySuccess || orderDeliverSuccess)
		) {
			dispatch(loadingUI());
			dispatch(getOrderDetailRequest(orderId));
			dispatch(orderPayRest());
			dispatch(orderDeliverRest());
		} else if (!orderInfo?.isPaid) {
			if (!(window as any).paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [checkAuthentication, orderInfo, orderId, orderPaySuccess, orderDeliverSuccess]);

	if (checkAuthentication === false) return <Redirect to="/login" />;

	return (
		<>
			{loading || checkAuthentication === undefined ? (
				<Loading />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<h1>Order {orderInfo?._id}</h1>
					<Row>
						<Col md={8}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<strong>Name: </strong> {orderInfo?.user?.name}
									</p>
									<p>
										<strong>Email: </strong>{" "}
										<a href={`mailto:${orderInfo?.user?.email}`}>{orderInfo?.user?.email}</a>
									</p>
									<p>
										<strong>Address:</strong>
										{orderInfo?.shippingAddress?.address}, {orderInfo?.shippingAddress?.city},{" "}
										{orderInfo?.shippingAddress?.postalCode}, {orderInfo?.shippingAddress?.country}
									</p>
									{orderInfo?.isDelivered ? (
										<Message variant="success">Delivered on {orderInfo?.deliveredAt}</Message>
									) : (
										<Message variant="danger">Not Delivered</Message>
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									{orderInfo?.totalPrice?.toFixed(2)}

									<h2>Payment Method</h2>
									<p>
										<strong>Method: </strong> {orderInfo?.paymentMethod}
									</p>
									{orderInfo?.isPaid ? (
										<Message variant="success">Paid on {orderInfo?.paidAt}</Message>
									) : (
										<Message variant="danger">Not Paid</Message>
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									<h2>Order Items</h2>
									{orderInfo?.orderList?.length === 0 ? (
										<Message>Card is empty</Message>
									) : (
										<ListGroup variant="flush">
											{orderInfo?.orderList?.map(
												(cartItem: CartItemI): JSX.Element => (
													<ListGroup.Item key={cartItem._id}>
														<Row>
															<Col md={1}>
																<Image
																	src={cartItem.image}
																	alt={cartItem.name}
																	fluid
																	rounded
																/>
															</Col>
															<Col>
																<Link to={`/product/${cartItem._id}`}>
																	{cartItem.name}
																</Link>
															</Col>
															<Col md={4}>
																{cartItem.quantity} x {cartItem.price} = $
																{(cartItem.quantity as number) *
																	(cartItem.price as number)}
															</Col>
														</Row>
													</ListGroup.Item>
												)
											)}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<h2>Order Summary</h2>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Items</Col>
											<Col>${orderInfo?.itemsPrice?.toFixed(2)}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Shipping</Col>
											<Col>${orderInfo?.shippingPrice?.toFixed(2)}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>${orderInfo?.taxPrice?.toFixed(2)}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>${orderInfo?.totalPrice?.toFixed(2)}</Col>
										</Row>
									</ListGroup.Item>
									{!orderInfo?.isPaid && (
										<ListGroup.Item>
											{loading && <Loading />}
											{!sdkReady ? (
												<Loading />
											) : (
												<PayPalButton
													amount={orderInfo?.totalPrice?.toFixed(2)}
													onSuccess={successOrderPayHandler}
												/>
											)}
										</ListGroup.Item>
									)}
									{userData.isAdmin && orderInfo?.isPaid && !orderInfo?.isDelivered && (
										<ListGroup.Item>
											<Button
												type="button"
												className="btn btn-block"
												onClick={successOrderDeliverHandler}>
												Mark As Delivered
											</Button>
										</ListGroup.Item>
									)}
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default OrderPage;
