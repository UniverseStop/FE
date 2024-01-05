export function getDateFormat(inputDate: Date): string {
    const originalDate = new Date(inputDate);

    const year = originalDate.getFullYear();
    const month = originalDate.getMonth() + 1;
    const day = originalDate.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][originalDate.getDay()];

    const formattedDate = `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")} ${dayOfWeek}`;

    return formattedDate;
}

export function getDateTimeFormat(inputDate: Date): string {
    const originalDate = new Date(inputDate);

    const year = originalDate.getFullYear();
    const month = originalDate.getMonth() + 1;
    const day = originalDate.getDate();
    const hours = originalDate.getHours();
    const minutes = originalDate.getMinutes();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][originalDate.getDay()];

    const formattedDate = `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(
        2,
        "0"
    )} ${dayOfWeek} ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    return formattedDate;
}
