import { getUserList } from "@/pages/api/admin";
import { useQuery } from "react-query";

const Management = () => {
    const { data: users, error } = useQuery("users", getUserList, {
        // 다양한 옵션 설정 가능
      });
      
      if (error) {
        console.error('Error fetching users:', error);
        // 에러 처리 로직 추가
      }

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