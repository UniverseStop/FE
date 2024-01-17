export function getTruncateText(text: string, len: number): string {
    // 텍스트가 없거나, 문자열 길이가 0인 경우 바로 리턴
	if (text.trim() === "" || len === 0) return text;
    
	return text.length > len ? text.substring(0, len - 1) + "..." : text;
}