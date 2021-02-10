import { History } from "history";
import { UserDataI, UserListI } from "../stores/redux/reducers/authsReducer";
import { CartItemI, CartListI, ShippingAddressI } from "../stores/redux/reducers/cartsReducer";
import { OrderInfoI, OrderListI, OrderUserI, PaymentResultI } from "../stores/redux/reducers/ordersReducer";
import { ProductItemI, ProductListI, ReviewI } from "../stores/redux/reducers/productsReducer";

// PRODUCT TYPES
export const FETCH_PRODUCT_LIST_REQUEST: string = "FETCH_PRODUCT_LIST_REQUEST";
export const FETCH_PRODUCT_LIST_SUCCEEDED: string = "FETCH_PRODUCT_LIST_SUCCEEDED";

export const FETCH_TOP_PRODUCT_LIST_REQUEST: string = "FETCH_TOP_PRODUCT_LIST_REQUEST";
export const FETCH_TOP_PRODUCT_LIST_SUCCEEDED: string = "FETCH_TOP_PRODUCT_LIST_SUCCEEDED";

export const FETCH_PRODUCT_DETAIL_REQUEST: string = "FETCH_PRODUCT_DETAIL_REQUEST";
export const FETCH_PRODUCT_DETAIL_SUCCEEDED: string = "FETCH_PRODUCT_DETAIL_SUCCEEDED";

export const CREATE_PRODUCT_REVIEW: string = "CREATE_PRODUCT_REVIEW";

export const GET_ERROR_CREATE_PRODUCT_REVIEW: string = "GET_ERROR_CREATE_PRODUCT_REVIEW";
export const CLEAR_ERROR_CREATE_PRODUCT_REVIEW: string = "CLEAR_ERROR_CREATE_PRODUCT_REVIEW";

// CART TYPES
export const FETCH_CART_LIST_REQUEST: string = "FETCH_CART_LIST_REQUEST";
export const FETCH_CART_LIST_SUCCEEDED: string = "FETCH_CART_LIST_SUCCEEDED";

export const ADD_CART_ITEM_REQUEST: string = "ADD_CART_ITEM_REQUEST";
export const ADD_CART_ITEM_SUCCEEDED: string = "ADD_CART_ITEM_SUCCEEDED";

export const REMOVE_CART_ITEM_REQUEST: string = "REMOVE_CART_ITEM_REQUEST";
export const REMOVE_CART_ITEM_SUCCEEDED: string = "REMOVE_CART_ITEM_SUCCEEDED";

export const SAVING_SHIPPING_ADDRESS: string = "SAVING_SHIPPING_ADDRESS";

export const SAVING_PAYMENT_METHOD: string = "SAVING_PAYMENT_METHOD";

export const SET_PAYMENT_PRICE: string = "SET_PAYMENT_PRICE";

// AUTH TYPES
export const SIGN_IN_REQUEST: string = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCEEDED: string = "SIGN_IN_SUCCEEDED";

export const SIGN_UP_REQUEST: string = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCEEDED: string = "SIGN_UP_SUCCEEDED";

export const SIGN_OUT_REQUEST: string = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCEEDED: string = "SIGN_OUT_SUCCEEDED";

export const GET_USER_DATA_REQUEST: string = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCEEDED: string = "GET_USER_DATA_SUCCEEDED";

export const UPDATE_USER_DATA_REQUEST: string = "UPDATE_USER_DATA_REQUEST";
export const UPDATE_USER_DATA_SUCCEEDED: string = "UPDATE_USER_DATA_SUCCEEDED";

export const CHECK_AUTHENTICATION_REQUEST: string = "CHECK_AUTHENTICATION_REQUEST";
export const CHECK_AUTHENTICATION_SUCCEEDED: string = "CHECK_AUTHENTICATION_SUCCEEDED";
export const CHECK_AUTHENTICATION_FAILED: string = "CHECK_AUTHENTICATION_FAILED";

