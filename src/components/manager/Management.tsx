import { useEffect, useState } from "react";
import { RefetchOptions, RefetchQueryFilters, useMutation, useQuery, useQueryClient } from "react-query";
import { getBlackUserList, getUserList, postBlackUser, postSalvationUser } from "@/pages/api/manager";
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
    const { data: blackUsers, refetch: blackRefetch } = useQuery("blackUsers", () => getBlackUserList(selectBlackPage));
    useEffect(()=>{
        blackRefetch({ page: selectBlackPage } as CustomRefetchOptions);
    }, [selectBlackPage]);

    // 차단될 사용자
    const [selectBlackUsers, setSelectBlackUsers] = useState<number[]>([]);
    const queryClient = useQueryClient();
    const blackMutation = useMutation(postBlackUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
            queryClient.invalidateQueries("blackUsers");
            alert("사용자 차단에 성공했습니다.");
        },
        onError: () => {
            alert("사용자 차단을 실패했습니다. 다시 한번 시도해주세요.");
        },
    });
    const handleBlack = () => {
        selectBlackUsers.map((userId: number) => {
            blackMutation.mutate(userId);
        });
    };

    // 구제될 사용자
    const [selectSalvationUsers, setSelectSalvationUsers] = useState<number[]>([]);
    const salvationMutation = useMutation(postSalvationUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
            queryClient.invalidateQueries("blackUsers");
            alert("사용자 구제를 완료했습니다.");
        },
        onError: (error) => {
            alert("사용자 구제를 실패했습니다. 다시 한번 시도해주세요.");
        },
    });
    const handleSalvation = () => {
        selectSalvationUsers.map((userId: number) => {
            salvationMutation.mutate(userId);
        });
    };
        
    return (
        <div className="flex items-center justify-center pt-5">
            <div className="flex justify-center p-3 space-x-10 bg-white min-w-[1200px] w-11/12 h-[870px] mb-5 pb-8">
                {users ? <ManagementTable users={users.content} totalPages={users.totalPages} selectPage={selectPage} setSelectPage={setSelectPage} selectBox={selectBlackUsers} setSelectBox={setSelectBlackUsers}/> : <></>}
                <section className="flex flex-col items-center justify-center space-y-2">
                    <button onClick={()=>handleBlack()}><img className="border rounded-sm" alt="clear" src="/images/move.png"/></button>
                    <button onClick={()=>handleSalvation()}><img className="border rounded-sm transform scale-x-[-1]" alt="clear" src="/images/move.png"/></button>
                </section>
                {blackUsers ? <ManagementTable users={blackUsers.content} totalPages={blackUsers.totalPages} selectPage={selectBlackPage} setSelectPage={setSelectBlackPage} selectBox={selectSalvationUsers} setSelectBox={setSelectSalvationUsers}/> : <></>}
            </div>
        </div>
    )
}

export default Management;