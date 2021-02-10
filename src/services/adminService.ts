import HTTPMethod from "./index";

import { UserDataI } from "../stores/redux/reducers/authsReducer";
import { ProductItemI } from "../stores/redux/reducers/productsReducer";

interface AdminServiceI {
	userId?: string;
	userForm?: UserDataI;
	productId?: string;
	productForm?: ProductItemI;
	productImage?: any;
	orderId?: string;
}

class AdminService {
	// [GET]
	fetchUserList = (): Promise<any> => HTTPMethod.get("/api/admin/users");
	getUserDetail = ({ userId }: AdminServiceI): Promise<any> => HTTPMethod.get(`/api/admin/user/${userId}`);
	fetchOrderList = (): Promise<any> => HTTPMethod.get("/api/admin/products");

	// [POST]
	createProductItem = ({ productForm }: AdminServiceI): Promise<any> =>
		HTTPMethod.post("/api/admin/product", { ...productForm });

	// [PUT]
	updateUser = ({ userId, userForm }: AdminServiceI): Promise<any> =>
		HTTPMethod.put(`/api/admin/user/${userId}`, { ...userForm });
	updateProduct = ({ productId, productForm }: AdminServiceI): Promise<any> =>
		HTTPMethod.put(`/api/admin/product/${productId}`, { ...productForm });
	orderDeliver = ({ orderId }: AdminServiceI): Promise<any> => HTTPMethod.put(`/api/admin/order/${orderId}/deliver`);

	// [DELETE]
	deleteUser = ({ userId }: AdminServiceI): Promise<any> => HTTPMethod.delete(`/api/admin/user/${userId}`);
	deleteProduct = ({ productId }: AdminServiceI): Promise<any> =>
		HTTPMethod.delete(`/api/admin/product/${productId}`);
}

export default new AdminService();
