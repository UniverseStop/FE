import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ location, placeName, lat, lng }: { location: string, placeName: string, lat: number, lng: number }) => {
    return (
        <div className="flex items-center justify-center">
            <Map 
                center={{ lat: lat, lng: lng }} // 지도의 중심 좌표
                level={3} // 지도 확대 레벨
                className="w-[95%] h-72"
            >
                <MapMarker position={{ lat: lat, lng: lng }}>
                    <div className="flex flex-col justify-center text-center items-center w-[180px] min-w-max h-[50px] text-sm">
                        <span className="mx-1.5">{location}</span>
                        <span className="mx-1.5">{placeName}</span>
                    </div>
                </MapMarker>
            </Map>
        </div>
    )
}

export default KakaoMap;