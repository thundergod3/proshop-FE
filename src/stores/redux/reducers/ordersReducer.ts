import produce from "immer";
import * as types from "../../../constants/types";
import { CartListI, ShippingAddressI } from "./cartsReducer";

interface OrderUserInforI {
	_id?: string;
	name?: string;
	email?: string;
}

interface PaymentResultI {
	id?: string;
	status: string;
	update_time: Date;
	email_address: string;
}

interface OrderInfoI {
	_id?: string;
	orderList?: CartListI;
	paymentMethod?: string;
	paymentResult?: PaymentResultI;
	itemsPrice?: number;
	shippingPrice?: number;
	taxPrice?: number;
	totalPrice?: number;
	paidAt?: Date;
	isPaid?: boolean;
	deliveredAt?: Date;
	isDelivered?: boolean;
	shippingAddress?: ShippingAddressI;
	user?: OrderUserInforI;
	createdAt?: Date;
}

type OrderUserI = Array<OrderInfoI>;

interface OrderItemI {
	_id: string;
	name: string;
	quantity: number;
	image: string;
	price: number;
	product: string;
	user: {
		_id: string;
		name: string;
	};
	createdAt: string;
	totalPrice: number;
	deliveredAt: Date;
	isDelivered: boolean;
	isPaid: boolean;
	paidAt: Date;
}

type OrderListI = Array<OrderItemI>;

interface InitialStateI {
	orderInfo: OrderInfoI | null;
	orderCreatedSuccess: boolean | null;
	orderPaySuccess: boolean | null;
	orderUser: OrderUserI;
}

const initialState: InitialStateI = {
	orderInfo: {},
	orderCreatedSuccess: false,
	orderPaySuccess: false,
	orderUser: [],
};

const ordersReducer = (state: InitialStateI = initialState, action: any) =>
	produce(state, (draft: InitialStateI) => {
		switch (action.type) {
			case types.GET_ORDER_DETAIL_SUCCEEDED: {
				draft.orderInfo = action.orderInfo;
				break;
			}

			case types.ADD_ORDER_ITEM_SUCCEEDED: {
				draft.orderInfo = action.orderInfo;
				draft.orderCreatedSuccess = true;
				break;
			}

			case types.ADD_ORDER_ITEM_FAILED: {
				draft.orderCreatedSuccess = true;
				break;
			}

			case types.ORDER_PAY_SUCCEEDED: {
				draft.orderPaySuccess = true;
				break;
			}
			case types.ORDER_PAY_FAILED: {
				draft.orderPaySuccess = false;
				break;
			}

			case types.ORDER_PAY_RESET: {
				draft.orderInfo = null;
				draft.orderCreatedSuccess = false;
				draft.orderPaySuccess = false;
				break;
			}

			case types.GET_ORDER_USER_SUCCEEDED: {
				draft.orderUser = action.orderUser;
				break;
			}

			case types.SIGN_OUT_SUCCEEDED: {
				draft.orderInfo = null;
				draft.orderCreatedSuccess = false;
				draft.orderPaySuccess = false;
				draft.orderUser = [];
				break;
			}

			default:
				break;
		}
	});

export default ordersReducer;
export type { OrderInfoI, PaymentResultI, OrderUserI, OrderItemI, OrderListI };
