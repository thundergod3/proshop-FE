import React from "react";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import authsAction from "../../stores/redux/actions/authsAction";
import utilsAction from "../../stores/redux/actions/utilsAction";

import { Formik } from "formik";
import * as Yup from "yup";

import Message from "../../components/utils/Message";
import Loading from "../../components/utils/Loading";
import FormContainer from "../../components/layouts/FormContainer";

const YupSchema = Yup.object({});

const SignInPage = ({ location }: RouteComponentProps): JSX.Element => {
	const {
		authsReducer: { checkAuthentication, userData },
		utilsReducer: { loading, error },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { signInRequest } = authsAction;
	const { loadingUI } = utilsAction;

	const redirect: string = location.search ? location.search.split("=")[1] : "/";

	if (checkAuthentication === true) return <Redirect to={redirect} />;

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={YupSchema}
			onSubmit={(values, action) => {
				dispatch(loadingUI());
				dispatch(signInRequest(values.email, values.password));

				if (!error) {
					action.resetForm();
				}
			}}>
			{(props) => (
				<FormContainer>
					{checkAuthentication === undefined ? (
						<Loading />
					) : (
						<>
							{loading ? (
								<Loading />
							) : (
								<>
									<h1>Sign In</h1>
									{error && <Message variant="danger">{error}</Message>}
									<Form onSubmit={props.handleSubmit}>
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
										<Button type="submit" variant="primary">
											Sign In
										</Button>
									</Form>
									<Row className="py-3">
										<Col>
											New Customer?{" "}
											<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
												Register
											</Link>
										</Col>
									</Row>
								</>
							)}
						</>
					)}
				</FormContainer>
			)}
		</Formik>
	);
};

export default SignInPage;
