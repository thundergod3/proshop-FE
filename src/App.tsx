import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./App.scss";
import "./bootstrap.min.css";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "./stores/rootReducer";
import authsAction from "./stores/redux/actions/authsAction";

import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

import Homepage from "./pages/products/Homepage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import ShippingPage from "./pages/products/ShippingPage";
import PaymentPage from "./pages/products/PaymentPage";
import CartPage from "./pages/products/CartPage";
import PlaceOrderPage from "./pages/products/PlaceOrderPage";
import OrderPage from "./pages/products/OrderPage";

import SignInPage from "./pages/users/SignInPage";
import SignUpPage from "./pages/users/SignUpPage";
import ProfilePage from "./pages/users/ProfilePage";

import UserListPage from "./pages/admins/UserListPage";
import EditUserDetailPage from "./pages/admins/EditUserDetailPage";
import ProductListPage from "./pages/admins/ProductListPage";
import CreateProductPage from "./pages/admins/CreateProductPage";
import EditProductPage from "./pages/admins/EditProductPage";
import OrderListPage from "./pages/admins/OrderListPage";

const App = (): JSX.Element => {
	const {
		authsReducer: { checkAuthentication },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { checkAuthenticationRequest } = authsAction;

	useEffect(() => {
		dispatch(checkAuthenticationRequest());
	}, [checkAuthentication]);

	return (
		<>
			<Header />
			<main className="py-3">
				<Container>
					<Switch>
						{/* PRODUCT PAGES */}
						<Route exact path="/" component={Homepage} />
						<Route exact path="/search/:keyword" component={Homepage} />
						<Route exact path="/search/:keyword/page/:pageNumber" component={Homepage} />
						<Route exact path="/page/:pageNumber" component={Homepage} />
						<Route exact path="/product/:id" component={ProductDetailPage} />
						<Route exact path="/cart/:id?" component={CartPage} />
						<Route exact path="/shipping" component={ShippingPage} />
						<Route exact path="/payment" component={PaymentPage} />
						<Route exact path="/placeorder" component={PlaceOrderPage} />
						<Route exact path="/order/:id" component={OrderPage} />

						{/* AUTH & USER PAGES */}
						<Route exact path="/login" component={SignInPage} />
						<Route exact path="/register" component={SignUpPage} />
						<Route exact path="/profile" component={ProfilePage} />

						{/* ADMIN PAGES */}
						<Route exact path="/admin/users" component={UserListPage} />
						<Route exact path="/admin/user/:id" component={EditUserDetailPage} />
						<Route exact path="/admin/products" component={ProductListPage} />
						<Route exact path="/admin/products/:pageNumber" component={ProductListPage} />
						<Route exact path="/admin/create-product" component={CreateProductPage} />
						<Route exact path="/admin/product/:id/edit" component={EditProductPage} />
						<Route exact path="/admin/orders" component={OrderListPage} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</>
	);
};

export default App;
