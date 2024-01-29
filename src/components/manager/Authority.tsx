import Image from "next/image";
import ProfileAtom from "./common/ProfileAtom";

const Authority = () => {
    return (
        <div className="flex flex-col gap-11 items-center h-screen pt-11">
            <section>
                <h1 className="text-2xl font-bold mb-2 text-black">사용자 검색</h1>
                <div className="flex gap-[210px] w-[950px] h-[75px] bg-white rounded-3xl">
                   <input type="text" placeholder="닉네임을 입력해주세요" maxLength={7} className="ml-6 mt-5 w-[600px] h-[40px] focus:outline-none" />
                    <button className="bg-mainColor w-[95px] h-[33px] rounded-3xl mt-5 text-white font-semibold">관리자 추가</button>
                </div>
            </section>
            <section className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold text-black">관리자 목록</h1>
                <div className="flex gap-[670px] items-center w-[950px] h-[75px] bg-white rounded-3xl">
                    <ProfileAtom />
                    <button className="bg-mainColor w-[95px] h-[33px] rounded-3xl text-white font-semibold">권한 삭제</button>
                </div>
                <div className="flex gap-[670px] items-center w-[950px] h-[75px] bg-white rounded-3xl">
                    <ProfileAtom />
                    <div className="ml-[30px] font-bold">SUPER</div>
                </div>
            </section>
            <section className="flex flex-col gap-5 mt-[20px]">
                <h1 className="text-2xl font-bold text-black">차단된 게시물 목록</h1>
                <div className="flex items-center w-[950px] h-[75px] bg-white rounded-3xl gap-5">
                    <button className="flex items-center gap-[100px]">
                    <ProfileAtom />
                    <div className="text-lg font-semibold">같이 클라이밍 할 사람</div>
                    <div>차단 일시 : 2023.9.11</div>
                    </button>
                    <div className="flex gap-7 ml-[170px]">
                     <button> <Image width={22} height={22} src="/images/authority-return.png" alt="되돌리기버튼"/> </button>
                     <button> <Image width={20} height={20} src="/images/authority-trash.png" alt="영구삭제버튼"/> </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Authority;