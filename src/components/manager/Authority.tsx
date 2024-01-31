import AuthorityAdminList from "./common/AuthorityAdminList";
import AuthoritySearchUser from "./common/AuthoritySearchUser";
import AuthorityBlockPostList from "./common/AuthorityBlockPostList";

const Authority = () => {
    return (
        <div className="flex flex-col gap-11 items-center h-full pt-11 pb-[200px]">
            <AuthoritySearchUser />
            <AuthorityAdminList />
            <AuthorityBlockPostList />
        </div>
    )
}

export default Authority;