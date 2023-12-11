import styles from "./aboutus.module.css";

export default function aboutUs() {

    const titles: string[] = ["찾았다 🫣", "내가 내릴", "정거장"]; // 메인 타이틀

    return (
        <div className={styles.container}>
            <section className={styles.title_section}>
                {titles.map((item, index)=>{
                    return <span className={styles.title_span} key={index}>{item}</span>
                })}
            </section>
            <section>
                <ul>
                </ul>
            </section>
            <section className={styles.button_section}>
                <div className={styles.button_div}>
                    <button className={styles.button}>로그인</button>
                    <button className={styles.button}>둘러보기</button>
                </div>
            </section>
        </div>
    )
}