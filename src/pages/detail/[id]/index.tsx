import { useRouter } from "next/router";
import Post from "@/components/detail/Post";

export default function Detail() {
    const router = useRouter();
    const { query } = router; 

    return (
        <div className="fle">
            {query && query.id && <Post postId={Number(query.id)}/>}
        </div>
    )
}