// ORDER TYPES
export const GET_ORDER_DETAIL_REQUEST: string = "GET_ORDER_DETAIL_REQUEST";
export const GET_ORDER_DETAIL_SUCCEEDED: string = "GET_ORDER_DETAIL_SUCCEEDED";

export const GET_ORDER_USER_REQUEST: string = "GET_ORDER_USER_REQUEST";
export const GET_ORDER_USER_SUCCEEDED: string = "GET_ORDER_USER_SUCCEEDED";

export const ADD_ORDER_ITEM_REQUEST: string = "ADD_ORDER_ITEM_REQUEST";
export const ADD_ORDER_ITEM_SUCCEEDED: string = "ADD_ORDER_ITEM_SUCCEEDED";
export const ADD_ORDER_ITEM_FAILED: string = "ADD_ORDER_ITEM_FAILED";

export const ORDER_PAY_REQUEST: string = "ORDER_PAY_REQUEST";
export const ORDER_PAY_SUCCEEDED: string = "ORDER_PAY_SUCCEEDED";
export const ORDER_PAY_FAILED: string = "ORDER_PAY_FAILED";

export const ORDER_PAY_RESET: string = "ORDER_PAY_RESET";

// ADMIN TYPES
export const FETCH_USER_LIST_REQUEST: string = "FETCH_USER_LIST_REQUEST";
export const FETCH_USER_LIST_SUCCEEDED: string = "FETCH_USER_LIST_SUCCEEDED";

export const GET_USER_DETAIL_REQUEST: string = "GET_USER_DETAIL_REQUEST";
export const GET_USER_DETAIL_SUCCEEDED: string = "GET_USER_DETAIL_SUCCEEDED";

export const CREATE_PRODUCT_ITEM_REQUEST: string = "CREATE_PRODUCT_ITEM_REQUEST";
export const CREATE_PRODUCT_ITEM_SUCCEEDED: string = "CREATE_PRODUCT_ITEM_SUCCEEDED";

export const UPDATE_PRODUCT_ITEM_REQUEST: string = "UPDATE_PRODUCT_ITEM_REQUEST";
export const UPDATE_PRODUCT_ITEM_SUCCEEDED: string = "UPDATE_PRODUCT_ITEM_SUCCEEDED";

export const DELETE_PRODUCT_REQUEST: string = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCEEDED: string = "DELETE_PRODUCT_SUCCEEDED";

export const UPDATE_USER_REQUEST: string = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCEEDED: string = "UPDATE_USER_SUCCEEDED";

export const DELETE_USER_REQUEST: string = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCEEDED: string = "DELETE_USER_SUCCEEDED";

export const FETCH_ORDER_LIST_REQUEST: string = "FETCH_ORDER_LIST_REQUEST";
export const FETCH_ORDER_LIST_SUCCEEDED: string = "FETCH_ORDER_LIST_SUCCEEDED";

export const ORDER_DELIVER_REQUEST: string = "ORDER_DELIVER_REQUEST";
export const ORDER_DELIVER_SUCCEEDED: string = "ORDER_DELIVER_SUCCEEDED";
export const ORDER_DELIVER_FAILED: string = "ORDER_DELIVER_FAILED";

export const ORDER_DELIVER_RESET: string = "ORDER_DELIVER_RESET";

// UTIL TYPES
export const LOADING_UI: string = "LOADING_UI";
export const LOADED_UI: string = "LOADED_UI";

export const GET_ERROR: string = "GET_ERROR";
export const CLEAR_ERROR: string = "CLEAR_ERROR";

export const UPDATE_STATUS_ON: string = "UPDATE_STATUS_ON";
export const UPDATE_STATUS_OFF: string = "UPDATE_STATUS_OFF";

// PRODUCT ACTION TYPES
interface FetchProductListRequestI {
	type: typeof FETCH_PRODUCT_LIST_REQUEST;
	keyword?: string;
	pageNumber?: number;
}
interface FetchProductListSucceededI {
	type: typeof FETCH_PRODUCT_LIST_SUCCEEDED;
	productList: ProductListI;
	pages: number;
	page: number;
}

