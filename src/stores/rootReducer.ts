import { combineReducers } from "redux";
import productsReducer from "./redux/reducers/productsReducer";
import authsReducer from "./redux/reducers/authsReducer";
import utilsReducer from "./redux/reducers/utilsReducer";
import cartsReducer from "./redux/reducers/cartsReducer";
import ordersReducer from "./redux/reducers/ordersReducer";
import adminReducer from "./redux/reducers/adminReducer";

const rootReducer = combineReducers({
	adminReducer,
	productsReducer,
	authsReducer,
	utilsReducer,
	cartsReducer,
	ordersReducer,
});

export default rootReducer;
export type RootReducerI = ReturnType<typeof rootReducer>;
