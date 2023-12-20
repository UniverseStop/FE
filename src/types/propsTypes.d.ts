// Layout
export interface LayoutProps {
    children: ReactNode;
}

// AuthContext
interface AuthContextType {
    token: string | null;
    updateToken: (newToken: string) => void;
    isLoggedIn: boolean;
    userInfo: any;
    logout: () => void;
}
