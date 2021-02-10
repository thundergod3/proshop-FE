import React, { ChangeEvent, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import authsAction from "../../stores/redux/actions/authsAction";
import utilsAction from "../../stores/redux/actions/utilsAction";
import ordersAction from "../../stores/redux/actions/ordersAction";

import { Formik } from "formik";
import * as Yup from "yup";

import Message from "../../components/utils/Message";
import Loading from "../../components/utils/Loading";
import { OrderInfoI } from "../../stores/redux/reducers/ordersReducer";
import { LinkContainer } from "react-router-bootstrap";

const YupSchema = Yup.object({
	password: Yup.string(),
	confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ProfilePage = ({ history }: RouteComponentProps): JSX.Element => {
	const {
		authsReducer: { checkAuthentication, userData },
		utilsReducer: { loading, error, updateStatus },
		ordersReducer: { orderUser },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { getUserDataRequest, updateUserDataRequest } = authsAction;
	const { getOrderUserRequest } = ordersAction;
	const { loadingUI } = utilsAction;

	useEffect(() => {
		if (checkAuthentication === false) {
			history.push("/login");
		} else {
			if (!userData.name) {
				dispatch(getUserDataRequest());
			}
		}
	}, [userData]);

	useEffect(() => {
		if (checkAuthentication === true) {
			dispatch(loadingUI());
			dispatch(getOrderUserRequest());
		}
	}, [checkAuthentication]);

	return (
		<Formik
			enableReinitialize
			initialValues={{
				name: userData.name || "",
				email: userData.email || "",
				password: "",
				confirmPassword: "",
				message: "",
			}}
			validationSchema={YupSchema}
			onSubmit={(values, action) => {
				if (values.password === values.confirmPassword) {
					dispatch(loadingUI());
					dispatch(
						updateUserDataRequest({
							name: values.name,
							email: values.email,
							password: values.password,
						})
					);
				}
			}}>
			{(props) => (
				<>
					{checkAuthentication === undefined ? (
						<Loading />
					) : (
						<>
							{loading ? (
								<Loading />
							) : (
								<Row>
									<Col md={3}>
										<h2>User Profile</h2>
										{props.values.message && (
											<Message variant="danger">{props.values.message}</Message>
										)}
										{error && <Message variant="danger">{error}</Message>}
										{updateStatus && <Message variant="success">Profile Updated</Message>}
										<Form
											onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
												if (props.values.password !== props.values.confirmPassword) {
													props.setFieldValue("message", "Password do not match");
												} else {
													props.setFieldValue("message", "");
												}
												props.handleSubmit(e);
											}}>
											<Form.Group controlId="name">
												<Form.Label>Name</Form.Label>
												<Form.Control
													type="name"
													placeholder="Enter name"
													value={props.values.name}
													onChange={props.handleChange("name")}></Form.Control>
											</Form.Group>
											<Form.Group controlId="email">
												<Form.Label>Email Address</Form.Label>
												<Form.Control
													type="email"
													placeholder="Enter email"
													value={props.values.email}
													onChange={props.handleChange("email")}></Form.Control>
											</Form.Group>
											<Form.Group controlId="password">
												<Form.Label>Password</Form.Label>
												<Form.Control
													type="password"
													placeholder="Enter password"
													value={props.values.password}
													onChange={props.handleChange("password")}></Form.Control>
											</Form.Group>
											<Form.Group controlId="confirmPassword">
												<Form.Label>Password</Form.Label>
												<Form.Control
													type="password"
													placeholder="Confirm password"
													value={props.values.confirmPassword}
													onChange={props.handleChange("confirmPassword")}></Form.Control>
											</Form.Group>
											<Button type="submit" variant="primary">
												Update
											</Button>
										</Form>
									</Col>
									<Col md={9}>
										<h2>My Order</h2>
										{loading ? (
											<Loading />
										) : error ? (
											<Message variant="danger">{error}</Message>
										) : (
											<Table striped bordered hover responsive className="table-sm">
												<thead>
													<tr>
														<th>ID</th>
														<th>DATE</th>
														<th>TOTAL</th>
														<th>PAID</th>
														<th>DELIVERED</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{orderUser.map((order: OrderInfoI) => (
														<tr key={order._id}>
															<td>{order._id}</td>
															<td>{String(order.createdAt).substring(0, 10)}</td>
															<td>{order.totalPrice}</td>
															<td>
																{order.isPaid ? (
																	String(order.paidAt).substring(0, 10)
																) : (
																	<i
																		className="fas fa-times"
																		style={{ color: "red" }}></i>
																)}
															</td>
															<td>
																{order.isDelivered ? (
																	String(order.deliveredAt).substring(0, 10)
																) : (
																	<i
																		className="fas fa-times"
																		style={{ color: "red" }}></i>
																)}
															</td>
															<td>
																<LinkContainer to={`/order/${order._id}`}>
																	<Button variant="light">Details</Button>
																</LinkContainer>
															</td>
														</tr>
													))}
												</tbody>
											</Table>
										)}
									</Col>
								</Row>
							)}
						</>
					)}
				</>
			)}
		</Formik>
	);
};

export default ProfilePage;
