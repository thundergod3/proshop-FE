import React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import cartsAction from "../../stores/redux/actions/cartsAction";

import FormContainer from "../../components/layouts/FormContainer";
import CheckOutSteps from "../../components/products/CheckOutSteps";

import { Formik } from "formik";

const PaymentPage = ({ history }: RouteComponentProps): JSX.Element => {
	const {
		cartsReducer: { shippingAddress },
		authsReducer: { checkAuthentication },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { savingPaymentMethod } = cartsAction;

	if (checkAuthentication === false) return <Redirect to="/login" />;

	if (!shippingAddress) {
		history.push("/shipping");
	}

	return (
		<Formik
			initialValues={{
				paymentMethod: "Paypal",
			}}
			onSubmit={(values, action) => {
				dispatch(savingPaymentMethod(values.paymentMethod));
				history.push("/placeorder");
			}}>
			{(props): JSX.Element => (
				<FormContainer>
					<CheckOutSteps step1 step2 step3 />
					<h1>Payment Method</h1>
					<Form onSubmit={props.handleSubmit}>
						<Form.Group>
							<Form.Label as="legend">Select Method</Form.Label>
							<Col>
								<Form.Check
									type="radio"
									label="Paypal or Credit Card"
									id="PayPal"
									name="paymentMethod"
									value="PayPal"
									checked
									onChange={props.handleChange("paymentMethod")}></Form.Check>
								<Form.Check
									type="radio"
									label="Stripe"
									id="Stripe"
									name="paymentMethod"
									value="Stripe"
									onChange={props.handleChange("paymentMethod")}></Form.Check>
							</Col>
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

export default PaymentPage;
