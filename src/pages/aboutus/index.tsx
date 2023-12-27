import ImageSlider from "@/components/aboutus/ImageSlider";
import { useRouter } from "next/router";

export default function AboutUs() {
    const router = useRouter();

    return (
        <div className="gradation h-screen relative">
            <div className="bg-cover bg-[url('/images/aboutUs.png')] absolute top-0 left-0 w-full h-full" />
            <div className="relative">
                <section className="relative overflow-hidden">
                    <img className="absolute w-[55%] left-2/4 top-5" alt="planet" src="/images/planet.png"/>
                    <div className="flex flex-col p-[30px] font-bold text-5xl text-white">
                        {["찾았다 🫣", "내가 내릴", "정거장"].map((item, index)=>{
                            return <span className="mb-3 z-50" key={index}>{item}</span>
                        })}
                    </div>
                </section>
                <section className="max-w-[600px] min-w-[375px]">
                    <ImageSlider />
                </section>
                <section>
                    <div className="fixed w-screen bottom-10 right-0">
                        <div className="relative overflow-hidden right-0 top-[330px] w-screen h-[500px] max-w-[600px] mx-auto">
                            <img className="absolute top-0 left-[-145px]" alt="earth" src="/images/earth.png"/>
                        </div>
                    </div>
                    <div className="w-[70%] mx-auto">
                        <div className="fixed bottom-10 w-[70%] max-w-[410px] flex justify-between items-center font-bold text-3xl text-white"> 
                            <button className="z-50" onClick={() => router.push("/users/login")}>로그인</button>
                            <button className="z-50" onClick={() => router.push("/main")}>둘러보기</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    )
}