import React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import cartsAction from "../../stores/redux/actions/cartsAction";

import FormContainer from "../../components/layouts/FormContainer";
import CheckOutSteps from "../../components/products/CheckOutSteps";

import { Formik } from "formik";

const ShippingPage = ({ history }: RouteComponentProps): JSX.Element => {
	const {
		cartsReducer: { shippingAddress },
		authsReducer: { checkAuthentication },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { savingShippingAddress } = cartsAction;

	if (checkAuthentication === false) return <Redirect to="/login" />;

	return (
		<Formik
			initialValues={{
				address: shippingAddress?.address || "",
				city: shippingAddress?.city || "",
				postalCode: shippingAddress?.postalCode || "",
				country: shippingAddress?.country || "",
			}}
			onSubmit={(values, action) => {
				dispatch(
					savingShippingAddress({
						address: values.address,
						city: values.city,
						country: values.country,
						postalCode: values.postalCode,
					})
				);
				history.push("/payment");
			}}>
			{(props): JSX.Element => (
				<FormContainer>
					<CheckOutSteps step1 step2 />
					<h1>Shipping</h1>
					<Form onSubmit={props.handleSubmit}>
						<Form.Group controlId="address">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter address"
								value={props.values.address}
								required
								onChange={props.handleChange("address")}></Form.Control>
						</Form.Group>
						<Form.Group controlId="city">
							<Form.Label>City</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter city"
								value={props.values.city}
								required
								onChange={props.handleChange("city")}></Form.Control>
						</Form.Group>
						<Form.Group controlId="postalCode">
							<Form.Label>Postal Code</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Postal Code"
								value={props.values.postalCode}
								required
								onChange={props.handleChange("postalCode")}></Form.Control>
						</Form.Group>
						<Form.Group controlId="country">
							<Form.Label>Country</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Country"
								value={props.values.country}
								required
								onChange={props.handleChange("country")}></Form.Control>
						</Form.Group>
						<Button type="submit" variant="primary">
							Continue
						</Button>
					</Form>
				</FormContainer>
			)}
		</Formik>
	);
};

export default ShippingPage;
