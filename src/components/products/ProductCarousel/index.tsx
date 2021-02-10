import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../../stores/rootReducer";
import productsAction from "../../../stores/redux/actions/productsAction";

import "./style.scss";

import Loading from "../../utils/Loading";
import Message from "../../utils/Message";
import utilsAction from "../../../stores/redux/actions/utilsAction";
import { ProductItemI } from "../../../stores/redux/reducers/productsReducer";

const ProductCarousel = (): JSX.Element => {
	const {
		productsReducer: { topProductList },
		utilsReducer: { loading, error },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { fetchTopProductListRequest } = productsAction;
	const { loadingUI } = utilsAction;

	useEffect(() => {
		dispatch(loadingUI());
		dispatch(fetchTopProductListRequest());
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Carousel pause="hover" className="bg-dark">
					{topProductList.map(
						(productItem: ProductItemI): JSX.Element => (
							<Carousel.Item key={productItem._id}>
								<Link to={`/product/${productItem._id}`}>
									<Image src={productItem.image} alt={productItem.name} fluid />
									<Carousel.Caption className="caurosel-caption">
										<h3>
											{productItem.name} (${productItem.price})
										</h3>
									</Carousel.Caption>
								</Link>
							</Carousel.Item>
						)
					)}
				</Carousel>
			)}
		</>
	);
};

export default ProductCarousel;
