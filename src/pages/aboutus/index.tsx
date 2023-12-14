export default function aboutUs() {
    const titles: string[] = ["찾았다 🫣", "내가 내릴", "정거장"]; // 메인 타이틀

    return (
        <div className="h-screen bg-cover bg-[url('https://github.com/UniverseStop/FE/assets/134919218/89890b25-14b1-47b9-9565-38468650a9b7')]">
            <section className="flex flex-col p-[30px] font-bold text-5xl text-white">
                {titles.map((item, index)=>{
                    return <span className="mb-3" key={index}>{item}</span>
                })}
            </section>
            <section>
                <ul>
                </ul>
            </section>
            <section className="relative top-[60%]">
                <div className="flex justify-around items-center font-bold text-3xl text-white">
                    <button>로그인</button>
                    <button>둘러보기</button>
                </div>
            </section>
        </div>
    )
}