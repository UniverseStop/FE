import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postBlackUser, postSalvationUser } from "@/pages/api/manager";

const useManagement = (type: string) => {
    const queryClient = useQueryClient();
    const updateQueryKey = () => {
        queryClient.invalidateQueries("totalUsers");
        queryClient.invalidateQueries("blackUsers");
    };

    const [isRequest, setIsRequestSalvation] = useState<boolean>(false);
    const [userIds, setUserIds] = useState<number[]>([]);
    const mutation = useMutation(type === "black" ? postBlackUser : postSalvationUser, {
        onSuccess: () => {
            updateQueryKey();
        },
        onError: (error) => {
            alert("오류가 발생했습니다. 다시 한번 시도해주세요.");
        },
    });
    const handleClick = () => {
        setIsRequestSalvation(!isRequest);
    };
    useEffect(()=>{
        if (userIds.length > 0) {
            userIds.map((userId: number) => {
                mutation.mutate(userId); // 한명씩 구제 요청
            });
        }
    }, [userIds]);

    return [isRequest, setUserIds, handleClick];
};

export default useManagement;
