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
			authorization: {
				params: {
					prompt: "select_account",
					loginHint: "${HINT}",
				},
			},
		}),
	],
	// callbacks: {
	// 	async jwt({ token, user, account }: any) {
	// 		if (account && user) {
	// 			token.accessToken = account.access_token;
	// 		}
	// 		return token;
	// 	},
	// 	async session({ session, token }: any) {
	// 		session.accessToken = token.accessToken;
	// 		return session;
	// 	},
	// },
	pages: { signIn: "/users/login" },
};

export default NextAuth(authOptions);
