import HTTPMethod from "./index";
import { UserDataI } from "../stores/redux/reducers/authsReducer";

interface AuthsServiceI {
	name?: string;
	email?: string;
	password?: string;
	userForm?: UserDataI;
}

class AuthsService {
	// [GET]
	getUserData = (): Promise<any> => HTTPMethod.get("/api/users/profile");

	// [POST]
	signIn = ({ email, password }: AuthsServiceI): Promise<any> =>
		HTTPMethod.post("/api/users/login", { email, password });
	signUp = ({ name, email, password }: AuthsServiceI): Promise<any> =>
		HTTPMethod.post("/api/users/signup", { name, email, password });

	// [PUT]
	updateUserData = ({ userForm }: AuthsServiceI): Promise<any> =>
		HTTPMethod.put("/api/users/profile-update", { ...userForm });
}

export default new AuthsService();
