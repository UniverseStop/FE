import "react-kakao-maps-sdk";

const KakaoMap = ({ location }: { location: string }) => {
    kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const map = new kakao.maps.Map(container as HTMLElement, options); // 지도 생성

        let geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성

        geocoder.addressSearch(location, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // result[0].y와 result[0].x를 'number'로 변환
                const latitude: number = Number(result[0].y);
                const longitude: number = Number(result[0].x);
            
                let coords = new kakao.maps.LatLng(latitude, longitude);
            
                // 결과값으로 받은 위치를 마커로 표시
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
            
                // 지도의 중심을 결과값으로 받은 위치로 이동
                map.setCenter(coords);
            }
        });

    });

    return (
        <div>
            <span className="pl-5">{location}</span>
            <div className="flex items-center justify-center">
                <div id="map" className="w-[95%] h-72" />
            </div>
        </div>
    )
}

export default KakaoMap;