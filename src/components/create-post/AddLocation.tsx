import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { myPlaceType, placeType } from "@/types/postTypes";
import useInput from "@/hooks/useInput";

const AddLocation = ({ setPostLoaction }: { setPostLoaction: (postPlace: myPlaceType) => void }) => {
    const [info, setInfo] = useState<{ content: string } | null>(null);
    const [markers, setMarkers] = useState<placeType[]>([]);
    const [map, setMap] = useState<kakao.maps.Map | null>(null);
    const [markerSearch, setMarkerSearch] = useState<string>("");
    const [searchValue, handleSearchChange, resetSearchValue] = useInput("");

    const setPostLoactionHandler = (marker: placeType) => {
        setInfo(marker);
        setPostLoaction({
            lat: marker.position.lat,
            lng: marker.position.lng,
            placeName: marker.content,
            address: marker.address,
        });
    };

    // 엔터 검색
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            console.log("e", e);
            setMarkerSearch(searchValue);
            resetSearchValue;
        }
    };

    useEffect(() => {
        if (!map) return;

        // 장소 검색 객체를 생성합니다
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(markerSearch, (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new kakao.maps.LatLngBounds();
                let markers: placeType[] = [];

                for (var i = 0; i < data.length; i++) {
                    const dataI = data[i];
                    markers.push({
                        position: {
                            lat: parseFloat(dataI.y),
                            lng: parseFloat(dataI.x),
                        },
                        content: dataI.place_name,
                        address: dataI.address_name,
                    });
                    // @ts-ignore
                    bounds.extend(new kakao.maps.LatLng(dataI.y, dataI.x));
                }
                setMarkers(markers);
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            }
        });
    }, [map, markerSearch]);
    return (
        <div className="relative">
            <Map // 로드뷰를 표시할 Container
                center={{
                    lat: 37.566826,
                    lng: 126.9786567,
                }}
                style={{
                    width: "100%",
                    height: "450px",
                    position: "relative",
                    overflow: "hidden",
                }}
                level={3}
                onCreate={setMap}
            >
                {markers.map((marker) => (
                    <MapMarker key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`} position={marker.position} onClick={() => setPostLoactionHandler(marker)}>
                        {info && info.content === marker.content && <div style={{ color: "#000" }}>{marker.content}</div>}
                    </MapMarker>
                ))}
                <ul className="absolute top-0 left-0 z-10 bg-zinc-200 space-y-1 bg-opacity-50 text-opacity-75 text-sm">
                    <li>
                        <input placeholder="검색어를 입력해주세요." value={searchValue} onChange={handleSearchChange} onKeyDown={handleEnter} />
                    </li>
                    {markers.map((marker) => (
                        <li key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`} className="">
                            <button onClick={() => setPostLoactionHandler(marker)} className="">
                                {marker.content}
                            </button>
                        </li>
                    ))}
                </ul>
            </Map>
        </div>
    );
};

export default AddLocation;
