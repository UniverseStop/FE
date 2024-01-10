import { getUserList } from "@/pages/api/manager";
import { useQuery } from "react-query";

const Management = () => {
    const { data: users } = useQuery("users", getUserList);
    console.log("users", users)
     

    return (
        <div className="flex items-center justify-center pt-10">
            <div className="bg-white w-[1150px] h-[550px]">
                <section></section>
                <section></section>
            </div>
        </div>
    )
}

export default Management;