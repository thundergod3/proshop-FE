import HTTPMethod from "./index";

import { CartItemI } from "../stores/redux/reducers/cartsReducer";

interface CartsServiceI {
	cartId?: string;
	cartItem?: CartItemI;
}

class CartsService {
	// [GET]
	fetchCartList = (): Promise<any> => HTTPMethod.get("/api/carts");

	// [POST]
	addCartItem = ({ cartItem }: CartsServiceI): Promise<any> => HTTPMethod.post("/api/carts", { ...cartItem });

	// [DELETE]
	removeCartItem = ({ cartId }: CartsServiceI): Promise<any> => HTTPMethod.delete(`/api/carts/${cartId}`);
}

export default new CartsService();
