import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";

import { Formik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import { ReviewI } from "../../stores/redux/reducers/productsReducer";
import productsAction from "../../stores/redux/actions/productsAction";
import utilsAction from "../../stores/redux/actions/utilsAction";
import cartsAction from "../../stores/redux/actions/cartsAction";

import Rating from "../../components/utils/Rating";
import Message from "../../components/utils/Message";
import Loading from "../../components/utils/Loading";
import Meta from "../../components/layouts/Meta";

const ProductDetailPage = ({ match, history }: RouteComponentProps<any>): JSX.Element => {
	const productId: string = match.params.id;
	const [quantity, setQuantity] = useState<number | string | undefined>(1);
	const {
		productsReducer: {
			productDetail: { image, name, rating, numReviews, price, description, countInStock, reviews },
			createReviewError,
		},
		utilsReducer: { loading, error },
		authsReducer: { userData },
	} = useSelector((state: RootReducerI) => state);
	const { fetchProductDetailRequest, createReviewProduct } = productsAction;
	const { addCartItemRequest } = cartsAction;
	const { loadingUI } = utilsAction;
	const dispatch = useDispatch();

	const addToCardHandler = (): void => {
		history.push("/cart");
		dispatch(
			addCartItemRequest({ _id: productId, name, image, price, countInStock, quantity, user: userData._id })
		);
	};

	useEffect(() => {
		dispatch(loadingUI());
		dispatch(fetchProductDetailRequest(match.params.id));
	}, [match.params.id]);

	return (
		<Formik
			initialValues={{ rating: 0, comment: "" }}
			onSubmit={(values, action) => {
				dispatch(loadingUI());
				dispatch(
					createReviewProduct(productId, {
						user: userData.name,
						rating: Number(values.rating),
						comment: values.comment,
					})
				);
				action.resetForm();
			}}>
			{(props) => (
				<>
					<Link className="btn btn-light my-3" to="/">
						Go Back
					</Link>
					{loading ? (
						<Loading />
					) : error ? (
						<Message variant="danger" children={error} />
					) : (
						<>
							<Meta title={name} />
							<Row>
								<Col md={6}>
									<Image src={image} fluid />
								</Col>
								<Col md={3}>
									<ListGroup variant="flush">
										<ListGroup.Item>
											<h3>{name}</h3>
										</ListGroup.Item>
										<ListGroup.Item>
											<Rating rating={rating} text={`${numReviews} reviews`} />
										</ListGroup.Item>
										<ListGroup.Item>Price: ${price}</ListGroup.Item>
										<ListGroup.Item>Description: {description}</ListGroup.Item>
									</ListGroup>
								</Col>
								<Col md={3}>
									<Card>
										<ListGroup variant="flush">
											<ListGroup.Item>
												<Col>Price:</Col>
												<Col>
													<strong>${price}</strong>
												</Col>
											</ListGroup.Item>
											<ListGroup.Item>
												<Col>Status:</Col>
												<Col>
													<strong>{countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong>
												</Col>
											</ListGroup.Item>
											{countInStock > 0 && (
												<ListGroup.Item>
													<Row>
														<Col>Qty</Col>
														<Col>
															<Form.Control
																as="select"
																value={quantity}
																style={{ padding: "0.75rem 1.2rem" }}
																onChange={(e: ChangeEvent<HTMLSelectElement>): void =>
																	setQuantity(e.target.value)
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
													</Row>
												</ListGroup.Item>
											)}
											<ListGroup.Item>
												<Button
													className="btn-block"
													type="button"
													disabled={countInStock === 0}
													onClick={addToCardHandler}>
													Add To Cart
												</Button>
											</ListGroup.Item>
										</ListGroup>
									</Card>
								</Col>
							</Row>
							<Row>
								<Col md={6}>
									<h2>Review</h2>
									{reviews?.length === 0 && <Message>No reviews</Message>}
									<ListGroup variant="flush">
										{reviews?.map(
											(review: ReviewI): JSX.Element => (
												<ListGroup.Item key={review._id}>
													<strong>{review.name}</strong>
													<Rating rating={review.rating} />
													<p>{String(review.createdAt).substring(0, 10)}</p>
													<p>{review.comment}</p>
												</ListGroup.Item>
											)
										)}
										<ListGroup.Item>
											<h2>Write a Customer Review</h2>
											{createReviewError && (
												<Message variant="danger">{createReviewError}</Message>
											)}
											{userData ? (
												<Form onSubmit={props.handleSubmit}>
													<Form.Group controlId="rating">
														<Form.Label>Rating</Form.Label>
														<Form.Control
															as="select"
															value={props.values.rating}
															onChange={props.handleChange("rating")}>
															<option value="">Select...</option>
															<option value="1">1 - Poor</option>
															<option value="2">2 - Pair</option>
															<option value="3">3 - Good</option>
															<option value="4">4 - Very Good</option>
															<option value="5">5 - Excellent</option>
														</Form.Control>
													</Form.Group>
													<Form.Group controlId="comment">
														<Form.Label>Comment</Form.Label>
														<Form.Control
															as="textarea"
															rows={3}
															value={props.values.comment}
															onChange={props.handleChange("comment")}></Form.Control>
													</Form.Group>
													<Button type="submit" variant="primary">
														Submit
													</Button>
												</Form>
											) : (
												<Message>
													Please <Link to="/login">Sign In</Link> to write a review
												</Message>
											)}
										</ListGroup.Item>
									</ListGroup>
								</Col>
							</Row>
						</>
					)}
				</>
			)}
		</Formik>
	);
};

export default ProductDetailPage;
