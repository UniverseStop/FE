import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Authority from "@/components/manager/Authority";
import Management from "@/components/manager/Management";
import Statistics from "@/components/manager/Statistics";
import { GetCurrentUser } from "@/utils/getCurrentUser";

export default function Manager() {
    const [select, setSelect] = useState<number>(0);

    const userInfo = GetCurrentUser(); // 현재 로그인된 사용자 정보
    const isAdmin = userInfo.auth == "ADMIN" || userInfo.auth === "SUPER";
    const router = useRouter();
    useEffect(()=>{
        if (!isAdmin) router.back();
    });

    return (
        <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%" }}>
            {isAdmin ? <div>
                <section className="h-[70px] p-4 flex items-center justify-between">
                    <button onClick={()=>(router.push('/main'))} className="absolute">
                        <img className="w-[140px] h-[40px] ml-[20px]" alt="logo" src="/images/unibus_logo.png"/>
                    </button>
                    <ul className="flex items-center w-[100%] justify-center space-x-[60px]">
                        {["사용자 통계", "사용자 관리", "관리자 권한"].map((name, index) => {
                            return (
                                <li key={index} className="flex flex-col h-[54px] gap-[13px] mt-[40px]">
                                    <button onClick={()=>setSelect(index)} className={`text-[20px] ${index===select ? "text-mainColor" : "text-managerFontColor"}`}>{name}</button>
                                    {select === index ? <div className="h-[5px] w-[110px] bg-mainColor"></div> : <></>}
                                </li>
                            );
                        })}
                    </ul>
                </section>
                <section className="bg-managerGrayColor h-full">
                    {/* Statistics: 통계,  Management: 관리, Authority: 권한 */}
                    {select === 0 ? <Statistics /> : select === 1 ? <Management /> : <Authority />}
                </section>
            </div> : <></>}
        </div>
    );
}
