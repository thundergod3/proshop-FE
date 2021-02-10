import * as types from "../../../constants/types";

import produce from "immer";

interface ReviewI {
	_id?: string;
	name?: string;
	rating?: number;
	comment?: string;
	user?: string;
	createdAt?: Date;
}

type ReviewListI = Array<ReviewI>;

interface ProductItemI {
	_id?: string;
	name?: string;
	image?: string;
	description?: string;
	brand?: string;
	category?: string;
	price?: number;
	countInStock?: number | any;
	rating?: number;
	numReviews?: number;
	user?: string;
	reviews?: ReviewListI;
}

type ProductListI = Array<ProductItemI>;

interface InitialStateI {
	productList: ProductListI;
	topProductList: ProductListI;
	productDetail: ProductItemI;
	createReviewSuccess: boolean;
	createReviewError: string;
	pages: number;
	page: number;
}

const initialState: InitialStateI = {
	productList: [],
	topProductList: [],
	productDetail: {},
	createReviewSuccess: false,
	createReviewError: "",
	pages: 0,
	page: 0,
};

const productsReducer = (state: InitialStateI = initialState, action: any) =>
	produce(state, (draft: InitialStateI) => {
		switch (action.type) {
			case types.FETCH_PRODUCT_LIST_SUCCEEDED: {
				draft.productList = action.productList;
				draft.pages = action.pages;
				draft.page = action.page;
				break;
			}

			case types.FETCH_TOP_PRODUCT_LIST_SUCCEEDED: {
				draft.topProductList = action.topProductList;
				break;
			}

			case types.FETCH_PRODUCT_DETAIL_SUCCEEDED: {
				draft.productDetail = action.productDetail;
				break;
			}

			case types.CREATE_PRODUCT_ITEM_SUCCEEDED: {
				draft.productList.push(action.productForm);
				break;
			}

			case types.UPDATE_PRODUCT_ITEM_SUCCEEDED: {
				draft.productList = draft.productList.map(
					(productItem: ProductItemI): ProductItemI =>
						productItem._id === action.productForm._id ? action.productForm : productItem
				);
				break;
			}

			case types.DELETE_PRODUCT_SUCCEEDED: {
				draft.productList = draft.productList.filter(
					(productItem: ProductItemI): boolean => productItem._id !== action.productId
				);
				break;
			}

			case types.GET_ERROR_CREATE_PRODUCT_REVIEW: {
				draft.createReviewError = action.createProductReviewError;
				break;
			}
			case types.CLEAR_ERROR_CREATE_PRODUCT_REVIEW: {
				draft.createReviewError = "";
				break;
			}

			default:
				break;
		}
	});

export default productsReducer;
export type { ProductItemI, ProductListI, ReviewI, ReviewListI };
