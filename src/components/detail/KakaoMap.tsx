import Script from "next/script";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface Position {
    latitude: number;
    longitude: number;
}

const KakaoMap = ({ latitude, longitude }: Position) => {
    const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4e5cdccf07ff90b1aaea272d387eb18b&autoload=false`;

    let location = { lat: latitude, lng: longitude };

    return (
        <div>
            <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
            <Map
                center={location}
                level={3}
                style={{ width: "560px", height: "280px" }}
                zoomable={false}
            >
                <MapMarker position={location}></MapMarker>
            </Map>
        </div>
    )
}

export default KakaoMap;