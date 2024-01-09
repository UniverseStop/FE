import Image from "next/image";
import React from "react";

function Profile({ profileImageUrl }: { profileImageUrl: string }) {
	return (
		<div className="flex flex-col items-center">
			<div className="relative w-[390px]">
				<Image alt="마이페이지_우주인복장_아이콘" width={390} height={0} src="/images/astronautCloth.png" />
				<div className="rounded-full w-[250px] h-[250px] absolute top-[7%] left-[18%] bg-slate-500">
					{profileImageUrl && (
						<Image
							className="rounded-full w-[100%] h-[100%]"
							width={200}
							height={200}
							alt="유저프로필"
							src={profileImageUrl}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
export default Profile;
