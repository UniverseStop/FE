import { getBlackUserList, getUserList } from "@/pages/api/manager";
import { useEffect, useState } from "react";
import { RefetchOptions, RefetchQueryFilters, useQuery } from "react-query";
import ManagementTable from "./ManagementTable";

export interface CustomRefetchOptions extends RefetchOptions, RefetchQueryFilters<number> {
    page?: number;
}

const ManagementInquiry = ({queryKey, isRequest, setSelectUserIds}: {queryKey: string, isRequest: boolean, setSelectUserIds: (userId: number[])=>void}) => {
    // 전체 사용자 조회
    const [pageNumber, setPageNumber] = useState(0);
    const { data, refetch } = useQuery(queryKey, () => queryKey === "totalUsers" ? getUserList(pageNumber) : getBlackUserList(pageNumber));
    useEffect(()=>{
        refetch({ page: pageNumber } as CustomRefetchOptions);
    }, [pageNumber]);

    // 체크박스가 선택된 유저들 ID 저장
    const [selectBox, setSelectBox] = useState<number[]>([]);
    
    // 서버에 요청 보내기 전 선택된 유저 정보 부모에 저장
    useEffect(()=>{
        setSelectUserIds(selectBox);
    }, [isRequest]);

    return (
        <div>
            {data && <ManagementTable users={data.content} totalPages={data.totalPages} selectPage={pageNumber} setSelectPage={setPageNumber} selectBox={selectBox} setSelectBox={setSelectBox}/>}
        </div>
    )
}

export default ManagementInquiry;