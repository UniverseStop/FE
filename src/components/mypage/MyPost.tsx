import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function MyPost() {
	const [ref] = useKeenSlider<HTMLDivElement>({
		slides: {
			perView: 3,
			spacing: 10,
		},
	});

	return (
		<div>
			<p className="text-white font-bold text-3xl pt-[50px] pl-6">내가 쓴 글</p>
			<div ref={ref} className="keen-slider p-5">
				<div className="keen-slider__slide number-slide1">1</div>
				<div className="keen-slider__slide number-slide2">2</div>
				<div className="keen-slider__slide number-slide3">3</div>
				<div className="keen-slider__slide number-slide4">4</div>
				<div className="keen-slider__slide number-slide5">5</div>
				<div className="keen-slider__slide number-slide6">6</div>
			</div>
		</div>
	);
}

export default MyPost;