import HTTPMethod from "./index";

import { ReviewI } from "../stores/redux/reducers/productsReducer";

interface ProductsServiceI {
	productId?: string;
	productReview?: ReviewI;
	keyword?: string;
	pageNumber?: number;
}

class ProductsService {
	// [GET]
	fetchProductList = ({ keyword, pageNumber }: ProductsServiceI): Promise<any> =>
		HTTPMethod.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
	fetchTopProductList = (): Promise<any> => HTTPMethod.get("/api/products/top");
	fetchProductDetail = ({ productId }: ProductsServiceI): Promise<any> =>
		HTTPMethod.get(`/api/products/${productId}`);

	// [POST]
	createProductReview = ({ productId, productReview }: ProductsServiceI): Promise<any> =>
		HTTPMethod.post(`/api/products/${productId}/review`, { ...productReview });
}

export default new ProductsService();
