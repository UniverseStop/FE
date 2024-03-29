import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "@/components/Layout";
import { useLoading } from "@/hooks/useLoading";
import Spinner from "@/components/spinner/Spinner";
import Head from "next/head";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 호출할 것인지
                        retry: 0, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
                    },
                },
            })
    );
    const isLoading = useLoading();

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                {/* <Hydrate state={pageProps.dehydratedState}> */}
                    {/* React Query Devtools: 필요한 경우 주석 해제 후 사용 */}
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                    <Layout>
                        <Head>
                            <title>UNIBUS</title>
                        </Head>
                        {isLoading ? <Spinner /> : <Component {...pageProps} />}
                        </Layout>
                {/* </Hydrate> */}
            </RecoilRoot>
        </QueryClientProvider>
    );
}
