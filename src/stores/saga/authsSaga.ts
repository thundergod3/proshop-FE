import { takeLatest, put, call, select } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import customLocal from "../../helpers/customLocal";

import HTTPMethod from "../../services";
import AuthsService from "../../services/authsService";

import * as types from "../../constants/types";
import authsAction from "../redux/actions/authsAction";
import utilsAction from "../redux/actions/utilsAction";

import decoded from "jwt-decode";
import generateErrorSaga from "../../helpers/generateErrorSaga";
import { RootReducerI } from "../rootReducer";
import { UserDataI } from "../redux/reducers/authsReducer";

function* getUserData() {
	try {
		const token: string | null | undefined = yield customLocal.getFromLocal("token");
		yield call(HTTPMethod.attachTokenToHeader, { token });
		const {
			authsReducer: { userData },
		} = yield select((state: RootReducerI) => state);
		let response: AxiosResponse | UserDataI | any = {};

		if (!userData || Object.keys(userData).length === 0) {
			response = yield call(AuthsService.getUserData);
		} else {
			response = userData;
		}
		yield put(authsAction.getUserDataSucceeded(response.data || response));
	} catch (error) {
		console.log(error);
		return error?.response?.status;
	}
}

function* updateUserData({ userForm }: any) {
	try {
		const token: string | null | undefined = yield customLocal.getFromLocal("token");
		yield call(HTTPMethod.attachTokenToHeader, { token });
		const { data }: AxiosResponse = yield call(AuthsService.updateUserData, { userForm });
		yield put(authsAction.updateUserDataSucceeded(data));
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.updateStatusOn());
	} catch (error) {
		yield call(generateErrorSaga, { error });
		yield put(utilsAction.updateStatusOff());
	}
}

function* signIn({ email, password }: any) {
	try {
		const { data }: AxiosResponse = yield call(AuthsService.signIn, { email, password });
		yield put(authsAction.signInSucceeded(data));
		yield customLocal.saveToLocal("userData", data);
		yield customLocal.saveToLocal("token", data.token);
		yield put(utilsAction.loadedUI());
		yield put(utilsAction.clearError());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* signUp({ name, email, password }: any) {
	try {
		try {
			const { data }: AxiosResponse = yield call(AuthsService.signUp, { name, email, password });
			yield put(authsAction.signUpSucceeded(data));
			yield customLocal.saveToLocal("userData", data);
			yield customLocal.saveToLocal("token", data.token);
			yield put(utilsAction.loadedUI());
			yield put(utilsAction.clearError());
		} catch (error) {
			yield call(generateErrorSaga, { error });
		}
	} catch (error) {
		console.log(error);
	}
}

function* signOut() {
	try {
		yield customLocal.removeFromLocal("userData");
		yield customLocal.removeFromLocal("token");
		yield call(HTTPMethod.removeTokenToHeader);
		yield put(authsAction.signOutSucceeded());
		yield put(utilsAction.clearError());
	} catch (error) {
		yield call(generateErrorSaga, { error });
	}
}

function* checkAuthentication() {
	try {
		const token: string = yield customLocal.getFromLocal("token");
		const statusCode: number = yield call(getUserData);

		if (statusCode === 401 || !token) {
			yield call(signOut);
		} else {
			const decodedToken: any = decoded(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) {
				yield call(signOut);
			} else {
				yield put(authsAction.checkAuthenticationSucceeded());
				yield put(utilsAction.clearError());
			}
		}
	} catch (error) {
		console.log(error);
	}
}

export default function* authSaga() {
	yield takeLatest(types.GET_USER_DATA_REQUEST, getUserData);
	yield takeLatest(types.UPDATE_USER_DATA_REQUEST, updateUserData);
	yield takeLatest(types.SIGN_IN_REQUEST, signIn);
	yield takeLatest(types.SIGN_UP_REQUEST, signUp);
	yield takeLatest(types.SIGN_OUT_REQUEST, signOut);
	yield takeLatest(types.CHECK_AUTHENTICATION_REQUEST, checkAuthentication);
}
