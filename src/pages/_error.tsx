import Image from "next/image";
import { useRouter } from "next/router";

export default function Error() {
    const router = useRouter();
    // 이전 페이지로 돌아가기
    const goBack = () => {
        router.back();
    };

    return (
        <div className="gradation">
            <div className="gradationh-screen bg-cover bg-[url('/images/error.png')]">
                <div className="lg:w-full w-full h-full">
                    <div className="xxx_imgWrap flex flex-col my-auto items-center mx-3">
                        <div className="flex h-screen">
                            <article className="m-auto flex flex-col items-center">
                                <div className="flex flex-col">
                                    <span className="text-5xl font-bold text-white">앗! 죄송합니다.</span>
                                    <span className="text-3xl font-bold text-white">다시 한번 시도해주세요.</span>
                                </div>
                                <div>
                                    <Image alt="ghost" width={285} height={300} src="/images/ghost.png"/>
                                </div>
                                <div>
                                    <button onClick={goBack} className="flex justify-around items-center h-[60px] w-[270px] text-2xl px-4 py-2 rounded-3xl bg-white ">
                                        {/*<Image alt="reset" width={27} height={27} src="/images/reset.svg"/>*/}
                                        <span>한번 다시 해볼까요?</span>
                                    </button>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
