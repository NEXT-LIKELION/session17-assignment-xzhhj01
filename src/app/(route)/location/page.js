"use client";

import { useEffect, useState } from "react";

export default function Weather() {
    const [weather, setWeather] = useState([]);

    // 현재 위치
    const [position, setPosition] = useState({
        lat: 33.450701,
        lng: 126.570667,
    });

    // 지도가 처음 렌더링되면 중심좌표를 현위치로 설정하고 위치 변화 감지
    useEffect(() => {
        navigator.geolocation.watchPosition((pos) => {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            });
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `/api/weather?nx=${position.lat}&ny=${position.lng}`
            );
            const data = await res.json();
            const items = data?.response?.body?.[0]?.items?.[0]?.item || [];

            items.forEach((item) => {
                console.log(`값: ${JSON.stringify(item)}`);
            });
            setWeather(items);
        };
        if (position.lat && position.lng) {
            fetchData();
        }
    }, [position]);

    const getValue = (code) => {
        const found = weather.find((item) => item.category?.[0] === code);
        return found?.obsrValue?.[0] || "-";
    };

    return (
        <>
            <h2>현재 위치</h2>
            <ul>
                <li>위도: {position.lat}</li>
                <li>경도: {position.lng}</li>
            </ul>
            <h2>날씨 정보</h2>
            <ul>
                {weather.map((item, index) => (
                    <li key={index}>
                        {item.category}: {item.obsrValue}
                    </li>
                ))}
            </ul>

            <div className="weather-box">
                <h2>현재 날씨</h2>

                <p>🌡 기온: {getValue("T1H")}℃</p>
                <p>💧 습도: {getValue("REH")}%</p>
                <p>☔️ 강수량: {getValue("RN1")}mm</p>
                <p>⚡️ 낙뢰: {getValue("LGT") === "0" ? "없음" : "있음"}</p>
            </div>
        </>
    );
}


// "use client";

// import { useEffect, useState } from "react";

// export default function Weather() {
//     const [weather, setWeather] = useState([]);
//     const [position, setPosition] = useState({
//         lat: 33.450701,
//         lng: 126.570667,
//     });

//     useEffect(() => {
//         navigator.geolocation.watchPosition((pos) => {
//             setPosition({
//                 lat: pos.coords.latitude,
//                 lng: pos.coords.longitude,
//             });
//         });
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             const res = await fetch(
//                 `/api/weather?nx=${position.lat}&ny=${position.lng}`
//             );
//             const data = await res.json();
//             const items = data?.response?.body?.[0]?.items?.[0]?.item || [];
//             setWeather(items);
//         };
//         if (position.lat && position.lng) {
//             fetchData();
//         }
//     }, [position]);

//     const getValue = (code) => {
//         const found = weather.find((item) => item.category?.[0] === code);
//         return found?.obsrValue?.[0] || "-";
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
//             <h2 className="text-xl font-semibold text-center mb-4 text-[#1FAB89]">📍 현재 위치</h2>
//             <ul className="mb-6 text-sm text-gray-700 text-center">
//                 <li>위도: {position.lat}</li>
//                 <li>경도: {position.lng}</li>
//             </ul>

//             <div className="weather-box bg-blue-50 p-4 rounded-xl shadow-inner">
//                 <h2 className="text-lg font-semibold text-blue-800 mb-2">🌤 현재 날씨</h2>
//                 <div className="space-y-1 text-gray-800">
//                     <p>🌡 기온: {getValue("T1H")}℃</p>
//                     <p>💧 습도: {getValue("REH")}%</p>
//                     <p>☔️ 강수량: {getValue("RN1")}mm</p>
//                     <p>⚡️ 낙뢰: {getValue("LGT") === "1" ? "있음" : "없음"}</p>
//                 </div>
//             </div>

//             <div className="mt-6">
//                 <h2 className="text-md font-semibold text-gray-700 mb-2">📊 전체 항목 (코드 기반)</h2>
//                 <ul className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
//                     {weather.map((item, index) => (
//                         <li key={index} className="border-b border-gray-200 py-1">
//                             {item.category?.[0]}: {item.obsrValue?.[0]}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }
