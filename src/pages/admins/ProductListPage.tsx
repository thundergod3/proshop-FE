import React, { useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import { ProductItemI } from "../../stores/redux/reducers/productsReducer";
import productsAction from "../../stores/redux/actions/productsAction";
import adminAction from "../../stores/redux/actions/adminAction";
import utilsAction from "../../stores/redux/actions/utilsAction";

import Message from "../../components/utils/Message";
import Loading from "../../components/utils/Loading";
import Paginate from "../../components/utils/Paginate";

const ProductListPage = ({ match }: RouteComponentProps<any>): JSX.Element => {
	const pageNumber: number = Number(match.params.pageNumber) || 1;
	const {
		authsReducer: { checkAuthentication, userData },
		productsReducer: { productList, page, pages },
		utilsReducer: { loading, error },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { fetchProductListRequest } = productsAction;
	const { deleteProductRequest } = adminAction;
	const { loadingUI } = utilsAction;

	const deleteProductHandler = (productId: string | any): void => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteProductRequest(productId));
		}
	};

	const createdProductHandler = (): void => {};

	useEffect(() => {
		if (checkAuthentication && (productList.length === 0 || pageNumber !== page)) {
			dispatch(loadingUI());
			dispatch(fetchProductListRequest("", pageNumber));
		}
	}, [checkAuthentication, productList, pageNumber, page]);

	if (checkAuthentication === false) return <Redirect to="/login" />;

	if (checkAuthentication && !userData.isAdmin) return <Redirect to="/" />;

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-right">
					<LinkContainer to="/admin/create-product">
						<Button className="my-3" onClick={createdProductHandler}>
							<i className="fas fa-plus"></i>
							Create Product
						</Button>
					</LinkContainer>
				</Col>
			</Row>
			{loading ? (
				<Loading />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					{checkAuthentication === undefined ? (
						<Loading />
					) : (
						<>
							<Table striped bordered hover responsive className="table-sm">
								<thead>
									<tr>
										<td>ID</td>
										<td>NAME</td>
										<td>PRICE</td>
										<td>CATEGORY</td>
										<td>BRAND</td>
										<td></td>
									</tr>
								</thead>
								<tbody>
									{productList.map(
										(productItem: ProductItemI): JSX.Element => (
											<tr key={productItem._id}>
												<td>{productItem._id}</td>
												<td>{productItem.name}</td>
												<td>${productItem.price}</td>
												<td>{productItem.category}</td>
												<td>{productItem.brand}</td>
												<td>
													<LinkContainer to={`/admin/product/${productItem._id}/edit`}>
														<Button variant="light" className="btn-sm">
															<i className="fas fa-edit"></i>
														</Button>
													</LinkContainer>
													<Button
														variant="danger"
														className="btn-sm"
														onClick={(): void => deleteProductHandler(productItem._id)}>
														<i className="fas fa-trash"></i>
													</Button>
												</td>
											</tr>
										)
									)}
								</tbody>
							</Table>
							<Paginate pages={pages} page={page} isAdmin={userData.isAdmin} />
						</>
					)}
				</>
			)}
		</>
	);
};

export default ProductListPage;
