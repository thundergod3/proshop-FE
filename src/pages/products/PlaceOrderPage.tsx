import React, { useEffect } from "react";
import { RouteComponentProps, Redirect, Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import { CartItemI } from "../../stores/redux/reducers/cartsReducer";
import cartsAction from "../../stores/redux/actions/cartsAction";
import ordersAction from "../../stores/redux/actions/ordersAction";
import utilsAction from "../../stores/redux/actions/utilsAction";

import Message from "../../components/utils/Message";
import CheckOutSteps from "../../components/products/CheckOutSteps";

const PlaceOrderPage = ({ history }: RouteComponentProps): JSX.Element => {
	const {
		cartsReducer: { shippingAddress, paymentMethod, cartList, itemsPrice, shippingPrice, taxPrice, totalPrice },
		authsReducer: { checkAuthentication },
		ordersReducer: { orderInfo, orderCreatedSuccess },
		utilsReducer: { error, loading },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { savingPaymentMethod, setPaymentPrice, fetchCartListRequest } = cartsAction;
	const { addOrderItemRequest } = ordersAction;
	const { loadingUI } = utilsAction;

	const placeOrderHandler = (): void => {
		dispatch(
			addOrderItemRequest({
				orderList: cartList,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			})
		);
	};

	useEffect(() => {
		if (orderCreatedSuccess) {
			history.push(`/order/${orderInfo?._id}`);
		}
	}, [orderCreatedSuccess, history]);

	useEffect(() => {
		dispatch(loadingUI());
		dispatch(fetchCartListRequest());
	}, []);

	useEffect(() => {
		// Calculate prices
		const tempCartItemsPrice: number = cartList.reduce(
			(acc: number, item: CartItemI): number => acc + (item.price as number) * (item.quantity as number),
			0
		);
		const tempShippingPrice: number = tempCartItemsPrice > 100 ? 0 : 100;
		const tempTaxPrice: number = 0.15 * tempCartItemsPrice;
		const tempTotalPrice: number = tempCartItemsPrice + tempShippingPrice + tempTaxPrice;

		dispatch(setPaymentPrice(tempCartItemsPrice, tempShippingPrice, tempTaxPrice, tempTotalPrice));
	}, [cartList]);

	if (checkAuthentication === false) return <Redirect to="/login" />;

	if (!shippingAddress) {
		history.push("/shipping");
	}

	return (
		<>
			<CheckOutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{" "}
								{shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong> {paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartList.length === 0 ? (
								<Message>Card is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cartList.map(
										(cartItem: CartItemI): JSX.Element => (
											<ListGroup.Item key={cartItem._id}>
												<Row>
													<Col md={1}>
														<Image src={cartItem.image} alt={cartItem.name} fluid rounded />
													</Col>
													<Col>
														<Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link>
													</Col>
													<Col md={4}>
														{cartItem.quantity} x {cartItem.price} = $
														{(cartItem.quantity as number) * (cartItem.price as number)}
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
									<Col>${itemsPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartList.length === 0}
									onClick={placeOrderHandler}>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderPage;
