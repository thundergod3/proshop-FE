import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import adminAction from "../../stores/redux/actions/adminAction";
import productsAction from "../../stores/redux/actions/productsAction";
import utilsAction from "../../stores/redux/actions/utilsAction";

import { Formik } from "formik";
import * as Yup from "yup";
import HTTPMethod from "../../services";
import { AxiosResponse } from "axios";

import Message from "../../components/utils/Message";
import Loading from "../../components/utils/Loading";
import FormContainer from "../../components/layouts/FormContainer";

const YupSchema = Yup.object({
	password: Yup.string(),
	confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const EditProductPage = ({ history, match }: RouteComponentProps | any): JSX.Element => {
	const productId: string = match.params.id;
	const {
		authsReducer: { checkAuthentication, userData },
		utilsReducer: { loading, error },
		productsReducer: { productDetail, page },
	} = useSelector((state: RootReducerI) => state);
	const [uploading, setUploading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { fetchProductDetailRequest } = productsAction;
	const { updateProductItemRequest } = adminAction;
	const { loadingUI } = utilsAction;

	const uploadFileHanlder = async (e: any, props: any) => {
		const file = e.target.files[0];
		const formData = new FormData();

		formData.append("image", file);
		setUploading(true);

		try {
			const { data }: AxiosResponse = await HTTPMethod.uploadImage(formData);
			props.setFieldValue("image", data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};

	useEffect(() => {
		if (checkAuthentication && (!productDetail || productDetail._id !== productId)) {
			dispatch(loadingUI());
			dispatch(fetchProductDetailRequest(productId));
		}
	}, [checkAuthentication, productDetail, productId]);

	if (checkAuthentication === false) return <Redirect to="/login" />;

	if (checkAuthentication && !userData.isAdmin) return <Redirect to="/" />;

	return (
		<Formik
			enableReinitialize
			initialValues={{
				name: productDetail.name || "",
				price: productDetail.price || 0,
				image: productDetail.image || "",
				brand: productDetail.brand || "",
				category: productDetail.category || "",
				countInStock: productDetail.countInStock || 0,
				description: productDetail.description || "",
			}}
			validationSchema={YupSchema}
			onSubmit={(values, action) => {
				dispatch(loadingUI());
				dispatch(
					updateProductItemRequest(
						productId,
						{
							_id: productId,
							name: values.name,
							price: values.price,
							image: values.image,
							brand: values.brand,
							category: values.category,
							countInStock: values.countInStock,
							description: values.description,
						},
						history
					)
				);
				action.resetForm();
			}}>
			{(props) => (
				<>
					<Link to={page ? `/admin/products/${page}` : "/admin/products"} className="btn btn-light my-3">
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
										<h1>Update Product</h1>
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
											<Form.Group controlId="price">
												<Form.Label>Price</Form.Label>
												<Form.Control
													type="number"
													placeholder="Enter price"
													value={props.values.price}
													onChange={props.handleChange("price")}></Form.Control>
											</Form.Group>
											<Form.Group controlId="image">
												<Form.Label>Image</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter image url"
													value={props.values.image}
													onChange={props.handleChange("image")}></Form.Control>
												<Form.File
													id="image-file"
													label="Choose File"
													custom
													onChange={(e: any) => uploadFileHanlder(e, props)}></Form.File>
												{uploading && <Loading />}
											</Form.Group>
											<Form.Group controlId="brand">
												<Form.Label>Brand</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter brand"
													value={props.values.brand}
													onChange={props.handleChange("brand")}></Form.Control>
											</Form.Group>
											<Form.Group controlId="countInStock">
												<Form.Label>countInStock</Form.Label>
												<Form.Control
													type="number"
													placeholder="Enter countInStock"
													value={props.values.countInStock}
													onChange={props.handleChange("countInStock")}></Form.Control>
											</Form.Group>
											<Form.Group controlId="category">
												<Form.Label>Category</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter category"
													value={props.values.category}
													onChange={props.handleChange("category")}></Form.Control>
											</Form.Group>
											<Form.Group controlId="description">
												<Form.Label>Description</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter description"
													value={props.values.description}
													onChange={props.handleChange("description")}></Form.Control>
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

export default EditProductPage;
