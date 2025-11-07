// 등급 첫 박스(배지 + 10칸 막대) — 한 줄 주석으로 핵심만 설명
import React, { useMemo } from "react";
import S from "./style";

// ✅ (선택) 레벨 아이콘 컴포넌트를 쓸 계획이면 실제 경로로 교체해 사용
// import LevelEgg from "✅/당신이_정할_경로/LevelEgg";

const COLOR = {
  red:    "#FF5A5A",   // Lv1~2
  yellow: "#FFC24A",   // Lv3~4
  green:  "#3CCB7F",   // Lv5~6
  blue:   "#4C73FF",   // Lv7~8
  purple: "#A066FF",   // Lv9~10
  gray:   "#E9E9EE",   // 트랙/비활성
};

const labels = ["Lv1","Lv2","Lv3","Lv4","Lv5","Lv6","Lv7","Lv8","Lv9","LvX"]; // 10칸 표기

// 레벨(1~10) 색상
const colorOf = (lv) => {
  if (lv <= 2) return COLOR.red;
  if (lv <= 4) return COLOR.yellow;
  if (lv <= 6) return COLOR.green;
  if (lv <= 8) return COLOR.blue;
  return COLOR.purple; // 9~10
};

 const levelIconSrc = (lv) => `/assets/images/level/${lv}.svg`;

 
const clampLevel = (lv) => {
  const n = Number(lv) || 1;
  return Math.min(10, Math.max(1, n));
};

const GradeContainer = ({ level = 9 }) => {
  const safeLevel = clampLevel(level); // 1~10 보정

  // 10칸 세그먼트 메모이제이션
  const segments = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const lv = i + 1;
        return {
          lv,
          label: labels[i],
          color: colorOf(lv),
          filled: lv < safeLevel, // 요구사항: 현재 Lv N이면 1~(N-1)만 채움
        };
      }),
    [safeLevel]
  );

  return (
    <S.Wrap>
      <S.Card aria-label="등급 요약">
        <S.Row>
          {/* 좌측: 배지 */}
          <S.BadgeArea>
            <S.Circle>
              {/* ✅ 템플릿 리터럴/유틸 사용으로 경로 오류 해결 */}
              <S.EggImg
                src={levelIconSrc(safeLevel)}
                alt={`레벨 ${labels[safeLevel - 1]}`}
              />
              {/* 컴포넌트 방식 전환 시 대체:
                 <LevelEgg level={safeLevel} /> */}
              <S.PlaceholderEgg aria-hidden="true">Lv.{safeLevel === 10 ? "X" : safeLevel}</S.PlaceholderEgg>
            </S.Circle>
            <S.LevelText>나의 등급</S.LevelText>
          </S.BadgeArea>

          {/* 우측: 막대 */}
          <S.BarArea>
            <S.BarTrack
              role="meter"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={safeLevel}
              aria-valuetext={`현재 등급 ${labels[safeLevel - 1]}`}
            >
              {segments.map((s) => (
                <S.BarSegment
                  key={s.lv}
                  $filled={s.filled}
                  $color={s.color}
                  title={s.label}
                  aria-hidden="true"
                />
              ))}
            </S.BarTrack>

            <S.BarLabels>
              {segments.map((s) => (
                <span key={s.lv}>{s.label}</span>
              ))}
            </S.BarLabels>
          </S.BarArea>
        </S.Row>
      </S.Card>
    </S.Wrap>
  );
};

export default GradeContainer;
