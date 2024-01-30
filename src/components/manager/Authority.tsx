import AdminList from "./authority/AdminList";
import SearchUser from "./authority/SearchUser";
import BlockPostList from "./authority/BlockPostList";

const Authority = () => {
    return (
        <div className="flex flex-col gap-11 items-center h-screen pt-11">
            <SearchUser />
            <AdminList />
            <BlockPostList />
        </div>
    )
}

export default Authority;