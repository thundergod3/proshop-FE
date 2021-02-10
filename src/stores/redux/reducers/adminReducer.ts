import produce from "immer";

import * as types from "../../../constants/types";
import { UserDataI } from "./authsReducer";
import { OrderItemI, OrderListI } from "./ordersReducer";

type UserListI = Array<UserDataI>;

interface InitialStateI {
	userList: UserListI;
	userDetail: UserDataI;
	orderList: OrderListI;
	orderDeliverSuccess: boolean;
}

const initialState: InitialStateI = {
	userList: [],
	userDetail: {},
	orderList: [],
	orderDeliverSuccess: false,
};

const adminReducer = (state: InitialStateI = initialState, action: any) =>
	produce(state, (draft: InitialStateI) => {
		switch (action.type) {
			case types.FETCH_USER_LIST_SUCCEEDED: {
				draft.userList = action.userList;
				break;
			}

			case types.GET_USER_DETAIL_SUCCEEDED: {
				draft.userDetail = action.userDetail;
				break;
			}

			case types.UPDATE_USER_SUCCEEDED: {
				draft.userList = draft.userList.map(
					(user: UserDataI): UserDataI => (user._id === action.userDetail._id ? action.userDetail : user)
				);
				draft.userDetail = {};
				break;
			}

			case types.DELETE_USER_SUCCEEDED: {
				draft.userList = draft.userList.filter((user: UserDataI): boolean => user._id !== action.userId);
				break;
			}

			case types.FETCH_ORDER_LIST_SUCCEEDED: {
				draft.orderList = action.orderList;
				break;
			}

			case types.ORDER_DELIVER_SUCCEEDED: {
				draft.orderDeliverSuccess = true;
				break;
			}
			case types.ORDER_DELIVER_FAILED: {
				draft.orderDeliverSuccess = false;
				break;
			}

			case types.ORDER_DELIVER_RESET: {
				draft.orderDeliverSuccess = false;
				break;
			}

			default:
				break;
		}
	});

export default adminReducer;
export type { UserListI };
