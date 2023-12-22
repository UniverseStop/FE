import { useQuery } from "react-query";
import { getPostItems } from "../../api/post";
import { PostPreviewType } from "@/types/postTypes";
import PostDetail from "@/components/post/PostDetail";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider() {
    const { data: posts, isLoading, isError } = useQuery(["posts"], () => getPostItems());

    // 슬라이더 설정
    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "100px",
        dots: false, // 슬라이더 아래에 도트 네비게이션 버튼 표시 여부
        infinite: true, // 무한 스크롤
        speed: 500, // 모션 시간 (얼마나 빠른속도로 넘어가는지)(1000ms = 1초) 곧, 슬라이드 사이에 넘어가는 속도
        autoplay: true, // 자동으로 넘어가기
        autoplaySpeed: 8000, // 자동으로 넘어가는 시간
        arrows: false,
    };

    return (
        <Slider {...settings} className="z-50">
            {posts && posts.map((p: PostPreviewType)=>{
                return (
                    <div className="pl-2 pr-2 pt-8" key={p.id}>
                        <PostDetail info={p} wSize="15vw" hSize="35vh"/>
                    </div>
                );
            })}
        </Slider>
    );
};