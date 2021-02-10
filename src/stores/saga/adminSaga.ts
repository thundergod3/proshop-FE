import { AxiosResponse } from "axios";
import { takeLatest, put, call } from "redux-saga/effects";

import * as types from "../../constants/types";
import generateErrorSaga from "../../helpers/generateErrorSaga";

import AdminService from "../../services/adminService";

import adminAction from "../redux/actions/adminAction";
import utilsAction from "../redux/actions/utilsAction";

function* fetchUserList() {
	try {
		const { data }: AxiosResponse = yield call(AdminService.fetchUserList);
		yield put(adminAction.fetchUserListSucceeded(data));
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.clearError());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* getUserDetail({ userId }: any) {
	try {
		const { data }: AxiosResponse = yield call(AdminService.getUserDetail, { userId });
		yield put(adminAction.getUserDetailSucceeded(data));
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.clearError());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* updateUser({ userId, userForm, history }: any) {
	try {
		const { data }: AxiosResponse = yield call(AdminService.updateUser, { userId, userForm });
		yield put(adminAction.updateUserSucceeded(data));
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.clearError());
		yield history.push("/admin/users");
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* deleteUser({ userId }: any) {
	try {
		yield put(adminAction.deleteUserSucceeded(userId));
		yield call(AdminService.deleteUser, { userId });
		yield put(utilsAction.clearError());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* createProductItem({ productForm, history }: any) {
	try {
		const { data }: AxiosResponse = yield call(AdminService.createProductItem, { productForm });
		yield put(adminAction.createProductItemSucceeded(data));
		yield put(utilsAction.clearError());
		yield history.push("/admin/products");
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* updateProduct({ productId, productForm, history }: any) {
	try {
		const { data }: AxiosResponse = yield call(AdminService.updateProduct, { productId, productForm });
		yield put(adminAction.updateProductItemSucceeded(data));
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.clearError());
		yield history.push("/admin/products");
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* deleteProduct({ productId }: any) {
	try {
		yield put(adminAction.deleteProductSucceeded(productId));
		yield call(AdminService.deleteProduct, { productId });
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* fetchOrderList() {
	try {
		const { data }: AxiosResponse = yield call(AdminService.fetchOrderList);
		yield put(adminAction.fetchOrderListSucceeded(data));
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.clearError());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* orderDeliver({ orderId }: any) {
	try {
		const { data }: AxiosResponse = yield call(AdminService.orderDeliver, { orderId });
		yield put(adminAction.orderDeliverSucceeded());
		yield put(utilsAction.loadedUI());
	} catch (error) {
		yield call(generateErrorSaga, { error });
		yield put(adminAction.orderDeliverFailed());
	}
}

export default function* adminSaga() {
	yield takeLatest(types.FETCH_USER_LIST_REQUEST, fetchUserList);
	yield takeLatest(types.GET_USER_DETAIL_REQUEST, getUserDetail);
	yield takeLatest(types.UPDATE_USER_REQUEST, updateUser);
	yield takeLatest(types.DELETE_USER_REQUEST, deleteUser);
	yield takeLatest(types.CREATE_PRODUCT_ITEM_REQUEST, createProductItem);
	yield takeLatest(types.UPDATE_PRODUCT_ITEM_REQUEST, updateProduct);
	yield takeLatest(types.DELETE_PRODUCT_REQUEST, deleteProduct);
	yield takeLatest(types.FETCH_ORDER_LIST_REQUEST, fetchOrderList);
	yield takeLatest(types.ORDER_DELIVER_REQUEST, orderDeliver);
}
