import { takeLatest, put, call, select } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import CartsService from "../../services/cartsService";

import * as types from "../../constants/types";
import cartsAction from "../redux/actions/cartsAction";
import utilsAction from "../redux/actions/utilsAction";
import customLocal from "../../helpers/customLocal";
import { RootReducerI } from "../rootReducer";

import generateErrorSaga from "../../helpers/generateErrorSaga";

function* fetchCartList() {
	try {
		const { data }: AxiosResponse = yield call(CartsService.fetchCartList);
		yield put(cartsAction.fetchCartListSucceeded(data));
		yield put(utilsAction.loadedUI());
		yield customLocal.saveToLocal("cartList", data);
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* addCartItem({ cartItem }: any) {
	try {
		yield put(cartsAction.addCartItemSucceeded(cartItem));
		yield call(CartsService.addCartItem, { cartItem });
		const {
			cartsReducer: { cartList },
		} = yield select((state: RootReducerI) => state);
		yield customLocal.saveToLocal("cartList", cartList);
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* removeCartItem({ cartId }: any) {
	try {
		yield call(CartsService.removeCartItem, { cartId });
		yield put(cartsAction.removeCartItemSucceeded(cartId));
		const {
			cartsReducer: { cartList },
		} = yield select((state: RootReducerI) => state);
		yield customLocal.saveToLocal("cartList", cartList);
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

export default function* cartsSaga() {
	yield takeLatest(types.FETCH_CART_LIST_REQUEST, fetchCartList);
	yield takeLatest(types.ADD_CART_ITEM_REQUEST, addCartItem);
	yield takeLatest(types.REMOVE_CART_ITEM_REQUEST, removeCartItem);
}
