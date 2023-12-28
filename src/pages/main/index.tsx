import React from "react";
import styles from "./main.module.css";

const mainPage = () => {
    const a = [...new Array(20)].map((_, i) => i + 1);

    return (
        <>
            <div className="flex flex-row">
                <img
                    className="mr-auto mt-[30px] ml-[30px]"
                    src="https://i.ibb.co/LY7XF2w/Group-172.png"
                    alt="로고"
                ></img>
                <img
                    className="h-[47px] mt-[33px] mr-[30px]"
                    src="https://github.com/tph7897/tph7897/assets/132332533/7a3eed66-2a45-40c4-ad0c-ee1c671601fc"
                    alt="검색버튼"
                ></img>
            </div>
            <div className={styles.division_line}></div>
            <div className="w-full">
                <button className={styles.filter_button}>날짜</button>
                <button className={styles.filter_button}>지역</button>
            </div>
            <div className="w-full">
                <button className={styles.category_button}>🍰 맛집</button>
                <button className={styles.category_button}>🎬 문화</button>
                <button className={styles.category_button}>🏀 운동</button>
                <button className={styles.category_button}>📖 스터디</button>
                <button className={styles.category_button}>🎸 기타</button>
            </div>
            <div className="flex flex-wrap">
                {a.map((i) => (
                    <div key={i} className={styles.post_box}>
                        {i}
                    </div>
                ))}
            </div>
        </>
    );
};

export default mainPage;
