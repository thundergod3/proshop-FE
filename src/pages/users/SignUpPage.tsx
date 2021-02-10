import React, { ChangeEvent } from "react";
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

const YupSchema = Yup.object({
	password: Yup.string(),
	confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUpPage = ({ location }: RouteComponentProps): JSX.Element => {
	const {
		authsReducer: { checkAuthentication, userData },
		utilsReducer: { loading, error },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { signUpRequest } = authsAction;
	const { loadingUI } = utilsAction;

	const redirect: string = location.search ? location.search.split("=")[1] : "/";

	if (checkAuthentication === true) return <Redirect to={redirect} />;

	return (
		<Formik
			initialValues={{ name: "", email: "", password: "", confirmPassword: "", message: "" }}
			validationSchema={YupSchema}
			onSubmit={(values, action) => {
				if (values.password === values.confirmPassword) {
					dispatch(loadingUI());
					dispatch(signUpRequest(values.name, values.email, values.password));
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
									<h1>Sign Up</h1>
									{props.values.message && <Message variant="danger">{props.values.message}</Message>}
									{error && <Message variant="danger">{error}</Message>}
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
											Register
										</Button>
									</Form>
									<Row className="py-3">
										<Col>
											Have an Account?{" "}
											<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
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

export default SignUpPage;
