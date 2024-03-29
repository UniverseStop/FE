import { postConfirmNickname } from "@/pages/api/user";
import React, { useRef, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import Select from "react-select";

function UserInput({
	title,
	placeholder,
	isShowDuplicateCheckBtn,
	setChangeNickname,
	age,
	setAge,
	gender,
	setGender,
	setIsValidatedNickname,
	setIsConfirmNicknameSuccess,
}: {
	title: string;
	placeholder: string;
	isShowDuplicateCheckBtn: boolean;
	setChangeNickname?: (nickname: string) => void;
	age?: string;
	setAge?: (age: string) => void;
	gender?: string;
	setGender?: (gender: string) => void;
	setIsValidatedNickname?: (isValidatedNickname: boolean) => void;
	setIsConfirmNicknameSuccess?: (isConfirmNicknameSuccess: boolean) => void;
}) {
	const [nickname , setNickname] = useState<string>("")
	const [ValidatedNickname, setValidatedNickname] = useState<boolean>(false)

	/** title '나이'일 경우 : 10부터 99까지의 2자릿수 */
	const validateAge = (inputValue: string) => {
		const ageRegex = /^(1\d|2[0-9])$/;
		if (title === "나이" && !ageRegex.test(inputValue)) {
			if (setAge) setAge(inputValue.replace(/[^1-9]/g, "").substring(0, 2));
		} else {
			if (setAge) setAge(inputValue);
		}
	};

	/** title '닉네임'일 경우 : 영어대소문자,한글,숫자 가능 2자리이상 7자리이하 */
	const [errorMsg, setErrorMsg] = useState("");
	const validateNickname = (inputValue: string) => {
  	  if (inputValue === "") {
        setErrorMsg("");
        setValidatedNickname(false);
  	  } else if (inputValue.length < 2 || inputValue.length > 7) {
      	  setErrorMsg("2자 이상 7자 이하로 입력해주세요.");
		setValidatedNickname(false);
    	} else {
       	 const nicknameRegex = /^[a-zA-Z0-9가-힣]*$/;
       	 const hasOnlyConsonantsOrVowels = /^[ㄱ-ㅎㅏ-ㅣ]+$/;
        	if (title === "닉네임" && (!nicknameRegex.test(inputValue) || hasOnlyConsonantsOrVowels.test(inputValue))) {
           	 setErrorMsg("영어 대소문자, 한글, 숫자만 사용가능하며, 중간에 자음이나 모음만 사용할 수 없습니다.");
			 setValidatedNickname(false);
      	  } else {
       	     setErrorMsg("");
       	     setValidatedNickname(true);
       	 }
    	}
    	if (setNickname) {
    	    setNickname(inputValue);
    	}
	};

	/** title '닉네임'일 경우 : 통신로직 */
	const [textBlue, setTextBlue] = useState(false);
	const postConfirmNicknameMutation = useMutation(postConfirmNickname, {
		onSuccess: (data) => {
			if (!data.data.success) {
				setErrorMsg("중복된 닉네임입니다.");
				setTextBlue(false);
				if (setIsConfirmNicknameSuccess) setIsConfirmNicknameSuccess(false);
			} else {
				setTextBlue(true);
				setErrorMsg("사용가능한 닉네임입니다.");
				if (setIsConfirmNicknameSuccess) setIsConfirmNicknameSuccess(true);
			}
		},
		onError: (error) => {
			console.error("중복 확인 에러:", error);
			setTextBlue(false);
			setErrorMsg("중복 확인 중 오류가 발생했습니다.");
			if (setIsConfirmNicknameSuccess) setIsConfirmNicknameSuccess(false);
		},
	});

	// 중복체크 버튼 눌렀을때 함수
	const handleDuplicateCheck = () => {
		if (nickname && errorMsg == "") postConfirmNicknameMutation.mutate(nickname);
		else alert("닉네임을 다시한번 확인 후 중복확인을 해주세요")
	};

	/** title '성별'일 경우 : setGender이 있을 경우 진행 (타입에러방지)*/
	const validateGender = (inputValue: string) => {
		if (inputValue && setGender) setGender(inputValue);
	};

	const customStyles = {
        control: (base: any) => ({
			...base,
			width: "47vw",
			maxWidth: "285px",
			height: "56px",
			paddingLeft: "5px",
			border: "1px solid #BC8E8E",
			borderRadius: "1rem",
        }),
    };

	let isSuccess = false;
	if(errorMsg == "사용가능한 닉네임입니다.") {
		isSuccess = true;
	}

	useEffect(()=>{
		if(setChangeNickname)
		setChangeNickname(nickname)
		if(setIsValidatedNickname)
		setIsValidatedNickname(true)
	},[isSuccess])

	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">{title}</p>
			<div className="flex gap-5 ml-6">
				{title === "닉네임" ? (
					<div className="w-1/2">
						<input type="text" value={nickname}
							 onChange={(e)=>validateNickname(e.target.value)} placeholder={placeholder}
							className="focus:outline-none pl-4 border border-mainColor rounded-2xl w-full h-14" />
						 <p className={`pt-2 pl-1 text-sm ${textBlue ? 'text-blue' : 'text-red'}`}>{errorMsg}</p>
					</div>
				) : title === "나이" ? (
					<input type="text" value={age} onChange={(e) => validateAge(e.target.value)} placeholder={placeholder}
						className="focus:outline-none pl-4 border border-mainColor rounded-2xl w-1/2 h-14" />
				) : title === "성별" ? (
					<div>
						<Select
							options={[{value: "남", label: "남"}, {value: "여", label: "여"},]}
							onChange={(e)=>{e && validateGender(e.value)}}
							value={{value: "남", label: "남"}}
							styles={customStyles}
							/>
					</div>

				) : null}

				{isShowDuplicateCheckBtn ? (
					/** 조건부렌더링 : 닉네임의 경우 - 중복확인버튼있음 */
					<button onClick={handleDuplicateCheck} type="button" className="cursor w-1/5 h-14 rounded-2xl bg-mainColor text-white">
						중복 확인
					</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default UserInput;
