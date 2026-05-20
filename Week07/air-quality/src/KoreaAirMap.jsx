import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";

const WIDTH  = 480;
const HEIGHT = 580;

const SIDO_LIST = [
  "서울", "인천", "경기", "강원",
  "충북", "세종", "충남", "대전",
  "전북", "광주", "전남",
  "경북", "대구", "울산", "경남", "부산", "제주",
];

const GEO_TO_SIDO = {
  "서울특별시": "서울", "부산광역시": "부산", "대구광역시": "대구",
  "인천광역시": "인천", "광주광역시": "광주", "대전광역시": "대전",
  "울산광역시": "울산", "세종특별자치시": "세종", "경기도": "경기",
  "강원도": "강원", "충청북도": "충북", "충청남도": "충남",
  "전라북도": "전북", "전라남도": "전남", "경상북도": "경북",
  "경상남도": "경남", "제주특별자치도": "제주",
};

const GRADE_FILL  = { "1": "#bfdbfe", "2": "#bbf7d0", "3": "#fef08a", "4": "#fecaca" };
const GRADE_HOVER = { "1": "#93c5fd", "2": "#86efac", "3": "#fde047", "4": "#fca5a5" };
const GRADE_DOT   = { "1": "#3b82f6", "2": "#22c55e", "3": "#eab308", "4": "#ef4444" };
const GRADE_LABEL = { "1": "좋음",    "2": "보통",    "3": "나쁨",    "4": "매우나쁨" };
const GRADE_BADGE = {
  "1": "bg-blue-100 text-blue-700",
  "2": "bg-green-100 text-green-700",
  "3": "bg-yellow-100 text-yellow-700",
  "4": "bg-red-100 text-red-700",
};

function avg(arr) {
  return arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : null;
}

export default function KoreaAirMap() {
  const [geoData,   setGeoData]   = useState(null);
  const [sidoData,  setSidoData]  = useState({});
  const [geoReady,  setGeoReady]  = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [hovered,   setHovered]   = useState(null);
  const [tooltip,   setTooltip]   = useState(null);

  const loading = !geoReady || !dataReady;

  // GeoJSON 로드
  useEffect(() => {
    fetch("/korea-provinces.json")
      .then((r) => r.json())
      .then((data) => { setGeoData(data); setGeoReady(true); })
      .catch(console.error);
  }, []);

  // 대기질 데이터 로드
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          SIDO_LIST.map((sido) =>
            axios
              .get(import.meta.env.VITE_API_URL, {
                params: {
                  serviceKey: import.meta.env.VITE_API_KEY,
                  returnType: "json",
                  numOfRows: 30,
                  pageNo: 1,
                  sidoName: sido,
                  ver: "1.0",
                },
              })
              .then((res) => ({ sido, items: res.data?.response?.body?.items ?? [] }))
              .catch(() => ({ sido, items: [] }))
          )
        );

        const processed = {};
        results.forEach(({ sido, items }) => {
          const valid = items.filter((i) => i.khaiGrade && i.khaiGrade !== "-");
          if (!valid.length) return;
          const grades = valid.map((i) => Number(i.khaiGrade)).filter((g) => !isNaN(g));
          processed[sido] = {
            grade: String(Math.round(avg(grades))),
            pm10: avg(valid.filter((i) => i.pm10Value && i.pm10Value !== "-").map((i) => Number(i.pm10Value))),
            pm25: avg(valid.filter((i) => i.pm25Value && i.pm25Value !== "-").map((i) => Number(i.pm25Value))),
          };
        });
        setSidoData(processed);
      } catch (err) {
        console.error(err);
      } finally {
        setDataReady(true);
      }
    };
    fetchAll();
  }, []);

  // d3-geo 프로젝션 — GeoJSON에 맞게 자동 fit
  const projection = useMemo(() => {
    if (!geoData) return null;
    return geoMercator().fitExtent([[10, 10], [WIDTH - 10, HEIGHT - 10]], geoData);
  }, [geoData]);

  const pathGen = useMemo(() => {
    if (!projection) return null;
    return geoPath().projection(projection);
  }, [projection]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">전국 실시간 대기질 지도</h1>
      <p className="text-sm text-gray-500 mb-6">에어코리아 공공데이터 API</p>

      {loading ? (
        <p className="text-gray-400 mt-20 text-sm">데이터 불러오는 중...</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 w-full max-w-lg">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" style={{ display: "block" }}>

            {/* 시도 면적 채우기 */}
            {geoData?.features.map((feature) => {
              const sido = GEO_TO_SIDO[feature.properties.name];
              const data = sido ? sidoData[sido] : null;
              const isHot = hovered === sido;
              const fill  = data
                ? isHot ? (GRADE_HOVER[data.grade] ?? "#d1d5db") : (GRADE_FILL[data.grade] ?? "#e5e7eb")
                : "#e5e7eb";

              return (
                <path
                  key={feature.properties.name}
                  d={pathGen(feature)}
                  fill={fill}
                  stroke="white"
                  strokeWidth={0.8}
                  style={{ cursor: sido && data ? "pointer" : "default", transition: "fill 0.12s" }}
                  onMouseEnter={(e) => {
                    if (!sido || !data) return;
                    setHovered(sido);
                    setTooltip({ sido, data, x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={(e) => {
                    setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
                  }}
                  onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                />
              );
            })}

            {/* 시도 라벨 (중심점에 자동 배치) */}
            {geoData?.features.map((feature) => {
              if (!projection) return null;
              const sido = GEO_TO_SIDO[feature.properties.name];
              if (!sido) return null;
              const data = sidoData[sido];
              const [cx, cy] = projection(geoCentroid(feature));
              const dotColor = data ? (GRADE_DOT[data.grade] ?? "#9ca3af") : "#d1d5db";

              return (
                <g key={`lbl-${sido}`} style={{ pointerEvents: "none" }}>
                  <circle cx={cx} cy={cy} r={4} fill={dotColor} stroke="white" strokeWidth={1.5} />
                  <text
                    x={cx} y={cy - 8}
                    textAnchor="middle"
                    fontSize={8} fontWeight="600" fill="#1e293b"
                    style={{ userSelect: "none" }}
                  >
                    {sido}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* 범례 */}
          <div className="flex justify-center gap-5 mt-3">
            {Object.entries(GRADE_LABEL).map(([grade, label]) => (
              <div key={grade} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: GRADE_FILL[grade], border: `1.5px solid ${GRADE_DOT[grade]}` }}
                />
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 툴팁 */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none bg-white rounded-xl shadow-xl border border-gray-200 p-3 min-w-36"
          style={{ left: tooltip.x + 14, top: tooltip.y, transform: "translateY(-50%)" }}
        >
          <p className="font-bold text-gray-900 text-sm">{tooltip.sido}</p>
          <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${GRADE_BADGE[tooltip.data.grade] ?? "bg-gray-100 text-gray-600"}`}>
            {GRADE_LABEL[tooltip.data.grade] ?? "-"}
          </span>
          <div className="mt-2 space-y-1 text-xs">
            <div className="flex justify-between gap-6">
              <span className="text-gray-500">PM10</span>
              <span className="font-medium text-gray-800">{tooltip.data.pm10 ?? "-"} ㎍/㎥</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-gray-500">PM2.5</span>
              <span className="font-medium text-gray-800">{tooltip.data.pm25 ?? "-"} ㎍/㎥</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
