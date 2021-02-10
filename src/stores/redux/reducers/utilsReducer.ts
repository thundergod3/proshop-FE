import * as types from "../../../constants/types";

import produce from "immer";

interface InitialStateI {
	loading: boolean;
	error: string;
	updateStatus: boolean;
}

const initialState: InitialStateI = {
	loading: false,
	error: "",
	updateStatus: false,
};

const utilsReducer = (state: InitialStateI = initialState, action: any) =>
	produce(state, (draft: InitialStateI) => {
		switch (action.type) {
			case types.LOADING_UI: {
				draft.loading = true;
				break;
			}
			case types.LOADED_UI: {
				draft.loading = false;
				break;
			}

			case types.GET_ERROR: {
				draft.error = action.error;
				break;
			}
			case types.CLEAR_ERROR: {
				draft.error = "";
				break;
			}

			case types.UPDATE_STATUS_ON: {
				draft.updateStatus = true;
				break;
			}
			case types.UPDATE_STATUS_OFF: {
				draft.updateStatus = false;
				break;
			}

			default:
				break;
		}
	});

export default utilsReducer;
