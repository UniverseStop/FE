export const formatTime = (dateString: string) => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    if (timeDifference < 60 * 60 * 1000) {
        const minutesAgo = Math.floor(timeDifference / (60 * 1000));
        return `${minutesAgo}분 전`;
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
        const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
        return `${hoursAgo}시간 전`;
    } else {
        const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        return `${daysAgo}일 전`;
    }
};