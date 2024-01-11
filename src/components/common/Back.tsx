import Image from "next/image";
import { useRouter } from "next/router";

const Back = ({isBlack}: {isBlack: boolean}) => {
    const router = useRouter();
    // 이전 페이지로 돌아가기
    const goBack = () => {
        router.back();
    };

    return (
        <button onClick={goBack} className="z-[100] fixed top-10 pl-5">
                {isBlack ? 
                <Image alt="back_icon" width={20} height={20} src="/images/back.png"/>
                : <Image alt="back_icon" width={20} height={20} src="/images/backWhite.png"/>
                }
        </button>

    )
}

export default Back;