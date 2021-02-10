import * as types from "../../../constants/types";
import { UserDataI } from "../reducers/authsReducer";

class authsAction {
	signInRequest = (email: string, password: string): types.SignInI => {
		return {
			type: types.SIGN_IN_REQUEST,
			email,
			password,
		};
	};
	signInSucceeded = (userData: UserDataI): types.SignInI => {
		return {
			type: types.SIGN_IN_SUCCEEDED,
			userData,
		};
	};

	signUpRequest = (name: string, email: string, password: string): types.SignUpI => {
		return {
			type: types.SIGN_UP_REQUEST,
			name,
			email,
			password,
		};
	};
	signUpSucceeded = (userData: UserDataI): types.SignUpI => {
		return {
			type: types.SIGN_UP_SUCCEEDED,
			userData,
		};
	};

	signOutRequest = (): types.SignOutI => {
		return {
			type: types.SIGN_OUT_REQUEST,
		};
	};
	signOutSucceeded = (): types.SignOutI => {
		return {
			type: types.SIGN_OUT_SUCCEEDED,
		};
	};

	getUserDataRequest = (): types.GetUserDataI => {
		return {
			type: types.GET_USER_DATA_REQUEST,
		};
	};
	getUserDataSucceeded = (userData: UserDataI): types.GetUserDataI => {
		return {
			type: types.GET_USER_DATA_SUCCEEDED,
			userData,
		};
	};

	updateUserDataRequest = (userForm: UserDataI): types.UpdateUserDataI => {
		return {
			type: types.UPDATE_USER_DATA_REQUEST,
			userForm,
		};
	};
	updateUserDataSucceeded = (userData: UserDataI): types.UpdateUserDataI => {
		return {
			type: types.UPDATE_USER_DATA_SUCCEEDED,
			userData,
		};
	};

	checkAuthenticationRequest = (): types.CheckAuthenticationI => {
		return {
			type: types.CHECK_AUTHENTICATION_REQUEST,
		};
	};
	checkAuthenticationSucceeded = (): types.CheckAuthenticationI => {
		return {
			type: types.CHECK_AUTHENTICATION_SUCCEEDED,
		};
	};
	checkAuthenticationFailed = (): types.CheckAuthenticationI => {
		return {
			type: types.CHECK_AUTHENTICATION_FAILED,
		};
	};
}

export default new authsAction();
