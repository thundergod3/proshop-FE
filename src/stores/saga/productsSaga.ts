import { AxiosResponse } from "axios";
import { takeLatest, put, call, select } from "redux-saga/effects";

import generateErrorSaga from "../../helpers/generateErrorSaga";

import ProductsService from "../../services/productsService";

import * as types from "../../constants/types";
import productsAction from "../redux/actions/productsAction";
import utilsAction from "../redux/actions/utilsAction";
import { RootReducerI } from "../rootReducer";

function* fetchProductList({ keyword = "", pageNumber = 1 }: any) {
	try {
		const {
			data: { productList, pages, page },
		}: AxiosResponse = yield call(ProductsService.fetchProductList, { keyword, pageNumber });
		yield put(productsAction.fetchProductListSucceeded(productList, pages, page));
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.clearError());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* fetchTopProductList() {
	try {
		const { data }: AxiosResponse = yield call(ProductsService.fetchTopProductList);
		yield put(productsAction.fetchTopProductListSucceeded(data));
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.clearError());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* fetchProductDetail({ productId }: any) {
	try {
		const { data }: AxiosResponse = yield call(ProductsService.fetchProductDetail, { productId });
		yield put(productsAction.fetchProductDetailSucceeded(data));
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.clearError());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* createProductReview({ productId, productReview }: any) {
	try {
		yield call(ProductsService.createProductReview, { productId, productReview });
		yield alert("Review Submitted!");
		yield put(utilsAction.loadingUI());
		const {
			productsReducer: { productDetail },
		} = yield select((state: RootReducerI) => state);
		yield put(productsAction.fetchProductDetailRequest(productDetail._id));
		yield put(productsAction.clearErrorCreateProductReview());
	} catch (error) {
		console.log(error);
		yield put(utilsAction.loadedUI());
		yield put(
			productsAction.getErrorCreateProductReview(
				error.response && error.response.data.msg ? error.response.data.msg : error.msg
			)
		);
	}
}

export default function* productsSaga() {
	yield takeLatest(types.FETCH_PRODUCT_LIST_REQUEST, fetchProductList);
	yield takeLatest(types.FETCH_TOP_PRODUCT_LIST_REQUEST, fetchTopProductList);
	yield takeLatest(types.FETCH_PRODUCT_DETAIL_REQUEST, fetchProductDetail);
	yield takeLatest(types.CREATE_PRODUCT_REVIEW, createProductReview);
}
