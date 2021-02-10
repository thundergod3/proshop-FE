import * as types from "../../../constants/types";

import { CartItemI, CartListI, ShippingAddressI } from "../reducers/cartsReducer";

class cartsAction {
	fetchCartListRequest = (): types.FetchCartListI => {
		return {
			type: types.FETCH_CART_LIST_REQUEST,
		};
	};
	fetchCartListSucceeded = (cartList: CartListI): types.FetchCartListI => {
		return {
			type: types.FETCH_CART_LIST_SUCCEEDED,
			cartList,
		};
	};

	addCartItemRequest = (cartItem: CartItemI): types.AddCartItemI => {
		return {
			type: types.ADD_CART_ITEM_REQUEST,
			cartItem,
		};
	};
	addCartItemSucceeded = (cartItem: CartItemI): types.AddCartItemI => {
		return {
			type: types.ADD_CART_ITEM_SUCCEEDED,
			cartItem,
		};
	};

	removeCartItemRequest = (cartId: string | any): types.RemoveCartItemI => {
		return {
			type: types.REMOVE_CART_ITEM_REQUEST,
			cartId,
		};
	};
	removeCartItemSucceeded = (cartId: string | any): types.RemoveCartItemI => {
		return {
			type: types.REMOVE_CART_ITEM_SUCCEEDED,
			cartId,
		};
	};

	savingShippingAddress = (shippingAddress: ShippingAddressI): types.SavingShippingAddressI => {
		return {
			type: types.SAVING_SHIPPING_ADDRESS,
			shippingAddress,
		};
	};

	savingPaymentMethod = (paymentMethod: string): types.SavingPaymentMethodI => {
		return {
			type: types.SAVING_PAYMENT_METHOD,
			paymentMethod,
		};
	};

	setPaymentPrice = (
		itemsPrice: number,
		shippingPrice: number,
		taxPrice: number,
		totalPrice: number
	): types.SetPaymentPriceI => {
		return {
			type: types.SET_PAYMENT_PRICE,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice,
		};
	};
}

export default new cartsAction();
