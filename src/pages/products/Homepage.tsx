import React, { useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import productsAction from "../../stores/redux/actions/productsAction";
import utilsAction from "../../stores/redux/actions/utilsAction";
import { RootReducerI } from "../../stores/rootReducer";

import ProductList from "../../components/products/ProductList";
import Loading from "../../components/utils/Loading";
import Message from "../../components/utils/Message";
import ProductCarousel from "../../components/products/ProductCarousel";
import Meta from "../../components/layouts/Meta";

const Homepage = ({ match }: RouteComponentProps<any>): JSX.Element => {
	const keyword: string = match.params.keyword;
	const pageNumber: number = Number(match.params.pageNumber) || 1;
	const {
		utilsReducer: { loading, error },
	} = useSelector((state: RootReducerI) => state);
	const { fetchProductListRequest } = productsAction;
	const { loadingUI } = utilsAction;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadingUI());
		dispatch(fetchProductListRequest(keyword, pageNumber));
	}, [keyword, pageNumber]);

	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to="/" className="btn btn-light">
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? <Loading /> : error ? <Message variant="danger" children={error} /> : <ProductList />}
		</>
	);
};

export default Homepage;
