import * as types from "../../../constants/types";

import produce from "immer";

interface UserDataI {
	_id?: string;
	name?: string;
	email?: string;
	isAdmin?: boolean;
	password?: string;
}

type UserListI = Array<UserDataI>;

interface InitialStateI {
	userData: UserDataI;
	token: string;
	checkAuthentication: boolean | undefined;
	userList: UserListI;
}

const initialState: InitialStateI = {
	userData: {},
	token: "",
	checkAuthentication: undefined,
	userList: [],
};

const authsReducer = (state: InitialStateI = initialState, action: any) =>
	produce(state, (draft: InitialStateI) => {
		switch (action.type) {
			case types.SIGN_IN_SUCCEEDED:
			case types.SIGN_UP_SUCCEEDED:
			case types.GET_USER_DATA_SUCCEEDED:
			case types.UPDATE_USER_DATA_SUCCEEDED: {
				draft.userData = action.userData;
				draft.token = action.userData.token;
				draft.checkAuthentication = true;
				break;
			}

			case types.SIGN_OUT_SUCCEEDED: {
				draft.userData = {};
				draft.token = "";
				draft.checkAuthentication = false;
				break;
			}

			case types.CHECK_AUTHENTICATION_SUCCEEDED: {
				draft.checkAuthentication = true;
				break;
			}
			case types.CHECK_AUTHENTICATION_FAILED: {
				draft.checkAuthentication = false;
				break;
			}

			case types.FETCH_USER_LIST_SUCCEEDED: {
				draft.userList = action.userList;
				break;
			}

			case types.DELETE_USER_SUCCEEDED: {
				draft.userList = draft.userList.filter((user: UserDataI): boolean => user._id !== action.userId);
				break;
			}

			default:
				break;
		}
	});

export default authsReducer;
export type { UserDataI, UserListI };
