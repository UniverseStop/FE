export interface LayoutProps {
    children: ReactNode;
}

interface PostPreviewType {
    age: string,
    category: string,
    createdAt: string,
    endDate: string,
    gender: string,
    id: number,
    imageUrlList: string[],
    location: string,
    nickname: string,
    profileImageUrl: string,
    title: string,
    userId: number,
    views: number,
}