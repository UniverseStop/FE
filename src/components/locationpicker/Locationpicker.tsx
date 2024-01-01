import React, { useState } from "react";
import { Cascader } from "rsuite";
import "rsuite/dist/rsuite.min.css";

interface Node {
    label: string;
    value: string;
    children?: Node[];
}

const Locationpicker = ({ showInline }: { showInline: boolean }) => {
    const customData: Node[] = [
        {
            label: "서울",
            value: "서울",
            children: [
                {
                    label: "강남/역삼/삼성",
                    value: "강남/역삼/삼성",
                },
                {
                    label: "신사/청담/압구정",
                    value: "신사/청담/압구정",
                },
                {
                    label: "서초/교대/사당",
                    value: "서초/교대/사당",
                },
                {
                    label: "잠실/송파/강동",
                    value: "잠실/송파/강동",
                },
                {
                    label: "을지로/명동/중구/동대문",
                    value: "을지로/명동/중구/동대문",
                },
                {
                    label: "서울역/이태원/용산",
                    value: "서울역/이태원/용산",
                },
                {
                    label: "종로/인사동",
                    value: "종로/인사동",
                },
                {
                    label: "홍대/합정/마포/서대문",
                    value: "홍대/합정/마포/서대문",
                },
                {
                    label: "여의도",
                    value: "여의도",
                },
                {
                    label: "영등포역",
                    value: "영등포역",
                },
                {
                    label: "구로/신도림/금천",
                    value: "구로/신도림/금천",
                },
                {
                    label: "김포공항/염창/강서",
                    value: "김포공항/염창/강서",
                },
                {
                    label: "건대입구/성수/왕십리",
                    value: "건대입구/성수/왕십리",
                },
                {
                    label: "성북/강북/노원/도봉",
                    value: "성북/강북/노원/도봉",
                },
            ],
        },
        {
            label: "부산",
            value: "부산",
            children: [
                {
                    label: "해운대/마린시티",
                    value: "해운대/마린시티",
                },
                {
                    label: "벡스코/센텀시티",
                    value: "벡스코/센텀시티",
                },
                {
                    label: "송정/기장/정관",
                    value: "송정/기장/정관",
                },
                {
                    label: "광안리/경성대",
                    value: "광안리/경성대",
                },
                {
                    label: "부산역",
                    value: "부산역",
                },
                {
                    label: "자갈치/남포동/영도",
                    value: "자갈치/남포동/영도",
                },
                {
                    label: "송도/다대포",
                    value: "송도/다대포",
                },
                {
                    label: "서면/연산/범일",
                    value: "서면/연산/범일",
                },
                {
                    label: "동래/온천/금정구",
                    value: "동래/온천/금정구",
                },
                {
                    label: "사상/강서/김해공항",
                    value: "사상/강서/김해공항",
                },
            ],
        },
        {
            label: "제주",
            value: "제주",
            children: [
                {
                    label: "제주시/제주국제공항",
                    value: "제주시/제주국제공항",
                },
                {
                    label: "서귀포시/모슬포",
                    value: "서귀포시/모슬포",
                },
                {
                    label: "애월/한림/협재",
                    value: "애월/한림/협재",
                },
                {
                    label: "중문",
                    value: "중문",
                },
                {
                    label: "표선/성산",
                    value: "표선/성산",
                },
                {
                    label: "함덕/김녕/세화",
                    value: "함덕/김녕/세화",
                },
            ],
        },
        {
            label: "경기",
            value: "경기",
            children: [
                {
                    label: "가평/청평/양평",
                    value: "가평/청평/양평",
                },
                {
                    label: "수원/화성",
                    value: "수원/화성",
                },
                {
                    label: "고양/파주/김포",
                    value: "고양/파주/김포",
                },
                {
                    label: "의정부/포천/동두천",
                    value: "의정부/포천/동두천",
                },
                {
                    label: "용인/동탄",
                    value: "용인/동탄",
                },
                {
                    label: "오산/평택",
                    value: "오산/평택",
                },
                {
                    label: "남양주/구리/성남/분당",
                    value: "남양주/구리/성남/분당",
                },
                {
                    label: "이천/광주/여주/하남",
                    value: "이천/광주/여주/하남",
                },
                {
                    label: "부천/광명/시흥/안산",
                    value: "부천/광명/시흥/안산",
                },
                {
                    label: "안양/의왕/군포",
                    value: "안양/의왕/군포",
                },
            ],
        },
        {
            label: "인천",
            value: "인천",
            children: [
                {
                    label: "송도/소래포구",
                    value: "송도/소래포구",
                },
                {
                    label: "인천국제공항/강화/을왕리",
                    value: "인천국제공항/강화/을왕리",
                },
                {
                    label: "영종도/월미도",
                    value: "영종도/월미도",
                },
                {
                    label: "주안/간석/인천시청",
                    value: "주안/간석/인천시청",
                },
                {
                    label: "청라/계양/부평",
                    value: "청라/계양/부평",
                },
            ],
        },
        {
            label: "강원",
            value: "강원",
            children: [
                {
                    label: "강릉",
                    value: "강릉",
                },
                {
                    label: "속초/고성",
                    value: "속초/고성",
                },
                {
                    label: "양양(서퍼비치/낙산)",
                    value: "양양(서퍼비치/낙산)",
                },
                {
                    label: "춘천/인제/철원",
                    value: "춘천/인제/철원",
                },
                {
                    label: "평창/정선/영월",
                    value: "평창/정선/영월",
                },
                {
                    label: "동해/삼척/태백",
                    value: "동해/삼척/태백",
                },
                {
                    label: "홍천/횡성/원주",
                    value: "홍천/횡성/원주",
                },
            ],
        },
        {
            label: "경상",
            value: "경상",
            children: [
                {
                    label: "대구",
                    value: "대구",
                },
                {
                    label: "구미/안동/문경",
                    value: "구미/안동/문경",
                },
                {
                    label: "경주",
                    value: "경주",
                },
                {
                    label: "울산/양산",
                    value: "울산/양산",
                },
                {
                    label: "거제/통영",
                    value: "거제/통영",
                },
                {
                    label: "포항/영덕/울진/청송",
                    value: "포항/영덕/울진/청송",
                },
                {
                    label: "창원/마산/진해/김해/부곡",
                    value: "창원/마산/진해/김해/부곡",
                },
                {
                    label: "남해/사천/하동/진주",
                    value: "남해/사천/하동/진주",
                },
            ],
        },
        {
            label: "전라",
            value: "전라",
            children: [
                {
                    label: "전주/완주",
                    value: "전주/완주",
                },
                {
                    label: "광주/나주/함평",
                    value: "광주/나주/함평",
                },
                {
                    label: "여수",
                    value: "여수",
                },
                {
                    label: "순천/광양/담양/보성/화순",
                    value: "순천/광양/담양/보성/화순",
                },
                {
                    label: "남원/부안/정읍/고창/무주/구례",
                    value: "남원/부안/정읍/고창/무주/구례",
                },
                {
                    label: "군산/익산",
                    value: "군산/익산",
                },
                {
                    label: "목포/신안/영광/진도/고흥/영암/완도/강진",
                    value: "목포/신안/영광/진도/고흥/영암/완도/강진",
                },
            ],
        },
        {
            label: "충청",
            value: "충청",
            children: [
                {
                    label: "대전/세종",
                    value: "대전/세종",
                },
                {
                    label: "천안/아산/도고",
                    value: "천안/아산/도고",
                },
                {
                    label: "당진/덕산/태안/서산/안면도",
                    value: "당진/덕산/태안/서산/안면도",
                },
                {
                    label: "보령/대천/부여/공주/금산",
                    value: "보령/대천/부여/공주/금산",
                },
                {
                    label: "청주/음성/진천",
                    value: "청주/음성/진천",
                },
                {
                    label: "충주/제천/단양/괴산/증평",
                    value: "충주/제천/단양/괴산/증평",
                },
            ],
        },
    ];

    const handleCascaderChange = (value: string | null) => {
        console.log("Selected Value:", value);
    };

    const styles = { width: 370, display: "block", marginBottom: 10 };
    return (
        <div>
            <Cascader
                inline={showInline}
                data={customData}
                size="lg"
                style={styles}
                appearance="subtle"
                placement="bottomStart"
                onChange={handleCascaderChange}
                classPrefix="picker"
            />
        </div>
    );
};

export default Locationpicker;
