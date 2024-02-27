# 유니버스

## 0. 목차
[1. 프로젝트 소개](#1-프로젝트-소개)

[2. 화면 구성 및 주요 기능](#2-화면-구성-및-주요-기능)

[3. 기술적 의사결정](#3-기술적-의사결정)

[4. 개선사항](#4-개선사항)

[5. 트러블 슈팅](#5-트러블-슈팅)

[6. 아키텍처](#6-아키텍처)

[7. 프로젝트 기술 스택](#7-프로젝트-기술-스택)

[8. 팀원 소개](#8-팀원-소개)

[9. 팀원 역할](#9-팀원-역할)

</br>

## 1. 프로젝트 소개
![브로셔](https://github.com/UniverseStop/FE/assets/132332533/6f11eb30-b80a-4ed4-8956-6f35c1873162)



### 🚀 우리만의 소우주, UniBus! | 개발기간 : 23.12 ~ 24.01 (4주)
<div style="display:flex">
 <div style="display:flex">
    <img src="https://github.com/tph7897/tph7897/assets/132332533/f559363a-1c7c-4797-bef8-3dbcdcdb1aef" alt="로고" style="width: 250px; margin:0 0 0 10px"/>
 </div>
</div>

<p style="font-size:15px">


    여러분 안녕하세요! UniBus에 오신 것을 환영합니다.
    이곳에서는 각자의 관심사를 공유하고, 비슷한 취향을 가진 사람들과 만날 수 있습니다.
    당신의 우주에서 찾아낸 흥미로운 주제를 공유하고, 다양한 이야기를 들어보세요.

</br>

##  2. 화면 구성 및 주요 기능
- [FE 화면 구성 및 주요 기능](https://github.com/UniverseStop/FE/wiki/%ED%99%94%EB%A9%B4-%EA%B5%AC%EC%84%B1-%EB%B0%8F-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)

</br>

##  3. 기술적 의사결정
- [FE 기술적 의사결정](https://github.com/UniverseStop/FE/wiki/%08%EA%B8%B0%EC%88%A0%EC%A0%81-%EC%9D%98%EC%82%AC%EA%B2%B0%EC%A0%95)

</br>

## 4. 개선사항
- [개선사항](https://github.com/UniverseStop/FE/wiki/%EA%B0%9C%EC%84%A0-%EC%82%AC%ED%95%AD)

</br>

## 5. 트러블 슈팅
### 1 ) [Hydration failed 에러 🔗](https://github.com/UniverseStop/FE/blob/dev/src/pages/aboutus/index.tsx)


#### ⓵ 문제 상황
    텍스트의 내용이 서버에서 렌더링된 HTML과 일치하지 않는 에러가 발생하였다.
#### ⓶ 해결 방안
    1. 서버와 클라이언트 간에 초기 상태를 일치시키기 위해 서버에서 렌더링된 HTML에 초기 상태를 포함시킨다.

    2. 클라이언트에서 서버에서 렌더링된 상태를 기다려서 데이터가 로드된 후에 렌더링 되도록 처리한다. (useEffect사용)

    3. HTML 태그의 잘못된 중첩을 고쳐준다.

    4. 문제가 발생한 특정 구성요소만 SSR을 비활성화 해준다.

#### ⓷ 의견 조율
    1. 문제를 보니 HTML 태그의 잘못된 중첩이 아닌 비동기로 데이터를 로딩하면서 생기는 문제인듯하다.

    2. 비동기로 데이터를 로딩하면서 발생하는 문제이므로 기존의 text를 useState로 관리하여 초기값을 두고 useEffect를 사용하여 데이터 로딩이 완료된 후에 상태를 업데이트하는 해결방안이 적합해 보인다.

    3. SSR을 비활성화 하는 방법이 있지만 그렇게 되면 사전 랜더링을 포기하는 것이기때문에 초기 성능이 좀더 좋지 않고 SEO관점에서도 좋지 않아 보인다.
#### ⓸  의견 결정
    기존의 text를 useState로 관리하여 초기값을 두고 useEffect를 사용하여 데이터 로딩이 완료된 후에 상태를 업데이트하는 방법으로 해결했다.

----

### 2 ) [불필요한 리렌더링 방지 🔗](https://github.com/UniverseStop/FE/tree/dev/src/recoil/atoms)


#### ⓵ 문제 상황
    내 정보를 수정할때, category button 과 nickname input 값이 변동될 때마다
    페이지 전체가 불필요하게 리렌더링 되고 있었다.
#### ⓶ 해결 방안
    컴포넌트 구조를 설계할 때, 부모의 요소에 state를 두고 자식요소에 state를 props로
    내려준 뒤 값을 변동하고 있어, 자식요소에서 변동되는 state가 부모요소인 페이지까지 전달되어 불필요하게 렌더링되고 있음을 확인하고, 컴포넌트를 다시 설계하여 state의 위치를 자식요소에 배치시킨 뒤, useEffect를 사용하여 부모요소에 완성된 state의 값만을 전달하게 했다.
#### ⓷ 의견 조율
    useRef로 input 값을 관리하려고 하였으나, 화면상에 렌더링이 되고 있음을 확인시켜줘야 하기때문에 useCallback 을 사용했다.
#### ⓸  의견 결정
    useEffcet 사용하여 불필요한 리렌더링 방지시켜주었다.


----

### 3 ) [상태 관리 변경 (ContextAPI → Recoil) 🔗](https://github.com/UniverseStop/FE/tree/dev/src/recoil/atoms)

#### ⓵ 문제 상황
    server state를 client state로 재조합하는 과정에서 contextAPI 를
    사용하였으나 불필요한 리렌더링이 발생했고, 상태 추적 및 디버깅에 어려움이 생겼다.
#### ⓶ 해결 방안
    internal state로 관리하려고 했으나 위의 단점으로 인해 external state 로
    관리해야 할 필요성을 느꼈고, 시도해 본 상태관리 방법 중 2가지를 사안에 놓고
    리팩터링 진행하기로 함.
    1. Redux
    2. Recoil
#### ⓷ 의견 조율
    Redux, Recoil 모두 관련된 컴포넌트 업데이트 가능 및 DevTools 존재하지만, Recoil이 Redux에 비해 보일러플레이트 없이 코드를 간결하게 작성할 수 있다.
#### ⓸  의견 결정
    Recoil로 상태 관리하기로 결정하였다.


##  6. 아키텍처
<img src="https://github.com/UniverseStop/FE/assets/130561236/02c1f561-e1ca-4519-97a3-6d43ad182845" alt="아키텍처" width="650px" height="400px">

</br>

## 7. 프로젝트 기술 스택
###  언어
 <div style="margin: 0 auto; text-align: start;" align= "start">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
</div>

### 라이브러리
<div style="margin: 0 auto; text-align: start;" align= "start">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/recoil%20-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
</div>

###  프레임 워크
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">

### 협업도구
<div style="margin: 0 auto; text-align: start;" align= "start">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">
</div>

<br>

##  8. 팀원 소개
<table>
    <thead>
        <tr>
            <th style="text-align: center">프론트엔드</th>
            <th style="text-align: center">프론트엔드</th>
            <th style="text-align: center">프론트엔드</th>
            <th style="text-align: center">백엔드</th>
            <th style="text-align: center">백엔드</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/UniverseStop/FE/assets/134919218/0073ad30-28f9-428d-8692-8c00adee3e49"><img src="https://github.com/UniverseStop/FE/assets/134919218/0073ad30-28f9-428d-8692-8c00adee3e49" alt="하은" style="width: 400px;"></a></td>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/project-team-six/FE/assets/130561236/8e460779-27af-42bf-aa0e-24226ca2ffd6"><img src="https://github.com/tph7897/tph7897/assets/132332533/25e40431-4b69-4916-a316-d8877adc8ce6" alt="남규" style="width: 400px;"></a></td>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/UniverseStop/FE/assets/130561236/2c4fde9d-3fe2-42c4-854f-a3b7a511a99c"><img src="https://github.com/UniverseStop/FE/assets/130561236/2c4fde9d-3fe2-42c4-854f-a3b7a511a99c" alt="은지" style="width: 400px; height: auto;"></a></td>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/project-team-six/FE/assets/134919218/a44b633a-1de4-45e3-9b7a-fb88e668de79"><img src="https://github.com/project-team-six/FE/assets/134919218/a44b633a-1de4-45e3-9b7a-fb88e668de79" alt="장미" style="width: 400px;"></a></td>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/UniverseStop/FE/assets/130561236/9fbc5a00-6fe5-4a41-a6da-b38b4edd128b"><img src="https://github.com/UniverseStop/FE/assets/130561236/9fbc5a00-6fe5-4a41-a6da-b38b4edd128b" alt="광균" style="width: 400px;"></a></td>
        </tr>
        <tr>
            <td align="center"><a href="https://github.com/haniStudy">하은</a></td>
            <td align="center"><a href="https://github.com/tph7897">남규</a></td>
            <td align="center"><a href="https://github.com/hotcream3904">은지</a></td>
            <td align="center"><a href="https://github.com/klettermi">장미</a></td>
            <td align="center"><a href="https://github.com/kwangkyunkim">광균</a></td>
        </tr>
    </tbody>
</table>

<br>

##  9. 팀원 역할
<h3>공통: 기획, 디자인, FE 개발</h3>
</br>

<table>
    <tbody>
        <tr>
            <th>남규</th>
            <td>메인(무한스크롤), 날짜 지역 카테고리 필터, 관리자페이지(사용자 통계, 게시글 희망만남 위치 통계)</td>
        </tr>
        <tr>
            <th>하은</th>
            <td>중앙 저장소 관리 (Recoil), AccessToken 관리 (재발급 포함), 카카오 로그인, 소개, 게시물 상세, </br> 관리자 (사용자 전체 목록 전체 및 상세 조회, 차단, 구제), 검색, 에러, 구제 신청
            </td>
        </tr>
        <tr>
            <th>은지</th>
            <td>내 정보(수정), 게시글 작성, 유저 신고, 채팅, 관리자(수퍼관리자 권한, 차단글 관리) </td>
        </tr>
    </tbody>
</table>
