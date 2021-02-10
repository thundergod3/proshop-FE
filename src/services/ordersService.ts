import HTTPMethod from "./index";

import { OrderInfoI, PaymentResultI } from "../stores/redux/reducers/ordersReducer";

interface OrdersServiceI {
	orderId?: string;
	orderInfo?: OrderInfoI;
	paymentResult?: PaymentResultI;
}

class OrdersService {
	// [GET]
	getOrderDetail = ({ orderId }: OrdersServiceI): Promise<any> => HTTPMethod.get(`/api/orders/${orderId}`);
	getOrderUser = (): Promise<any> => HTTPMethod.get("/api/orders/myorders");

	// [POST]
	addOrderItem = ({ orderInfo }: OrdersServiceI): Promise<any> => HTTPMethod.post("/api/orders", { ...orderInfo });

	// [PUT]
	orderPay = ({ orderId, paymentResult }: OrdersServiceI): Promise<any> =>
		HTTPMethod.put(`/api/orders/${orderId}/pay`, { ...paymentResult });
}

export default new OrdersService();
