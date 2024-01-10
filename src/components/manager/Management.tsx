import { useState } from "react";
import { useQuery } from "react-query";
import { getBlackUserList, getUserList } from "@/pages/api/manager";
import { UserType } from "@/types/managerTypes";

const Management = () => {
    const { data: users } = useQuery("users", ()=>getUserList(0)); // 전체 사용자 조회 (차단 사용자 제외)
    console.log(users)
    const { data: blackUsers } = useQuery("blackUsers", ()=>getBlackUserList(0)); // 차단된 사용자 조회
 
    const [selectBox, setSelectBox] = useState<number[]>([]);
    const handleCheckBox = (userId: number) => {
        setSelectBox(prevSelectBox => {
            if (!prevSelectBox.includes(userId)) {
                return [...prevSelectBox, userId];
            } else {
                return prevSelectBox.filter(id => id !== userId);
            }
        });
    };

    return (
        <div className="flex items-center justify-center pt-10">
            <div className="flex justify-center p-5 space-x-10 bg-white w-[1300px] h-[600px]">
                <section className="space-y-5 border border-managerPointColor w-1/2 p-5">
                    <div>
                        <span>Nickname</span>
                        
                    </div>
                </section>
                <section className="border border-managerPointColor w-1/2 p-5">
                    냐옹
                </section>
            </div>
        </div>
    )
}

export default Management;