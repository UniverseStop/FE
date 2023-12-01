import React from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { kakaoLogin } from "../api/rest";

const LoginPage = () => {
	const { data: session }: any = useSession();

	useEffect(() => {
		if (session) {
			kakaoLogin(session.accessToken);
		}
	}, [session]);

	return (
		<>
			<button type='button' onClick={() => signIn("kakao", { callbackUrl: "/" })} className='text-black flex gap-4 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center'>>
				<RiKakaoTalkFill className='w-6 h-6' />
				Sign in With Kakao
			</button>
		</>
	);
};

export default LoginPage;
