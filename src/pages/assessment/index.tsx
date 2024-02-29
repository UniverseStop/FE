import { useState } from "react";
import { ConfirmPermissions } from "@/utils/confirmPermissions";

export default function Assessment() {
    ConfirmPermissions(); // 로그인 후 이용가능한 페이지

    const nums = new Array(6).fill(0).map((_, index) => index); // 0~5로 이루어진  숫자 배열 생성

    const [select, setSelect] = useState<number|null>(); // 선택한 번호
    const handleClictSelect = (n: number) => {
        if(select === n) setSelect(null); // 똑같은 버튼 선택하면 취소
        else setSelect(n); // 다른 버튼 선택하면 변경
    };  
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <span className="text-2xl font-bold mb-4">이번 만남을 평가해주세요.</span>
            <ul className="flex text-center items-center space-x-8 mt-14">
                {nums.map((n, index) => (
                    <button onClick={() => handleClictSelect(n)} key={index} className={`flex items-center justify-center w-16 h-16 border rounded-full border-mainColor text-xl font-bold ${n === select?"bg-mainColor text-white":""}`}>{n}</button>
                ))}
            </ul>
            <button className="w-32 h-9 rounded-3xl text-xl text-white bg-mainColor mt-16">완료</button>
        </div> 
    )
}