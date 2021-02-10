import React from "react";
import { ListGroup } from "react-bootstrap";

import { useSelector } from "react-redux";
import { CartItemI } from "../../../stores/redux/reducers/cartsReducer";
import { RootReducerI } from "../../../stores/rootReducer";

import CartItem from "../CartItem";

const CartList = (): JSX.Element => {
	const {
		cartsReducer: { cartList },
	} = useSelector((state: RootReducerI) => state);

	return (
		<ListGroup variant="flush">
			{cartList.map(
				(cartItem: CartItemI): JSX.Element => (
					<CartItem cartItem={cartItem} key={cartItem._id} />
				)
			)}
		</ListGroup>
	);
};

export default CartList;
