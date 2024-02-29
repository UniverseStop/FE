import { getStaticLocation } from "@/pages/api/manager";
import { positionsType } from "@/types/managerTypes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Map, MapMarker, MapTypeControl, MarkerClusterer, ZoomControl } from "react-kakao-maps-sdk";
import { useQuery } from "react-query";

const StatisticsMap = () => {
    const [positions, setPositions] = useState<positionsType[]>([]);
    const [info, setInfo] = useState<{ placeName: string } | null>(null);
    const { data } = useQuery("staticLocation", getStaticLocation,{
        onSuccess: (newData) => {
            setPositions(newData)
        },
    });

    const router = useRouter();


    return (
        <Map // 지도를 표시할 Container
            center={{
                // 지도의 중심좌표
                lat: 36.2683,
                lng: 127.6358,
            }}
            style={{
                // 지도의 크기
                width: "100%",
                height: "100%",
            }}
            level={13} // 지도의 확대 레벨
        >
            <MarkerClusterer
                averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                minLevel={10} // 클러스터 할 최소 지도 레벨
            >
                {positions.map((pos) => (
                    <MapMarker
                        key={`${pos.postId}`}
                        position={{
                            lat: pos.lat,
                            lng: pos.lng,
                        }} onClick={() => setInfo(pos)}
                    >
                        {info && info.placeName === pos.placeName && 
                    <div className="flex flex-col justify-center text-center items-center w-[180px] min-w-max h-[50px] text-sm" onClick={()=>router.push(`/detail/${pos.postId}`)}>
                        <span className="font-bold mx-1.5">{pos.title}</span>
                        <span className="mx-1.5">{pos.placeName}</span>
                    </div>}
                    </MapMarker>
                ))}
            </MarkerClusterer>
            <MapTypeControl position={"TOPRIGHT"} />
            <ZoomControl position={"RIGHT"} />
        </Map>
    );
};

export default StatisticsMap;
