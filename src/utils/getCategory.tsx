import { CategoryType } from "@/types/postTypes";

export function getCategory(key: string | null): string | undefined {
    if (key === null) {
        // key가 null인 경우에 대한 처리
        return undefined;
    }

    let categoryDict: CategoryType = {
        Eats: "🍰 맛집",
        Culture: "🎬 문화",
        Exercise: "🏀 운동",
        Study: "📖 스터디",
        Etc: "🎸 기타",
    };
    return categoryDict[key];
}