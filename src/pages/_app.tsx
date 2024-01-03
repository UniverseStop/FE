import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/KakaoContext";
import { useLoading } from "@/hooks/useLoading";
import Spinner from "@/components/spinner/Spinner";

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();
    // const { session } = pageProps;
    const isLoading = useLoading();

    return (
        <RecoilRoot>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    {/* <SessionProvider session={session}> */}
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Layout>
                        {isLoading ? <Spinner /> : null}
                        <Component {...pageProps} />
                    </Layout>
                    {/* </SessionProvider> */}
                </QueryClientProvider>
            </AuthProvider>
        </RecoilRoot>
    );
}
