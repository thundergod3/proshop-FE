import React, { ChangeEvent, useEffect } from "react";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import adminAction from "../../stores/redux/actions/adminAction";
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

const EditUserDetailPage = ({ history, match }: RouteComponentProps | any): JSX.Element => {
	const userId: string = match.params.id;
	const {
		authsReducer: { checkAuthentication, userData },
		adminReducer: { userDetail },
		utilsReducer: { loading, error },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { getUserDetailRequest, updateUserRequest } = adminAction;
	const { loadingUI } = utilsAction;

	useEffect(() => {
		if (checkAuthentication && (!userDetail.name || userDetail._id !== userId)) {
			dispatch(loadingUI());
			dispatch(getUserDetailRequest(userId));
		}
	}, [checkAuthentication, userDetail, userId]);

	if (checkAuthentication === false) return <Redirect to="/login" />;

	if (!userData.isAdmin) return <Redirect to="/" />;

	return (
		<Formik
			enableReinitialize
			initialValues={{
				name: userDetail.name || "",
				email: userDetail.email || "",
				isAdmin: userDetail.isAdmin,
			}}
			validationSchema={YupSchema}
			onSubmit={(values, action) => {
				dispatch(loadingUI());
				dispatch(
					updateUserRequest(
						userId,
						{ name: values.name, email: values.email, isAdmin: values.isAdmin },
						history
					)
				);
				action.resetForm();
			}}>
			{(props) => (
				<>
					<Link to="/admin/users" className="btn btn-light my-3">
						Go Back
					</Link>
					<FormContainer>
						{checkAuthentication === undefined ? (
							<Loading />
						) : (
							<>
								{loading ? (
									<Loading />
								) : error ? (
									<Message variant="danger">{error}</Message>
								) : (
									<>
										<h1>Edit User</h1>
										<Form
											onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
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
											<Form.Group controlId="isAdmin">
												<Form.Check
													type="checkbox"
													label="Is Admin"
													checked={props.values.isAdmin}
													onChange={props.handleChange("isAdmin")}></Form.Check>
											</Form.Group>
											<Button type="submit" variant="primary">
												Update
											</Button>
										</Form>
									</>
								)}
							</>
						)}
					</FormContainer>
				</>
			)}
		</Formik>
	);
};

export default EditUserDetailPage;
