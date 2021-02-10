class customLocal {
	getFromLocal = (key: string) => JSON.parse(localStorage.getItem(key) || "null");

	saveToLocal = (key: string, value: string) => localStorage.setItem(key, JSON.stringify(value));

	removeFromLocal = (key: string) => localStorage.removeItem(key);
}

export default new customLocal();
