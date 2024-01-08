export function getSession(key: string) {
	// Next.js는 클라이언트 사이드 렌더 전에 서버 사이드 렌더를 수행하기 때문에 window 객체의 존재 여부 확인 후 접근할 수 있도록 함.
	const token = typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
	return token && token.trim() !== "" ? token : "";
}