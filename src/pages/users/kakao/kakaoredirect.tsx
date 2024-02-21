import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { decode } from "js-base64";
import { getKakaoLogin } from "@/pages/api/rest";
import { useRecoilState } from "recoil";
import { currentUser } from "@/recoil/atoms/currentUser";
import { blackUser } from "@/recoil/atoms/blackUser";
import { getCookie } from "@/utils/tokenUtils";

const KakaoRedirect = () => {
    // 위쪽 코드 제거 필요
    const router = useRouter();
    const { code }: any = router.query;

	// 로그인 시도
	const [userState, setUserState] = useRecoilState(currentUser); // 리코일에 현재 로그인된 사용자 정보 저장
	const [blackUserState, setBlackUserState] = useRecoilState(blackUser); // 리코일에 현재 로그인된 사용자 정보 저장
	const loginMutation = useMutation(getKakaoLogin, {
		onSuccess: (data) => {
			if (data && data.error && data.error.status === 401) {
				// 차단된 사용자
				setBlackUserState(data.data);
				router.push("/users/login");
			} else { // 일반 사용자
				const token = getCookie("access_Token");
				if (token) {
					const payload = token.split('.')[1];
					const decodedPayload = decode(payload);
					const payloadObject = JSON.parse(decodedPayload);
					setUserState({ isLoggedIn: true, ...payloadObject});

					// 처음 로그인한 사용자
					if (!payloadObject.age) router.push("/userinfo-setting");
					else router.push("/main");
				}
			}
		},
		onError: () => {
			alert("로그인이 실패했습니다. 다시 시도해주세요.")
			router.push("/users/login");
		},
	});

    useEffect(() => {
        if (code) {
            loginMutation.mutate(code);
        }
    }, [code]);

    if (!code) {
        return <div>Loading...</div>;
    }

    return <div />;
};

export default KakaoRedirect;
