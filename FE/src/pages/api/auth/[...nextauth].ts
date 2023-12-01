import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
	session: {
		strategy: "jwt" as const,
		maxAge: 60 * 60 * 24,
		updateAge: 60 * 60 * 2,
	},

	providers: [
		KakaoProvider({
			clientId: process.env.KAKAO_CLIENT_ID || "",
			clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
		}),
	],
	callbacks: {
		async jwt({ token, user, account }: any) {
			// 카카오로부터 반환된 사용자 정보를 토큰에 저장
			if (account && user) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }: any) {
			// 토큰의 정보를 세션에 저장
			session.accessToken = token.accessToken;
			return session;
		},
	},
	pages: { signIn: "/users/login" },
};

export default NextAuth(authOptions);
