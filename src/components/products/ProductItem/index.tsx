import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { ProductItemI } from "../../../stores/redux/reducers/productsReducer";

import "./style.scss";

import Rating from "../../utils/Rating";

interface Props {
	productItem: ProductItemI;
}

const ProductItem = ({ productItem: { _id, image, name, rating, numReviews, price } }: Props): JSX.Element => {
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/product/${_id}`}>
				<Card.Img src={image} variant="top" />
			</Link>
			<Card.Body>
				<Link to={`/product/${_id}`}>
					<Card.Title as="div">
						<strong>{name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as="div">
					<Rating rating={rating} text={`${numReviews} reviews`} />
				</Card.Text>
				<Card.Text as="h3">${price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ProductItem;
