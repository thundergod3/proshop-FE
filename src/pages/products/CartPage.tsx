import React, { useEffect } from "react";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import { CartItemI } from "../../stores/redux/reducers/cartsReducer";
import cartsAction from "../../stores/redux/actions/cartsAction";
import utilsAction from "../../stores/redux/actions/utilsAction";

import Message from "../../components/utils/Message";
import Loading from "../../components/utils/Loading";
import CartList from "../../components/carts/CartList";

const CartPage = ({ history }: RouteComponentProps): JSX.Element => {
	const {
		cartsReducer: { cartList },
		authsReducer: { checkAuthentication },
		utilsReducer: { loading },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { fetchCartListRequest } = cartsAction;
	const { loadingUI } = utilsAction;

	const checkoutHandler = (): void => history.push("/login?redirect=shipping");

	useEffect(() => {
		if (cartList.length === 0 && checkAuthentication) {
			dispatch(loadingUI());
			dispatch(fetchCartListRequest());
		}
	}, [checkAuthentication]);

	if (checkAuthentication === false) return <Redirect to="/login" />;

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					{checkAuthentication === undefined ? (
						<Loading />
					) : (
						<Row>
							<Col md={8}>
								<h1>Shopping Cart</h1>
								{cartList.length === 0 ? (
									<Message>
										Your cart is empty <Link to="/">Go Back</Link>
									</Message>
								) : (
									<CartList />
								)}
							</Col>
							<Col md={4}>
								<Card>
									<ListGroup variant="flush">
										<ListGroup.Item>
											<h2>
												SubTotal (
												{cartList.reduce(
													(acc: number, cartItem: CartItemI): number =>
														acc + Number(cartItem.quantity),
													0
												)}
												) items
											</h2>
											$
											{cartList
												.reduce(
													(acc: number, cartItem: CartItemI): number =>
														acc + Number(cartItem.quantity) * Number(cartItem.price),
													0
												)
												.toFixed(2)}
										</ListGroup.Item>
										<ListGroup.Item>
											<Button
												type="button"
												className="btn-block"
												disabled={cartList.length === 0}
												onClick={checkoutHandler}>
												Proceed To Checkout
											</Button>
										</ListGroup.Item>
									</ListGroup>
								</Card>
							</Col>
						</Row>
					)}
				</>
			)}
		</>
	);
};

export default CartPage;