interface FetchTopProductListRequestI {
	type: typeof FETCH_TOP_PRODUCT_LIST_REQUEST;
}
interface FetchTopProductListSucceededI {
	type: typeof FETCH_TOP_PRODUCT_LIST_SUCCEEDED;
	topProductList: ProductListI;
}
interface FetchProductDetailRequestI {
	type: typeof FETCH_PRODUCT_LIST_REQUEST;
	productId: string;
}
interface FetchProductDetailSucceededI {
	type: typeof FETCH_PRODUCT_LIST_SUCCEEDED;
	productDetail: ProductItemI;
}

interface CreateProductReviewI {
	type: typeof CREATE_PRODUCT_REVIEW;
	productId: string;
	productReview: ReviewI;
}

interface GetErrorCreateProductReviewI {
	type: typeof GET_ERROR_CREATE_PRODUCT_REVIEW;
	createProductReviewError: string;
}
interface ClearErrorCreaterProductReviewI {
	type: typeof CLEAR_ERROR_CREATE_PRODUCT_REVIEW;
}

// CART ACTION TYPES
interface FetchCartListRequestI {
	type: typeof FETCH_CART_LIST_REQUEST;
}
interface FetchCartListSucceededI {
	type: typeof FETCH_CART_LIST_SUCCEEDED;
	cartList: CartListI;
}

interface AddCartItemRequestI {
	type: typeof ADD_CART_ITEM_REQUEST;
	cartItem: CartItemI;
}
interface AddCartItemSucceededI {
	type: typeof ADD_CART_ITEM_SUCCEEDED;
	cartItem: CartItemI;
}

interface RemoveCartItemRequestI {
	type: typeof REMOVE_CART_ITEM_REQUEST;
	cartId: string | any;
}
interface RemoveCartItemSucceededI {
	type: typeof REMOVE_CART_ITEM_SUCCEEDED;
	cartId: string | any;
}

interface SavingShippingAddressI {
	type: typeof SAVING_SHIPPING_ADDRESS;
	shippingAddress: ShippingAddressI;
}

interface SavingPaymentMethodI {
	type: typeof SAVING_PAYMENT_METHOD;
	paymentMethod: string;
}

interface SetPaymentPriceI {
	type: typeof SET_PAYMENT_PRICE;
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
}

// AUTH ACTION TYPES
interface SignInRequestI {
	type: typeof SIGN_IN_REQUEST;
	email: string;
	password: string;
}
interface SignInSucceededI {
	type: typeof SIGN_IN_SUCCEEDED;
	userData: UserDataI;
}

interface SignUpRequestI {
	type: typeof SIGN_UP_REQUEST;
	name: string;
	email: string;
	password: string;
}
interface SignUpSucceededI {
	type: typeof SIGN_UP_SUCCEEDED;
	userData: UserDataI;
}

interface SignOutRequestI {
	type: typeof SIGN_OUT_REQUEST;
}
interface SignOutSucceededI {
	type: typeof SIGN_OUT_SUCCEEDED;
}

interface GetUserDataRequestI {
	type: typeof GET_USER_DATA_REQUEST;
}
interface GetUserDataSucceededI {
	type: typeof GET_USER_DATA_SUCCEEDED;
	userData: UserDataI;
}

interface UpdateUserDataRequestI {
	type: typeof UPDATE_USER_DATA_REQUEST;
	userForm: UserDataI;
}
interface UpdateUserDataSucceededI {
	type: typeof UPDATE_USER_DATA_SUCCEEDED;
	userData: UserDataI;
}

interface CheckAuthenticationRequestI {
	type: typeof CHECK_AUTHENTICATION_REQUEST;
}
interface CheckAuthenticationSucceededI {
	type: typeof CHECK_AUTHENTICATION_SUCCEEDED;
}
interface CheckAuthenticationFailedI {
	type: typeof CHECK_AUTHENTICATION_FAILED;
}

