import { filterType } from "@/types/atomsTypes";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({});

export const filterState = atom<filterType>({
    key: "filterState",
    default: {
        titleOrContent: "",
        endDate: "날짜",
        location: "지역",
        interest: "",
    },
    effects_UNSTABLE: [persistAtom],
});
