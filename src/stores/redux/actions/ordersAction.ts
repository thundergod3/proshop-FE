import * as types from "../../../constants/types";
import { OrderInfoI, OrderUserI, PaymentResultI } from "../reducers/ordersReducer";

class ordersAction {
	getOrderDetailRequest = (orderId: string): types.GetOrderDetailI => {
		return {
			type: types.GET_ORDER_DETAIL_REQUEST,
			orderId,
		};
	};
	getOrderDetailSucceeded = (orderInfo: OrderInfoI): types.GetOrderDetailI => {
		return {
			type: types.GET_ORDER_DETAIL_SUCCEEDED,
			orderInfo,
		};
	};

	addOrderItemRequest = (orderInfo: OrderInfoI): types.AddOrderItemI => {
		return {
			type: types.ADD_ORDER_ITEM_REQUEST,
			orderInfo,
		};
	};
	addOrderItemSucceeded = (orderInfo: OrderInfoI): types.AddOrderItemI => {
		return {
			type: types.ADD_ORDER_ITEM_SUCCEEDED,
			orderInfo,
		};
	};
	addOrderItemFailed = (): types.AddOrderItemI => {
		return {
			type: types.ADD_ORDER_ITEM_FAILED,
		};
	};

	orderPayRequest = (orderId: string, paymentResult: PaymentResultI): types.OrderPayI => {
		return {
			type: types.ORDER_PAY_REQUEST,
			orderId,
			paymentResult,
		};
	};
	orderPaySucceeded = (): types.OrderPayI => {
		return {
			type: types.ORDER_PAY_SUCCEEDED,
		};
	};
	orderPayFailed = (): types.OrderPayI => {
		return {
			type: types.ORDER_PAY_FAILED,
		};
	};

	orderPayRest = (): types.OrderPayResetI => {
		return {
			type: types.ORDER_PAY_RESET,
		};
	};

	getOrderUserRequest = (): types.GetOrderUserI => {
		return {
			type: types.GET_ORDER_USER_REQUEST,
		};
	};
	getOrderUserSucceeded = (orderUser: OrderUserI): types.GetOrderUserI => {
		return {
			type: types.GET_ORDER_USER_SUCCEEDED,
			orderUser,
		};
	};
}

export default new ordersAction();
