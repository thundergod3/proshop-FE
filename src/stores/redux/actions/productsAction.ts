import * as types from "../../../constants/types";

import { ProductItemI, ProductListI, ReviewI } from "../reducers/productsReducer";

class productsAction {
	fetchProductListRequest = (keyword?: string, pageNumber?: number): types.FetchProductListI => ({
		type: types.FETCH_PRODUCT_LIST_REQUEST,
		keyword,
		pageNumber,
	});
	fetchProductListSucceeded = (productList: ProductListI, pages: number, page: number): types.FetchProductListI => ({
		type: types.FETCH_PRODUCT_LIST_SUCCEEDED,
		productList,
		pages,
		page,
	});

	fetchTopProductListRequest = (): types.FetchTopProductListI => ({
		type: types.FETCH_TOP_PRODUCT_LIST_REQUEST,
	});
	fetchTopProductListSucceeded = (topProductList: ProductListI): types.FetchTopProductListI => ({
		type: types.FETCH_TOP_PRODUCT_LIST_SUCCEEDED,
		topProductList,
	});

	fetchProductDetailRequest = (productId: string): types.FetchProductDetailI => ({
		type: types.FETCH_PRODUCT_DETAIL_REQUEST,
		productId,
	});
	fetchProductDetailSucceeded = (productDetail: ProductItemI): types.FetchProductDetailI => ({
		type: types.FETCH_PRODUCT_DETAIL_SUCCEEDED,
		productDetail,
	});

	createReviewProduct = (productId: string, productReview: ReviewI): types.CreateProductReviewI => ({
		type: types.CREATE_PRODUCT_REVIEW,
		productId,
		productReview,
	});

	getErrorCreateProductReview = (createProductReviewError: string): types.ChangeErrorCreateReviewI => ({
		type: types.GET_ERROR_CREATE_PRODUCT_REVIEW,
		createProductReviewError,
	});
	clearErrorCreateProductReview = (): types.ChangeErrorCreateReviewI => ({
		type: types.CLEAR_ERROR_CREATE_PRODUCT_REVIEW,
	});
}

export default new productsAction();
