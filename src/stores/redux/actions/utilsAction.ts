import * as types from "../../../constants/types";

class utilsAction {
	loadingUI = (): types.LoadUI => {
		return {
			type: types.LOADING_UI,
		};
	};
	loadedUI = (): types.LoadUI => {
		return {
			type: types.LOADED_UI,
		};
	};

	getError = (error: string): types.ChangeErrorI => {
		return {
			type: types.GET_ERROR,
			error,
		};
	};
	clearError = (): types.ChangeErrorI => {
		return {
			type: types.CLEAR_ERROR,
		};
	};

	updateStatusOn = (): types.UpdateStatusI => {
		return {
			type: types.UPDATE_STATUS_ON,
		};
	};
	updateStatusOff = (): types.UpdateStatusI => {
		return {
			type: types.UPDATE_STATUS_OFF,
		};
	};
}

export default new utilsAction();
