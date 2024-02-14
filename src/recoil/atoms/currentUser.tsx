import { CurrentUserType } from "@/types/atomsTypes";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
});

export const currentUser  = atom<CurrentUserType>({
    key: "currentUser",
    default: {
        isLoggedIn: false,
        userId: "",
        nickname: "",
        age: "",
        auth: "",
        interest: "",
        profileImageUrl: "",
    },
    effects_UNSTABLE: [persistAtom],
})