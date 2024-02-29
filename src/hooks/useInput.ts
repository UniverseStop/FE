import { useState } from "react";

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const useInput = (initialValue?: string) => {
    const [value, setValue] = useState<string>(initialValue || "");

    const handler = (e: ChangeEvent) => {
        setValue(e.target.value);
    };

    const resetValue = () => {
        setValue("");
    };

    // 값, 값 업데이트 함수, 값 초기화 함수
    return [value, handler, resetValue] as const;
};

export default useInput;
