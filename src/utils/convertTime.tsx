
export function convertTime(time: string): string {
    if (time === null || time === undefined || time.trim() === "") return "";

    // time: 2024-01-09T16:33:08.41451
    let temp = time.split("T");  // 0: 2024-01-09, 1: 16:33:08.41451
    let result = temp[0].replace("-", "년 ").replace("-", "월 ") + "일";
    return result;
}