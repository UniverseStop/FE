import { CategoryType } from "@/types/postTypes";

export function getCategory(key: string): string {
    let categoryDict: CategoryType = {
        Eats: "🍰 맛집",
        Culture: "🎬 문화",
        Exercise: "🏀 운동",
        Study: "📖 스터디",
        Etc: "🎸 기타",
    };
    return categoryDict[key];
}

