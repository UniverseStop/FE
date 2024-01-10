import React, { useEffect, useState } from "react";
import Calendar from "../calendar/Calendar";

function AddDateTime({
	postDateTime,
	setPostDateTime,
}: {
	postDateTime: Date;
	setPostDateTime: (postDateTime: Date) => void;
}) {
	return (
		<section className="flex flex-col justify-center">
			<div className=" w-[580px]">
				<p className="text-2xl font-bold m-6 0 6 6">🗓️ 날짜 및 시간</p>
				<section className="place-items-center">
					<Calendar showTime={true} onDateChange={setPostDateTime} />
				</section>
			</div>
		</section>
	);
}

export default AddDateTime;
