import { History } from "history";

import * as types from "../../../constants/types";
import { UserDataI, UserListI } from "../reducers/authsReducer";
import { OrderInfoI, OrderListI } from "../reducers/ordersReducer";
import { ProductItemI } from "../reducers/productsReducer";

class AdminAction {
	createProductItemRequest = (productForm: ProductItemI, history: History): types.CreateProductItemI => ({
		type: types.CREATE_PRODUCT_ITEM_REQUEST,
		productForm,
		history,
	});
	createProductItemSucceeded = (productForm: ProductItemI): types.CreateProductItemI => ({
		type: types.CREATE_PRODUCT_ITEM_SUCCEEDED,
		productForm,
	});

	updateProductItemRequest = (
		productId: string,
		productForm: ProductItemI,
		history: History
	): types.UpdateProductItemI => ({
		type: types.UPDATE_PRODUCT_ITEM_REQUEST,
		productId,
		productForm,
		history,
	});
	updateProductItemSucceeded = (productForm: ProductItemI): types.UpdateProductItemI => ({
		type: types.UPDATE_PRODUCT_ITEM_SUCCEEDED,
		productForm,
	});

	deleteProductRequest = (productId: string): types.DeleteProductI => ({
		type: types.DELETE_PRODUCT_REQUEST,
		productId,
	});
	deleteProductSucceeded = (productId: string): types.DeleteProductI => ({
		type: types.DELETE_PRODUCT_SUCCEEDED,
		productId,
	});

	fetchUserListRequest = (): types.FetchUserListI => ({ type: types.FETCH_USER_LIST_REQUEST });
	fetchUserListSucceeded = (userList: UserListI): types.FetchUserListI => ({
		type: types.FETCH_USER_LIST_SUCCEEDED,
		userList,
	});

	getUserDetailRequest = (userId: string): types.GetUserDetailI => ({ type: types.GET_USER_DETAIL_REQUEST, userId });
	getUserDetailSucceeded = (userDetail: UserDataI): types.GetUserDetailI => ({
		type: types.GET_USER_DETAIL_SUCCEEDED,
		userDetail,
	});

	updateUserRequest = (userId: string, userForm: UserDataI, history: History): types.UpdateUserI => ({
		type: types.UPDATE_USER_REQUEST,
		userId,
		userForm,
		history,
	});
	updateUserSucceeded = (userDetail: UserDataI): types.UpdateUserI => ({
		type: types.UPDATE_USER_SUCCEEDED,
		userDetail,
	});

	deleteUserRequest = (userId: string): types.DeleteUserI => ({ type: types.DELETE_USER_REQUEST, userId });
	deleteUserSucceeded = (userId: string): types.DeleteUserI => ({ type: types.DELETE_USER_SUCCEEDED, userId });

	fetchOrderListRequest = (): types.FetchOrderListI => ({ type: types.FETCH_ORDER_LIST_REQUEST });
	fetchOrderListSucceeded = (orderList: OrderListI): types.FetchOrderListI => ({
		type: types.FETCH_ORDER_LIST_SUCCEEDED,
		orderList,
	});

	orderDeliverRequest = (orderId: string): types.OrderDeliverI => ({ type: types.ORDER_DELIVER_REQUEST, orderId });
	orderDeliverSucceeded = (): types.OrderDeliverI => ({
		type: types.ORDER_DELIVER_SUCCEEDED,
	});
	orderDeliverFailed = (): types.OrderDeliverI => ({
		type: types.ORDER_DELIVER_FAILED,
	});

	orderDeliverRest = (): types.OrderDeliverResetI => ({ type: types.ORDER_DELIVER_RESET });
}

export default new AdminAction();
