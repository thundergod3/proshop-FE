import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import authsAction from "../../../stores/redux/actions/authsAction";
import { RootReducerI } from "../../../stores/rootReducer";

import SearchBox from "../../utils/SearchBox";

const Header = (): JSX.Element => {
	const {
		authsReducer: { checkAuthentication, userData },
		utilsReducer: { loading },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { signOutRequest } = authsAction;

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					{checkAuthentication !== undefined && (
						<Navbar.Collapse id="basic-navbar-nav">
							<SearchBox />
							<Nav className="ml-auto">
								<LinkContainer to="/cart">
									<Nav.Link>
										<i className="fas fa-shopping-cart"></i> Cart
									</Nav.Link>
								</LinkContainer>
								{checkAuthentication === true ? (
									<NavDropdown title={userData.name} id="username">
										<LinkContainer to="/profile">
											<NavDropdown.Item>Profile</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item onClick={(): any => dispatch(signOutRequest())}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								) : (
									<LinkContainer to="/login">
										<Nav.Link>
											<i className="fas fa-user"></i> Sign In
										</Nav.Link>
									</LinkContainer>
								)}
								{checkAuthentication === true && userData.isAdmin && (
									<NavDropdown title="Admin" id="adminmenu">
										<LinkContainer to="/admin/users">
											<NavDropdown.Item>Users</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/admin/products">
											<NavDropdown.Item>Products</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/admin/orders">
											<NavDropdown.Item>Orders</NavDropdown.Item>
										</LinkContainer>
									</NavDropdown>
								)}
							</Nav>
						</Navbar.Collapse>
					)}
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
