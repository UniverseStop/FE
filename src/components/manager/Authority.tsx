import AdminList from "./authority/AdminList";
import SearchUser from "./authority/SearchUser";
import BlockPostList from "./authority/BlockPostList";

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