// ORDERS ACTION TYPE
interface GetOrderDetailRequestI {
	type: typeof GET_ORDER_DETAIL_REQUEST;
	orderId: string;
}
interface GetOrderDetailSucceededI {
	type: typeof GET_ORDER_DETAIL_SUCCEEDED;
	orderInfo: OrderInfoI;
}

interface GetOrderUserRequestI {
	type: typeof GET_ORDER_USER_REQUEST;
}
interface GetOrderUserSucceededI {
	type: typeof GET_USER_DATA_SUCCEEDED;
	orderUser: OrderUserI;
}

interface AddOrderItemRequestI {
	type: typeof ADD_ORDER_ITEM_REQUEST;
	orderInfo: OrderInfoI;
}
interface AddOrderItemSucceededI {
	type: typeof ADD_ORDER_ITEM_SUCCEEDED;
	orderInfo: OrderInfoI;
}
interface AddOrderItemFailedI {
	type: typeof ADD_ORDER_ITEM_FAILED;
}

interface OrderPayRequestI {
	type: typeof ORDER_PAY_REQUEST;
	orderId: string;
	paymentResult: PaymentResultI;
}
interface OrderPaySucceededI {
	type: typeof ORDER_PAY_SUCCEEDED;
}
interface OrderPayFailedI {
	type: typeof ORDER_PAY_FAILED;
}

interface OrderPayResetI {
	type: typeof ORDER_PAY_RESET;
}

// ADMINS ACTION TYPE
interface FetchUserListRequestI {
	type: typeof FETCH_USER_LIST_REQUEST;
}
interface FetchUserListSucceededI {
	type: typeof FETCH_USER_LIST_SUCCEEDED;
	userList: UserListI;
}

interface GetUserDetailRequestI {
	type: typeof GET_USER_DETAIL_REQUEST;
	userId: string;
}
interface GetUserDetailSucceededI {
	type: typeof GET_USER_DETAIL_SUCCEEDED;
	userDetail: UserDataI;
}

interface CreateProductItemRequestI {
	type: typeof CREATE_PRODUCT_ITEM_REQUEST;
	productForm: ProductItemI;
	history: History;
}
interface CreateProductItemSucceededI {
	type: typeof CREATE_PRODUCT_ITEM_SUCCEEDED;
	productForm: ProductItemI;
}

interface UpdateProductItemRequestI {
	type: typeof UPDATE_PRODUCT_ITEM_REQUEST;
	productId: string;
	productForm: ProductItemI;
	history: History;
}
interface UpdateProductItemSucceededI {
	type: typeof UPDATE_PRODUCT_ITEM_SUCCEEDED;
	productForm: ProductItemI;
}

interface DeleteProductRequestI {
	type: typeof DELETE_PRODUCT_REQUEST;
	productId: string;
}
interface DeleteProductSucceededI {
	type: typeof DELETE_PRODUCT_SUCCEEDED;
	productId: string;
}

interface UpdateUserRequestI {
	type: typeof UPDATE_USER_REQUEST;
	userId: string;
	userForm: UserDataI;
	history: History;
}
interface UpdateUserSucceededI {
	type: typeof UPDATE_USER_SUCCEEDED;
	userDetail: UserDataI;
}

interface DeleteUserRequestI {
	type: typeof DELETE_USER_REQUEST;
	userId: string;
}
interface DeleteUserSucceededI {
	type: typeof DELETE_USER_SUCCEEDED;
	userId: string;
}

interface FetchOrderListRequestI {
	type: typeof FETCH_ORDER_LIST_REQUEST;
}
interface FetchOrderListSucceededI {
	type: typeof FETCH_ORDER_LIST_SUCCEEDED;
	orderList: OrderListI;
}

interface OrderDeliverRequestI {
	type: typeof ORDER_DELIVER_REQUEST;
	orderId: string;
}
interface OrderDeliverSucceededI {
	type: typeof ORDER_DELIVER_SUCCEEDED;
}
interface OrderDeliverFailedI {
	type: typeof ORDER_DELIVER_FAILED;
}

