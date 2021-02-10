import { fork, all } from "redux-saga/effects";

import productsSaga from "./saga/productsSaga";
import authsSaga from "./saga/authsSaga";
import cartsSaga from "./saga/cartsSaga";
import ordersSaga from "./saga/ordersSaga";
import adminSaga from "./saga/adminSaga";

export default function* rootSaga() {
	yield all([fork(productsSaga), fork(cartsSaga), fork(authsSaga), fork(ordersSaga), fork(adminSaga)]);
}
