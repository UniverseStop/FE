import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getSalvationReason, getUserReport } from "@/pages/api/manager";
import { ReportType, UserReportType, UserType } from "@/types/managerTypes";
import { convertTime } from "@/utils/convertTime";
import { getGender } from "@/utils/getGender";

const ManagementModal = ({isModal, setIsModal, selectUser, setSelectUser}: {isModal: boolean, setIsModal: (isModal: boolean) => void, selectUser: UserType, setSelectUser: (selectUser: UserType) => void}) => {
    // 모달 영역 외 클릭시 닫기
    const backdropRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (event.target === backdropRef.current) {
            setIsModal(!isModal);
            setSelectUser({
                age: "",
                createdAt: "",
                lastAccessed: "",
                gender: "",
                id: 0,
                nickname: "",
                profileImageUrl: "",
                role: "",
                reportCount: 0,
                mannerTemplate: 0,
            });
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 신고된 내역 확인
    const { data: reports } = useQuery("reports", () => getUserReport(selectUser.id));

    // 신고 사유 종류
    let ReportTypeDict: ReportType = {
        SEXUAL_CONTENT: "성희롱",
        BULLYING: "폭력적 또는 괴롭힘",
        MISINFORMATION: "잘못된 정보 유포",
        SPAM: "스팸",
        OTHER: "기타",
    };

    // 신고 사유 사진 크게 보기
    const [learnMoreImage, setLearnMoreImage] = useState<string>("");

    // 구제 신청 사유 보기
    const { data: salvationReason } = useQuery("salvationReason", () => getSalvationReason(selectUser.id));

    return (
        <div ref={backdropRef} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col bg-white w-[950px] h-[540px] z-50 items-center overflow-y-auto overflow-x-hidden">
                {learnMoreImage && 
                <section onClick={()=>setLearnMoreImage("")} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <img onClick={(e) => e.stopPropagation()} alt="image" src={learnMoreImage}/>
                </section>}
                <section>
                    <table className="text-xs whitespace-no-wrap w-[950px]">
                        <thead className="bg-managerGrayColor">
                            <tr>
                                {["프로필 이미지", "닉네임", "ID", "최근 접속 일시", "나이", "성별", "온도", "신고 횟수"].map((name, index) => {
                                    return <th scope="col" className="text-center px-3 py-5" key={index}>{name}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-managerGrayColor h-[70px] text-center items-center">
                                <td className="flex h-[70px] items-center justify-center"><img className=" h-12 w-12 rounded-full" alt="profile" src={selectUser.profileImageUrl}/></td>
                                <td>{selectUser.nickname}</td>
                                <td>{selectUser.id}</td>
                                <td>{convertTime(selectUser.lastAccessed)}</td>
                                <td>{selectUser.age}</td>
                                <td>{getGender(selectUser.gender)}</td>
                                <td>{selectUser.mannerTemplate}</td>
                                <td>{selectUser.reportCount}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                {salvationReason ? 
                <section className="flex w-full h-1/5">
                    <div className="w-full  text-center items-center flex justify-between">
                        <div className="w-1/5 font-bold text-center"><span>구제 사유</span></div>
                        <div className="w-full text-center text-sm"><span>{salvationReason.content}</span></div>
                    </div>
                </section> 
                : <></>}
                {reports ? 
                <section className="h-3/5">
                    <table className="text-xs whitespace-no-wrap w-[950px] ">
                        <thead className="bg-managerGrayColor w-full">
                            <tr>
                                {["순번", "신고자 닉네임", "신고 날짜", "신고사유", "상세사유", "사진"].map((name, index) => {
                                    return <th scope="col" className="text-center px-3 py-5" key={index}>{name}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((r: UserReportType, index: number) => {
                                return (
                                    <tr className="border-b border-managerGrayColor text-center h-[70px] items-center" key={index}>
                                        <td>{index + 1}</td>
                                        <td>{r.reporter}</td>
                                        <td>{convertTime(r.createdAt)}</td>
                                        <td>{ReportTypeDict[r.report]}</td>
                                        <td>{r.reportDetail}</td>
                                        <td className="flex justify-center text-center items-center h-[70px]">
                                            <button onClick={()=>setLearnMoreImage(r.reportImages[0])}><img className="w-10 h-10 " alt="url" src={r.reportImages[0]}/></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table> 
                </section>
                : <></>}
            </div>
        </div>
    )
}

export default ManagementModal;