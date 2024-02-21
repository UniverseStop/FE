import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const cryptoKey = process.env.CRYPTO_KEY || ""; // 암호화, 복호화 key

export function setCookie(key: string, token: string) {
	if (key.trim() === "" || token.trim() === "") return false;
    
	// 암호화
	const encryptedToken = CryptoJS.AES.encrypt(token, cryptoKey).toString();
    Cookies.set(key, encryptedToken);
	return true;
}

export function getCookie(key: string){
	if (key.trim() === "") return "";

	const encryptedToken = Cookies.get(key);

	// 복호화
	const bytes = CryptoJS.AES.decrypt(encryptedToken || "", cryptoKey);
	const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
	return decryptedToken;
}

export function removeCookie(key: string){
	if (key.trim() === "") return false;

	Cookies.remove(key);
	return true;
}