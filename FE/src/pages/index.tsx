import Image from "next/image";
import { Inter } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const { data, status } = useSession();

	console.log(data);
	console.log(status);
	console.log(authOptions.session);

	return (
		<div>
			<div>은지 바보</div>

			{status === "authenticated" ? (
				<button type='button' onClick={() => signOut()}>
					로그아웃
				</button>
			) : null}
		</div>
	);
}
