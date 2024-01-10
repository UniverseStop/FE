import Authority from "@/components/admin/Authority";
import Management from "@/components/admin/Management";
import Statistics from "@/components/admin/Statistics";
import { useState } from "react";

export default function Admin() {
    const [select, setSelect] = useState<number>();

    return (
        <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%"}}>
            <section className="h-[70px] p-4 flex items-center justify-between">
                <button>
                    <img className="w-[120px] h-[40px]" alt="logo" src="/images/logo.png"/>
                </button>
                <ul className="flex items-center w-[100%] justify-center space-x-[60px]">
                    {["사용자 통계", "사용자 관리", "관리자 권한"].map((name, index) => {
                        return (
                            <li key={index} className="flex flex-col">
                                <button onClick={()=>setSelect(index)} className={`text-[20px] ${index===select ? "text-mainColor" : "text-fontColor"}`}>{name}</button>
                                {select === index ? <div className="h-[5px] w-[110px] bg-mainColor"></div> : <></>}
                            </li>
                        );
                    })}
                </ul>
            </section>
            <section>
                {/* Statistics: 통계,  Management: 관리, Authority: 권한 */}
                {select === 0 ? <Statistics /> : select === 1 ? <Management /> : <Authority />}
            </section>
        </div>
    )
}