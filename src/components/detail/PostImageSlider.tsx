import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css"

const PostImageSlider = ({imageUrlList, selectImg, setSelectImg}: {imageUrlList: string[], selectImg: boolean, setSelectImg: (selectImg: boolean)=> void}) => {
    // 이미지 슬라이더
    const [sliderRef] = useKeenSlider({
        loop: true,
    });

    return (
        <div ref={sliderRef} className={`keen-slider ${selectImg ? "max-w-[600px] bg-contain" : ""}`}>
            {imageUrlList && imageUrlList.map((url: string, index: number)=>{
                return (
                <button key={index} onClick={()=>setSelectImg(!selectImg)} >
                    <img className={`keen-slider__slide ${selectImg ? "object-contain w-full h-full" : "w-full h-96 object-cover"}`} alt="image" src={url} />
                </button>);
            })}
        </div>
    )
}

export default PostImageSlider;