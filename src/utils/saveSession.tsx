export function saveSession(key: string, token: string) {
	if (token.trim() === "") return false;
    
    // 세션에 토큰 저장
    sessionStorage.setItem(key, token);
	return true;
}