import { useRouter } from "next/router";
import Post from "@/components/detail/Post";
import { getBusStopDetail } from "@/pages/api/post";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { PostDetailType } from "@/types/postTypes";
import Head from "next/head";


export default function Detail(props: any) {
    const router = useRouter();
    const postId = router.query.id;
    const { data : post } = useQuery<PostDetailType>("post", () => getBusStopDetail(Number(postId)));
    let metaData = props.dehydratedState.queries[0].state.data;

    return (
        <div>
            <Head>
                <title>{`UNIBUS | ${metaData.title}`}</title>
                <meta name="description" content={metaData.content}></meta>
            </Head>
            {post &&
            <div>
                <Post post={post}/>
            </div>}
        </div>
    )
}

export const getServerSideProps = async (context: any) => {
    const { id } = context.params;
    const queryClient = new QueryClient();
    await queryClient.fetchQuery("post", () => getBusStopDetail(id));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};