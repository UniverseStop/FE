import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID || "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, account }: { token: any; account: any }) {
            if (account && account.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
};

export default NextAuth(authOptions);
