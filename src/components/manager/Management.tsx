import { useEffect, useState } from "react";
import { RefetchOptions, RefetchQueryFilters, useQuery } from "react-query";
import { getBlackUserList, getUserList } from "@/pages/api/manager";
import ManagementTable from "./common/ManagementTable";

interface CustomRefetchOptions extends RefetchOptions, RefetchQueryFilters<number> {
    page?: number;
}

const Management = () => {
    // 전체 사용자 조회 및 페이지네이션
    const [selectPage, setSelectPage] = useState(0);
    const { data: users, refetch: userRefetch } = useQuery("users", () => getUserList(selectPage));
    useEffect(()=>{
        userRefetch({ page: selectPage } as CustomRefetchOptions);
    }, [selectPage]);
 
    // 차단된 유저 목록 조회 및 페이지네이션
    const [selectBlackPage, setSelectBlackPage] = useState(0);
    const { data: blackUsers, refetch: blackRefetch } = useQuery("blackUsers", () => getBlackUserList(0));
    useEffect(()=>{
        blackRefetch({ page: selectBlackPage } as CustomRefetchOptions);
    }, [selectBlackPage]);

    // 사용자 차단
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
        <div className="flex items-center justify-center pt-5">
            <div className="flex justify-center p-3 space-x-10 bg-white min-w-[1200px] w-11/12 h-[870px] mb-5 pb-8">
                {users ? <ManagementTable users={users.content} totalPages={users.totalPages} selectPage={selectPage} setSelectPage={setSelectPage}/> : <></>}
                <section className="flex flex-col items-center justify-center space-y-2">
                    <button><img className="border rounded-sm" alt="clear" src="/images/move.png"/></button>
                    <button><img className="border rounded-sm transform scale-x-[-1]" alt="clear" src="/images/move.png"/></button>
                </section>
                {blackUsers ? <ManagementTable users={blackUsers.content} totalPages={blackUsers.totalPages} selectPage={selectBlackPage} setSelectPage={setSelectBlackPage}/> : <></>}
            </div>
        </div>
    )
}

export default Management;