export function removeSession(key: string) {
	if (key.trim() === "") return false;
    
    // 세션에 토큰 저장
    sessionStorage.removeItem(key);
	return true;
}