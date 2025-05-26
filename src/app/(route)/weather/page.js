"use client";

import { useEffect, useState } from "react";

export default function Weather() {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/weather");
            const data = await res.json();
            const items = data?.response?.body?.[0]?.items?.[0]?.item || [];

            items.forEach((item) => {
                console.log(`값: ${JSON.stringify(item)}`);
            });
            setWeather(items);
        };
        fetchData();
    }, []);

    const getValue = (code) => {
        const found = weather.find((item) => item.category?.[0] === code);
        return found?.obsrValue?.[0] || "-";
    };

    return (
        <>
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
