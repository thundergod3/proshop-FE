import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Image, Form, Button } from "react-bootstrap";

import { CartItemI } from "../../../stores/redux/reducers/cartsReducer";
import { useDispatch } from "react-redux";
import cartsAction from "../../../stores/redux/actions/cartsAction";

interface Props {
	cartItem: CartItemI;
}

const CartItem = ({ cartItem: { _id, image, name, price, quantity, countInStock } }: Props): JSX.Element => {
	const dispatch = useDispatch();
	const { addCartItemRequest, removeCartItemRequest } = cartsAction;

	return (
		<ListGroup.Item key={_id}>
			<Row>
				<Col md={2}>
					<Image src={image} alt={name} fluid rounded />
				</Col>
				<Col md={3}>
					<Link to={`/product/${_id}`}>{name}</Link>
				</Col>
				<Col md={2}>{price}</Col>
				<Col md={2}>
					<Form.Control
						as="select"
						value={quantity}
						style={{ padding: "0.75rem 1.2rem" }}
						onChange={(e: ChangeEvent<HTMLSelectElement>): any =>
							dispatch(
								addCartItemRequest({ _id, countInStock, name, image, price, quantity: e.target.value })
							)
						}>
						{[...Array(countInStock).keys()].map(
							(item: number): JSX.Element => (
								<option key={item + 1} value={item + 1}>
									{item + 1}
								</option>
							)
						)}
					</Form.Control>
				</Col>
				<Col md={2}>
					<Button type="button" variant="light" onClick={(): any => dispatch(removeCartItemRequest(_id))}>
						<i className="fas fa-trash"></i>
					</Button>
				</Col>
			</Row>
		</ListGroup.Item>
	);
};

export default CartItem;
