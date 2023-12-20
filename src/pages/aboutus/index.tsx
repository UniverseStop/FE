import { useQuery } from "react-query";
import { getPostItems } from "../api/post";


export default function AboutUs() {
    const { data: posts, isLoading, isError } = useQuery(["posts"], () => getPostItems());

    return (
        <div className="gradation">
            <div className="h-screen bg-cover bg-[url('/images/aboutUs.png')]">
                <section className="relative overflow-hidden">
                    <img className="absolute w-[55%] left-2/4 top-5" alt="planet" src="/images/planet.png"/>
                    <div className="flex flex-col p-[30px] font-bold text-5xl text-white">
                        {["찾았다 🫣", "내가 내릴", "정거장"].map((item, index)=>{
                            return <span className="mb-3 z-50" key={index}>{item}</span>
                        })}
                    </div>
                </section>
                    <ul>
                    </ul>
                <section className="h-[35%]">
                    <ul></ul>
                </section>
                <section className="relative overflow-hidden h-[35%]">
                    <img className="absolute w-[70%] right-2/4 top-0" alt="earth" src="/images/earth.png"/>
                    <div className="pt-36 flex justify-around items-center font-bold text-3xl text-white">
                        <button className="z-50">로그인</button>
                        <button className="z-50">둘러보기</button>
                    </div>
                </section>
            </div>
        </div>
    )
}