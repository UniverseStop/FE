import AdminList from "./common/AuthorityAdminList";
import SearchUser from "./common/AuthoritySearchUser";
import BlockPostList from "./common/AuthorityBlockPostList";

const Authority = () => {
    return (
        <div className="flex flex-col gap-11 items-center h-full pt-11 pb-[200px]">
            <SearchUser />
            <AdminList />
            <BlockPostList />
        </div>
    )
}

export default Authority;