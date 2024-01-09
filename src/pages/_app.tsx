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
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 호출할 것인지
                retry: 0, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
            },
        },
    });
    // const { session } = pageProps;
    const isLoading = useLoading();

    return (
        <RecoilRoot>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    {/* <SessionProvider session={session}> */}
                    <ReactQueryDevtools />
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
