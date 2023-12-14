const parseJwt = (token: any) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

// const token = "eyJhbGciOiJIUzI1NiJ9..."; // 여기에 JWT 토큰을 넣습니다.
// const decoded = parseJwt(token);

// console.log(decoded); // 이 코드는 사용자 정보를 출력합니다.

export default parseJwt;
