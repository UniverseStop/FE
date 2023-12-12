import Image from "next/image";

export default function Error() {
    return (
        <div className="h-screen bg-cover bg-[url('https://github.com/UniverseStop/FE/assets/134919218/1ad80947-9d23-4f5a-b6a8-a1d9a18508ea')]">
             <section className="flex flex-col justify-around items-center pt-48">
                <span className="text-5xl font-bold text-white">앗! 죄송합니다.</span>
                <span className="text-3xl font-bold text-white">다시 한번 시도해주세요.</span>
            </section>
            <section className="flex justify-around items-center pt-72">
                <button className="flex justify-around items-center h-[60px] w-[270px] text-2xl px-4 py-2 rounded-3xl bg-white">
                    <Image alt="reset_icon" width={27} height={27} src="https://github.com/UniverseStop/FE/assets/134919218/0c472e7c-a2d9-4968-a8bd-649a87a66d5c"/>
                    <span>한번 다시 해볼까요?</span>
                </button>
            </section>
        </div>
    );
}
