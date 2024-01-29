import ManagementInquiry from "./common/ManagementInquiry";
import useManagement from "@/hooks/useManagement";

type UseManagementReturnType = [boolean, React.Dispatch<React.SetStateAction<number[]>>, () => void];

const Management = () => {
    // 차단
    const [isRequestBlack, setBlackedUsers, handleBlack] = useManagement("black") as UseManagementReturnType;

    // 구제
    const [isRequestSalvation, setSalvationUsers, handleSalvation] = useManagement("salvation") as UseManagementReturnType;

    return (
        <div className="flex items-center justify-center pt-5">
            <div className="flex justify-center p-3 space-x-1 bg-white min-w-[1200px] w-11/12 h-[840px] mb-5 pb-8">
                <ManagementInquiry queryKey="totalUsers" isRequest={isRequestBlack} setSelectUserIds={setBlackedUsers}/>
                <section className="flex flex-col items-center justify-center space-y-1">
                    <button onClick={()=>handleBlack()}><img className="border rounded-sm" alt="clear" src="/images/move.png"/></button>
                    <button onClick={()=>handleSalvation()}><img className="border rounded-sm transform scale-x-[-1]" alt="clear" src="/images/move.png"/></button>
                </section>
                <ManagementInquiry queryKey="blackUsers" isRequest={isRequestSalvation} setSelectUserIds={setSalvationUsers}/>
            </div>
        </div>
    )
}

export default Management;