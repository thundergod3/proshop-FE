import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerI } from "../../stores/rootReducer";
import adminAction from "../../stores/redux/actions/adminAction";
import utilsAction from "../../stores/redux/actions/utilsAction";

import Message from "../../components/utils/Message";
import Loading from "../../components/utils/Loading";
import { UserDataI } from "../../stores/redux/reducers/authsReducer";

const UserListPage = (): JSX.Element => {
	const {
		authsReducer: { userList, checkAuthentication, userData },
		utilsReducer: { loading, error },
	} = useSelector((state: RootReducerI) => state);
	const dispatch = useDispatch();
	const { fetchUserListRequest, deleteUserRequest } = adminAction;
	const { loadingUI } = utilsAction;

	const deleteUserHandler = (userId: string | any): void => {
		if (window.confirm("Are you sure")) dispatch(deleteUserRequest(userId));
	};

	useEffect(() => {
		if (checkAuthentication && userData && userData.isAdmin) {
			dispatch(loadingUI());
			dispatch(fetchUserListRequest());
		}
	}, [checkAuthentication]);

	if (checkAuthentication === false) return <Redirect to="/login" />;

	if (checkAuthentication && !userData.isAdmin) return <Redirect to="/" />;

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loading />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					{checkAuthentication === undefined ? (
						<Loading />
					) : (
						<Table striped bordered hover responsive className="table-sm">
							<thead>
								<tr>
									<td>ID</td>
									<td>NAME</td>
									<td>EMAIL</td>
									<td>ADMIN</td>
									<td></td>
								</tr>
							</thead>
							<tbody>
								{userList.map(
									(user: UserDataI): JSX.Element => (
										<tr key={user._id}>
											<td>{user.name}</td>
											<td>
												<a href={`mailto:${user.email}`}>{user.email}</a>
											</td>
											<td>
												{user.isAdmin ? (
													<i className="fas fa-check" style={{ color: "green" }}></i>
												) : (
													<i className="fas fa-times" style={{ color: "red" }}></i>
												)}
											</td>
											<td>
												<LinkContainer to={`/admin/user/${user._id}`}>
													<Button variant="light" className="btn-sm">
														<i className="fas fa-edit"></i>
													</Button>
												</LinkContainer>
												<Button
													variant="danger"
													className="btn-sm"
													onClick={(): void => deleteUserHandler(user._id)}>
													<i className="fas fa-trash"></i>
												</Button>
											</td>
										</tr>
									)
								)}
							</tbody>
						</Table>
					)}
				</>
			)}
		</>
	);
};

export default UserListPage;
