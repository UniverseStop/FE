import { getStaticLocation } from "@/pages/api/manager";
import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker, MapTypeControl, MarkerClusterer, ZoomControl } from "react-kakao-maps-sdk";
import { useQuery } from "react-query";

export interface positionsType {
    lat: number;
    lng: number;
}

const generateRandomNumber = (min: number, max: number, decimalPlaces: number): number => {
    const randomValue = Math.random() * (max - min) + min;
    return parseFloat(randomValue.toFixed(decimalPlaces));
};

const StatisticsMap = () => {
    const [positions, setPositions] = useState<positionsType[]>([]);
    const { data: staticLocation } = useQuery("staticLocation", getStaticLocation);
    console.log("staticLocation", staticLocation);
    useEffect(() => {
        const generateRandomCoordinates = () => {
            const newCoordinates: positionsType[] = [];
            for (let i = 0; i < 100; i++) {
                const lat = generateRandomNumber(35, 38, 4);
                const lng = generateRandomNumber(126.5, 129.5, 4);

                newCoordinates.push({ lat, lng });
            }
            setPositions(newCoordinates);
        };

        generateRandomCoordinates();
    }, []);

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
                        key={`${pos.lat}-${pos.lng}`}
                        position={{
                            lat: pos.lat,
                            lng: pos.lng,
                        }}
                    />
                ))}
            </MarkerClusterer>
            <MapTypeControl position={"TOPRIGHT"} />
            <ZoomControl position={"RIGHT"} />
        </Map>
    );
};

export default StatisticsMap;
