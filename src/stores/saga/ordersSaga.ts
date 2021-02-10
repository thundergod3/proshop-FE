import { AxiosResponse } from "axios";
import { takeLatest, put, call } from "redux-saga/effects";

import * as types from "../../constants/types";
import ordersAction from "../redux/actions/ordersAction";
import utilsAction from "../redux/actions/utilsAction";

import OrdersService from "../../services/ordersService";

import generateErrorSaga from "../../helpers/generateErrorSaga";

function* getOrderDetail({ orderId }: any) {
	try {
		const { data }: AxiosResponse = yield call(OrdersService.getOrderDetail, { orderId });
		yield put(ordersAction.getOrderDetailSucceeded(data));
		yield put(utilsAction.loadedUI());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* getOrderUser() {
	try {
		const { data }: AxiosResponse = yield call(OrdersService.getOrderUser);
		yield put(ordersAction.getOrderUserSucceeded(data));
		yield put(utilsAction.loadedUI());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* addOrderItem({ orderInfo }: any) {
	try {
		const { data }: AxiosResponse = yield call(OrdersService.addOrderItem, { orderInfo });
		yield put(ordersAction.addOrderItemSucceeded(data));
		yield put(utilsAction.loadedUI());
	} catch (error) {
		yield call(generateErrorSaga, { error });
		yield put(ordersAction.addOrderItemFailed());
	}
}

function* orderPay({ orderId, paymentResult }: any) {
	try {
		const { data }: AxiosResponse = yield call(OrdersService.orderPay, { orderId, paymentResult });
		yield put(ordersAction.orderPaySucceeded());
		yield put(utilsAction.loadedUI());
	} catch (error) {
		yield call(generateErrorSaga, { error });
		yield put(ordersAction.orderPayFailed());
	}
}

export default function* ordersSaga() {
	yield takeLatest(types.GET_ORDER_DETAIL_REQUEST, getOrderDetail);
	yield takeLatest(types.GET_ORDER_USER_REQUEST, getOrderUser);
	yield takeLatest(types.ADD_ORDER_ITEM_REQUEST, addOrderItem);
	yield takeLatest(types.ORDER_PAY_REQUEST, orderPay);
}
