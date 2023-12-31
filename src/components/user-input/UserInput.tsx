import { postConfirmNickname } from "@/pages/api/user";
import React, { useState } from "react";
import { useMutation } from "react-query";

function UserInput({
	title,
	placeholder,
	isShowDuplicateCheckBtn,
	nickname,
	setNickname,
	age,
	setAge,
	gender,
	setGender,
	isValidatedNickname,
	setIsValidatedNickname,
	setIsConfirmNicknameSuccess,
}: {
	title: string;
	placeholder: string;
	isShowDuplicateCheckBtn: boolean;
	nickname?: string;
	setNickname?: (nickname: string) => void;
	age?: string;
	setAge?: (age: string) => void;
	gender?: string;
	setGender?: (gender: string) => void;
	isValidatedNickname?: boolean;
	setIsValidatedNickname?: (isValidatedNickname: boolean) => void;
	setIsConfirmNicknameSuccess?: (isConfirmNicknameSuccess: boolean) => void;
}) {
	/** title '나이'일 경우 : 10부터 99까지의 2자릿수 */
	const validateAge = (inputValue: string) => {
		const ageRegex = /^(1\d|2[0-9])$/;
		if (title === "나이" && !ageRegex.test(inputValue)) {
			if (setAge) setAge(inputValue.replace(/[^1-9]/g, "").substring(0, 2));
		} else {
			if (setAge) setAge(inputValue);
		}
	};

	/** title '닉네임'일 경우 : 영어대소문자,한글,숫자 가능 2자리이상 10자리이하 */
	const [errorMsg, setErrorMsg] = useState("");
	const validateNickname = (inputValue: string) => {
		if (inputValue === "") {
			setErrorMsg("");
		} else if (inputValue.length < 2 || inputValue.length > 10) {
			setErrorMsg("2자 이상 10자 이하로 입력해주세요.");
			if (setIsValidatedNickname) setIsValidatedNickname(false);
		} else {
			const nicknameRegex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/;
			const hasOnlyConsonantsOrVowels = /^[ㄱ-ㅎㅏ-ㅣ]+$/;

			if (title === "닉네임" && (!nicknameRegex.test(inputValue) || hasOnlyConsonantsOrVowels.test(inputValue))) {
				setErrorMsg("영어 대소문자, 한글, 숫자만 사용가능합니다.");
				if (setIsValidatedNickname) setIsValidatedNickname(false);
			} else {
				setErrorMsg("");
				if (setIsValidatedNickname) setIsValidatedNickname(true);
			}
		}
		if (setNickname) {
			setNickname(inputValue);
		}
	};

	/** title '닉네임'일 경우 : 중복체크 버튼눌렀을때 */
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

	const handleDuplicateCheck = () => {
		if (nickname) postConfirmNicknameMutation.mutate(nickname);
	};

	/** title '성별'일 경우 : setGender이 있을 경우 진행 (타입에러방지)*/
	const validateGender = (inputValue: string) => {
		if (setGender) setGender(inputValue);
	};

	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">{title}</p>
			<div className="flex gap-5 ml-6">
				{title === "닉네임" ? (
					/* 닉네임일 경우 */
					<div className="w-1/2">
						<input
							type="text"
							value={nickname}
							onChange={(e) => validateNickname(e.target.value)}
							placeholder={placeholder}
							className="focus:outline-none pl-4 border border-mainColor rounded-2xl w-full h-14"
						/>
						<p className={`pt-2 pl-1 text-sm text-red ${textBlue ? 'text-blue' : ''}`}>{errorMsg}</p>
					</div>
				) : title === "나이" ? (
					/* 나이일 경우 */
					<input
						type="text"
						value={age}
						onChange={(e) => validateAge(e.target.value)}
						placeholder={placeholder}
						className="focus:outline-none pl-4 border border-mainColor rounded-2xl w-1/2 h-14"
					/>
				) : title === "성별" ? (
					/* 성별일 경우 */
					<div className="p-4 4 4 4 border border-mainColor rounded-2xl w-1/2 h-14">
						<select
							className="w-full focus:outline-none"
							value={gender}
							onChange={(e) => validateGender(e.target.value)}>
							<option value="남">남</option>
							<option value="여">여</option>
						</select>
					</div>
				) : null}

				{isShowDuplicateCheckBtn ? (
					/** 조건부렌더링 : 닉네임의 경우 - 중복확인버튼있음 */
					<button
						onClick={handleDuplicateCheck}
						type="button"
						className="cursor w-1/5 h-14 rounded-2xl bg-mainColor text-white">
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