interface OrderDeliverResetI {
	type: typeof ORDER_DELIVER_RESET;
}

// UTILS ACTION TYPE
interface LoadingUII {
	type: typeof LOADING_UI;
}
interface LoadedUII {
	type: typeof LOADED_UI;
}

interface GetErrorI {
	type: typeof GET_ERROR;
	error: string;
}
interface ClearErrorI {
	type: typeof CLEAR_ERROR;
}

interface UpdateStatusOnI {
	type: typeof UPDATE_STATUS_ON;
}
interface UpdateStatusOffI {
	type: typeof UPDATE_STATUS_OFF;
}

// PRODUCT EXPORT ACTION TYPES
export type FetchProductListI = FetchProductListRequestI | FetchProductListSucceededI;
export type FetchTopProductListI = FetchTopProductListRequestI | FetchTopProductListSucceededI;
export type FetchProductDetailI = FetchProductDetailRequestI | FetchProductDetailSucceededI;
export type ChangeErrorCreateReviewI = GetErrorCreateProductReviewI | ClearErrorCreaterProductReviewI;
export type { CreateProductReviewI };

// CART EXPORT ACTION TYPES
export type FetchCartListI = FetchCartListRequestI | FetchCartListSucceededI;
export type AddCartItemI = AddCartItemRequestI | AddCartItemSucceededI;
export type RemoveCartItemI = RemoveCartItemRequestI | RemoveCartItemSucceededI;
export type { SavingShippingAddressI, SavingPaymentMethodI, SetPaymentPriceI };

// ORDER EXPORT ACTION TYPES
export type GetOrderDetailI = GetOrderDetailRequestI | GetOrderDetailSucceededI;
export type AddOrderItemI = AddOrderItemRequestI | AddOrderItemSucceededI | AddOrderItemFailedI;
export type OrderPayI = OrderPayRequestI | OrderPaySucceededI | OrderPayFailedI;
export type GetOrderUserI = GetOrderUserRequestI | GetOrderUserSucceededI;
export type { OrderPayResetI };

// ADMIN EXPORT ACTION TYPES
export type FetchUserListI = FetchUserListRequestI | FetchUserListSucceededI;
export type CreateProductItemI = CreateProductItemRequestI | CreateProductItemSucceededI;
export type UpdateProductItemI = UpdateProductItemRequestI | UpdateProductItemSucceededI;
export type DeleteProductI = DeleteProductRequestI | DeleteProductSucceededI;
export type GetUserDetailI = GetUserDetailRequestI | GetUserDetailSucceededI;
export type UpdateUserI = UpdateUserRequestI | UpdateUserSucceededI;
export type DeleteUserI = DeleteUserRequestI | DeleteUserSucceededI;
export type FetchOrderListI = FetchOrderListRequestI | FetchOrderListSucceededI;
export type OrderDeliverI = OrderDeliverRequestI | OrderDeliverSucceededI | OrderDeliverFailedI;
export type { OrderDeliverResetI };

// AUTH EXPORT ACTION TYPES
export type SignInI = SignInRequestI | SignInSucceededI;
export type SignUpI = SignUpRequestI | SignUpSucceededI;
export type SignOutI = SignOutRequestI | SignOutSucceededI;
export type GetUserDataI = GetUserDataRequestI | GetUserDataSucceededI;
export type UpdateUserDataI = UpdateUserDataRequestI | UpdateUserDataSucceededI;
export type CheckAuthenticationI =
	| CheckAuthenticationRequestI
	| CheckAuthenticationSucceededI
	| CheckAuthenticationFailedI;

// UTIL EXPORT ACTION TYPES
export type LoadUI = LoadingUII | LoadedUII;
export type ChangeErrorI = GetErrorI | ClearErrorI;
export type UpdateStatusI = UpdateStatusOnI | UpdateStatusOffI;
