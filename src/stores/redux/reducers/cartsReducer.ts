import * as types from "../../../constants/types";

import produce from "immer";
import customLocal from "../../../helpers/customLocal";
import { StringifyOptions } from "querystring";

interface CartItemI {
	_id?: string;
	name?: string;
	image?: string;
	price?: number;
	countInStock?: number;
	quantity?: number | string;
	user?: string;
}

type CartListI = Array<CartItemI>;

interface ShippingAddressI {
	address?: string;
	city?: string;
	postalCode?: string;
	country?: string;
}

interface InitialStateI {
	cartList: CartListI;
	shippingAddress: ShippingAddressI;
	paymentMethod: string;
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
}

const initialState: InitialStateI = {
	cartList: [],
	shippingAddress: customLocal.getFromLocal("shippingAddress") || null,
	paymentMethod: customLocal.getFromLocal("paymentMethod") || null,
	itemsPrice: 0,
	shippingPrice: 0,
	taxPrice: 0,
	totalPrice: 0,
};

const cartsReducer = (state: InitialStateI = initialState, action: any) =>
	produce(state, (draft: InitialStateI) => {
		switch (action.type) {
			case types.FETCH_CART_LIST_SUCCEEDED: {
				draft.cartList = action.cartList;
				break;
			}

			case types.ADD_CART_ITEM_SUCCEEDED: {
				const newCartItem: CartItemI = action.cartItem;
				const cartItemIndex = draft.cartList.findIndex(
					(cartItem: CartItemI): boolean => cartItem._id === newCartItem._id
				);

				if (cartItemIndex !== -1) {
					draft.cartList = draft.cartList.map(
						(cartItem: CartItemI): CartItemI => (cartItem._id === newCartItem._id ? newCartItem : cartItem)
					);
				} else {
					draft.cartList.push(newCartItem);
				}

				break;
			}

			case types.REMOVE_CART_ITEM_SUCCEEDED: {
				draft.cartList = draft.cartList.filter(
					(cartItem: CartItemI): boolean => cartItem._id !== action.cartId
				);
				break;
			}

			case types.SAVING_SHIPPING_ADDRESS: {
				draft.shippingAddress = action.shippingAddress;
				customLocal.saveToLocal("shippingAddress", action.shippingAddress);
				break;
			}

			case types.SAVING_PAYMENT_METHOD: {
				draft.paymentMethod = action.paymentMethod;
				customLocal.saveToLocal("paymentMethod", action.paymentMethod);
				break;
			}

			case types.SET_PAYMENT_PRICE: {
				draft.itemsPrice = action.itemsPrice;
				draft.shippingPrice = action.shippingPrice;
				draft.taxPrice = action.taxPrice;
				draft.totalPrice = action.totalPrice;
				break;
			}

			case types.SIGN_OUT_SUCCEEDED: {
				draft.cartList = [];
				draft.paymentMethod = "";
				draft.shippingAddress = {};
				draft.itemsPrice = 0;
				draft.shippingPrice = 0;
				draft.taxPrice = 0;
				draft.totalPrice = 0;
				break;
			}

			default:
				break;
		}
	});

export default cartsReducer;
export type { CartItemI, CartListI, ShippingAddressI };
