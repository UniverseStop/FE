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
		<div className="flex flex-col justify-center">
		  <p className="text-2xl font-bold m-6 0 6 6">🗓️ 날짜 및 시간</p>
		  <Calendar showTime={true} onDateChange={setPostDateTime} />
		</div>
	);
}

export default AddDateTime;
