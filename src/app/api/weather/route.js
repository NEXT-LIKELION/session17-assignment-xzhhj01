import { parseStringPromise } from "xml2js";

export async function GET(req) {
    const serviceKey = process.env.WEATHER_API_DECODING_KEY;
    const baseUrl =
        "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";

    const today = new Date();
    const base_date = today.toISOString().slice(0, 10).replace(/-/g, "");

        // ✅ 1. 쿼리 파라미터 추출
    const { searchParams } = new URL(req.url);

    const rawNx = searchParams.get("nx")||"55.0";
    const rawNy = searchParams.get("ny")||"127.0";

    const nx = Math.round(parseFloat(rawNx));
    const ny = Math.round(parseFloat(rawNy));


    const params = new URLSearchParams({
        serviceKey: serviceKey,
        pageNo: "1",
        numOfRows: "1000",
        dataType: "XML",
        base_date: base_date,
        base_time: "0600",
        nx: nx,
        ny: ny,
    });

    const response = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await response.text();
    const json = await parseStringPromise(data);

    return new Response(JSON.stringify(json), {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
