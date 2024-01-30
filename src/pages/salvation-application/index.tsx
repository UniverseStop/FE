import { blackUser } from "@/recoil/atoms/blackUser";
import { useMutation } from "react-query";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { postSalvationApplication } from "../api/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SalvationApplication() {
    const blackUserNickname = useRecoilValue(blackUser);
    const router = useRouter();

    useEffect(()=>{
        if (blackUserNickname === "") router.push("/");
    })

    // 구체 신청 사유 작성
    const [userInput, setUserInput] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setUserInput(e.target.value);
	};

    const reset = useResetRecoilState(blackUser);
    const salvationMutation = useMutation(postSalvationApplication, {
        onSuccess: () => {
            alert("구제신청이 접수되었습니다.");
            reset();
            router.push("/");
        },
        onError: () => {
            alert("오류가 발생하였습니다.");
        },
    });

    const handleClickSalvation = () => {
        if (userInput.length > 0) {
            const formdata = new FormData();
            formdata.append("data", new Blob([JSON.stringify({title: blackUserNickname, content: userInput,})], { type: "application/json" }));
            salvationMutation.mutate(formdata);
        } else {
            alert("사유를 입력해주세요.");
        }
    };

    const handleClickSalvationCancel = () => {
        reset();
        router.push("/");
    };

    return (
        <div>
            {blackUserNickname ? 
            <div className="flex flex-col p-12 space-y-10 items-center justify-center">
                <div className="space-y-10 w-full">
                    <div className="text-xl"><span className="font-bold">{blackUserNickname}</span> 님은 차단된 사용자 입니다.</div>
                    <div className="flex flex-col space-y-2 w-full">
                        <span className="font-bold text-xl">구제 사유</span>
                        <textarea value={userInput} onChange={handleChange} className="p-2 resize-none border border-mainColor rounded-2xl w-full h-80"/>
                    </div>
                </div>
                <div className="space-x-3">
                    <button onClick={handleClickSalvationCancel} className="w-40 h-12 rounded-2xl border text-mainColor text-2xl font-bold">취소하기</button>
                    <button onClick={handleClickSalvation} className="w-40 h-12 rounded-2xl bg-mainColor text-white text-2xl font-bold">신청하기</button>
                </div>
            </div> 
            : <></>}
        </div>
    );
}
