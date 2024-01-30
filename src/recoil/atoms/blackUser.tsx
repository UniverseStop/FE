import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
});

export const blackUser  = atom({
    key: "blackUser",
    default: "",
    effects_UNSTABLE: [persistAtom],
})