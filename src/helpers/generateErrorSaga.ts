import { put } from "redux-saga/effects";
import utilsAction from "../stores/redux/actions/utilsAction";

export default function* generateErrorSaga({ error }: any) {
	console.log(error);
	yield put(utilsAction.loadedUI());
	yield put(utilsAction.getError(error.response && error.response.data.msg ? error.response.data.msg : error.msg));
}
