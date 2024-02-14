import { useRouter } from "next/router";
import Post from "@/components/detail/Post";
import { getBusStopDetail } from "@/pages/api/post";
import { dehydrate, QueryClient } from "react-query";

export default function Detail(props: any) {
    const data = props.dehydratedState.queries[0].state.data

    return (
        <div>
            {data && <Post props={data}/>}
        </div>
    )
}

export const getServerSideProps = async (context : any) => {
    try {
    const { id } = context.params;
    const queryClient = new QueryClient();
    await queryClient.fetchQuery(["post", id], () => getBusStopDetail(id));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
} catch(error) {
    console.log(error)
}
};

// export const getServerSideProps: GetServerSideProps = async (context): Promise<GetServerSidePropsResult<{ [key: string]: any; }>> => {
//     console.log("context", context)
//     try {

//         const queryClient = new QueryClient();
//         await queryClient.prefetchQuery("post",()=>getBusStopDetail(id));
//         return {
//             props: {
//                 dehydratedProps: dehydrate(queryClient)
//             },
//         };
//     } catch (error) {
//         console.log(error);
//         return {
//             props: {},
//         };
//     }
// };