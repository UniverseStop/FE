import Image from "next/image";
import React from "react";


function Profile() {
	return (
		<div className="flex flex-col items-center">
			<div className="relative w-[390px]">
				<Image  alt="마이페이지_우주인복장_아이콘" width={390} height={0} src="/images/astronautCloth.png" />
				<div className="rounded-full w-[250px] h-[250px] absolute top-[7%] left-[18%] bg-slate-500">
					<Image
                        className="rounded-full w-[100%] h-[100%]"
						width={200}
						height={200}
                        alt="유저프로필"
						src="https://github.com/UniverseStop/FE/assets/130561236/8048e975-32ab-4c93-89db-d8b48a2c155b"
					/>
				</div>
			</div>
		</div>
	);
}
export default Profile;
