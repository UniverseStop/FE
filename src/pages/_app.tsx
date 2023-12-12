import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();
    const { session } = pageProps;

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <SessionProvider session={session}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SessionProvider>
            </QueryClientProvider>
        </RecoilRoot>
    );
}