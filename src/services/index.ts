import axios, { AxiosStatic } from "axios";

class HTTPMethod {
	axios: AxiosStatic;

	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = "http://localhost:8080";
		this.axios.defaults.headers = { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" };
	}

	get = (url: string, remainProps?: any): Promise<any> => axios.get(url, remainProps);

	post = (url: string, remainProps?: any): Promise<any> => axios.post(url, remainProps);

	put = (url: string, remainProps?: any): Promise<any> => axios.put(url, remainProps);

	delete = (url: string, remainProps?: any): Promise<any> => axios.delete(url, remainProps);

	attachTokenToHeader = ({ token }: any): string => (axios.defaults.headers["Authorization"] = `Bearer ${token}`);

	removeTokenToHeader = (): string => (axios.defaults.headers["Authorization"] = "");

	uploadImage = (image: any) => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		return axios.post("/api/admin/upload-image", image, config);
	};
}

export default new HTTPMethod();
