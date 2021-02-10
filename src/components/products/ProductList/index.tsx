import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import { RootReducerI } from "../../../stores/rootReducer";
import { ProductItemI } from "../../../stores/redux/reducers/productsReducer";

import ProductItem from "../ProductItem";
import Paginate from "../../utils/Paginate";

const ProductList = ({ match }: RouteComponentProps<any>): JSX.Element => {
	const keyword: string = match.params.keyword;
	const {
		productsReducer: { productList, page, pages },
		authsReducer: { userData },
	} = useSelector((state: RootReducerI) => state);

	return (
		<>
			<Row>
				{productList.map(
					(productItem: ProductItemI): JSX.Element => (
						<Col key={productItem._id} sm={12} md={6} lg={4} xl={3}>
							<ProductItem productItem={productItem} />
						</Col>
					)
				)}
			</Row>
			<Paginate pages={pages} page={page} keyword={keyword} isAdmin={userData.isAdmin} />
		</>
	);
};

export default withRouter(ProductList);
