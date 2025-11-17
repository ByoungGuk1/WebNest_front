import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import S from "./style";

const COLOR = {
  red: "#FF5A5A", // Lv1~2
  yellow: "#FFC24A", // Lv3~4
  green: "#3CCB7F", // Lv5~6
  blue: "#4C73FF", // Lv7~8
  purple: "#A066FF", // Lv9~10
  gray: "#E9E9EE", // 트랙/비활성
};

const labels = ["Lv1", "Lv2", "Lv3", "Lv4", "Lv5", "Lv6", "Lv7", "Lv8", "Lv9", "LvX"];

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

const GradeContainer = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const fullReduxState = useSelector((state) => state);
  const myData = useOutletContext();
  const safeLevel = clampLevel(currentUser?.userLevel || 1);
  const userExp = currentUser?.userExp || 0;

  // 리덕스 상태 콘솔 출력
  useEffect(() => {
    console.log("=== 리덕스 전체 상태 ===", fullReduxState);
    console.log("=== 리덕스 user 상태 ===", fullReduxState.user);
    console.log("=== currentUser 정보 ===", currentUser);
  }, [fullReduxState, currentUser]);

  // 10칸 세그먼트 메모이제이션
  const segments = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const lv = i + 1;
        return {
          lv,
          label: labels[i],
          color: colorOf(lv),
          filled: lv < safeLevel, // 현재 Lv N이면 1~(N-1)만 채움
        };
      }),
    [safeLevel]
  );

  // 경험치 데이터 (임시 데이터 - 실제로는 API에서 가져와야 함)
  const expData = {
    problem: 35,
    answer: 5,
    game: 10,
    total: 50,
  };

  // 타자 데이터 (임시 데이터 - 실제로는 API에서 가져와야 함)
  const typingData = {
    speed: 510,
    accuracy: 94,
    maxSpeed: 587,
  };

  // 문제 해결 현황 데이터 - API에서 가져온 quizMyPageLanguage 사용
  const problemProgress = useMemo(() => {
    const quizMyPageLanguage = myData?.quizMyPageLanguage || [];
    
    // 언어명 매핑 (백엔드에서 오는 언어 코드를 한글로 변환)
    const languageMap = {
      "JS": "자바스크립트",
      "JAVA": "자바",
      "ORACLE": "오라클",
      "PYTHON": "파이썬",
      "C": "C",
      "CPP": "C++",
    };
    
    return quizMyPageLanguage.map((item) => {
      const languageName = languageMap[item.quizLanguage] || item.quizLanguage || "기타";
      const solvedCount = item.solvedCount || 0;
      
      // 임시로 진행률 계산 (실제로는 난이도별 문제 수가 필요)
      // 현재는 전체 푼 문제 수를 기반으로 표시
      const totalProgress = Math.min(100, (solvedCount * 10)); // 문제당 10%씩
      
      return {
        language: languageName,
        solvedCount: solvedCount,
        levels: {
          beginner: totalProgress,
          intermediate: totalProgress,
          upperIntermediate: totalProgress,
          advanced: totalProgress,
          expert: totalProgress,
        },
      };
    });
  }, [myData?.quizMyPageLanguage]);

  // 파이 차트 계산
  const pieChartGradient = useMemo(() => {
    const total = expData.total || 1;
    const cardFlip = expData.game || 0;
    const omok = expData.game || 0;
    const training = expData.problem || 0;
    const wordChain = expData.game || 0;
    
    let currentAngle = 0;
    const segments = [];
    
    if (cardFlip > 0) {
      const endAngle = currentAngle + (cardFlip / total) * 360;
      segments.push(`#7255EE ${currentAngle}deg ${endAngle}deg`);
      currentAngle = endAngle;
    }
    
    if (omok > 0) {
      const endAngle = currentAngle + (omok / total) * 360;
      segments.push(`#9585F2 ${currentAngle}deg ${endAngle}deg`);
      currentAngle = endAngle;
    }
    
    if (training > 0) {
      const endAngle = currentAngle + (training / total) * 360;
      segments.push(`#AB4BFF ${currentAngle}deg ${endAngle}deg`);
      currentAngle = endAngle;
    }
    
    if (wordChain > 0) {
      const endAngle = currentAngle + (wordChain / total) * 360;
      segments.push(`#C4B5FD ${currentAngle}deg ${endAngle}deg`);
      currentAngle = endAngle;
    }
    
    return segments.length > 0 ? segments.join(", ") : "#E9E9EE";
  }, [expData]);

  return (
    <S.Page>
      <S.Background />
      <S.Container>
        {/* 등급 섹션 */}
        <S.GradeCard>
          <S.GradeRow>
            <S.BadgeArea>
              <S.Circle $color={colorOf(safeLevel)}>
                <S.EggImg
                  src={levelIconSrc(safeLevel)}
                  alt={`레벨 ${labels[safeLevel - 1]}`}
                />
              </S.Circle>
              <S.LevelText>나의 등급은 Lv.{safeLevel === 10 ? "X" : safeLevel} 입니다.</S.LevelText>
            </S.BadgeArea>

            <S.BarArea>
              <S.BarTrack>
                {segments.map((s) => (
                  <S.BarSegment
                    key={s.lv}
                    $filled={s.filled}
                    $color={s.color}
                    title={s.label}
                  />
                ))}
              </S.BarTrack>
              <S.BarLabels>
                {segments.map((s) => (
                  <span key={s.lv}>{s.label}</span>
                ))}
              </S.BarLabels>
            </S.BarArea>
          </S.GradeRow>
        </S.GradeCard>

        {/* 경험치 섹션 */}
        <S.ExpCard>
          <S.SectionTitle>경험치</S.SectionTitle>
          <S.ExpContent>
            <S.PieChartContainer>
              <S.PieChart $gradient={pieChartGradient} />
            </S.PieChartContainer>
            <S.ExpList>
              <S.ExpItem>
                <span>문제</span>
                <span>{expData.problem} exp</span>
              </S.ExpItem>
              <S.ExpItem>
                <span>답변</span>
                <span>{expData.answer} exp</span>
              </S.ExpItem>
              <S.ExpItem>
                <span>게임</span>
                <span>{expData.game} exp</span>
              </S.ExpItem>
              <S.ExpTotal>누적 경험치: {expData.total}</S.ExpTotal>
            </S.ExpList>
          </S.ExpContent>
        </S.ExpCard>

        {/* 타자 섹션 */}
        <S.TypingCard>
          <S.SectionTitle>타자</S.SectionTitle>
          <S.TypingContent>
            <S.TypingItem>
              <S.TypingIcon>📅</S.TypingIcon>
              <S.TypingValue>{typingData.speed}타</S.TypingValue>
              <S.TypingLabel>타자 수</S.TypingLabel>
            </S.TypingItem>
            <S.TypingItem>
              <S.TypingIcon>✓</S.TypingIcon>
              <S.TypingValue>{typingData.accuracy}%</S.TypingValue>
              <S.TypingLabel>정확도</S.TypingLabel>
            </S.TypingItem>
            <S.TypingItem>
              <S.TypingIcon>↑</S.TypingIcon>
              <S.TypingValue>{typingData.maxSpeed}타</S.TypingValue>
              <S.TypingLabel>최고 속도</S.TypingLabel>
            </S.TypingItem>
          </S.TypingContent>
        </S.TypingCard>

        {/* 문제 해결 현황 섹션 */}
        <S.ProblemCard>
          <S.SectionTitle>문제 해결 현황</S.SectionTitle>
          <S.ProblemContent>
            <S.ProblemHeader>
              <S.ProblemHeaderItem>언어 유형</S.ProblemHeaderItem>
              <S.ProblemHeaderItem>문제 진행률</S.ProblemHeaderItem>
            </S.ProblemHeader>
            {problemProgress.map((item, index) => (
              <S.ProblemRow key={index}>
                <S.LanguageName>{item.language}</S.LanguageName>
                <S.ProgressBarContainer>
                  <S.ProgressBarSegment $width={item.levels.beginner} $color="#3CCB7F" />
                  <S.ProgressBarSegment $width={item.levels.intermediate} $color="#FFC24A" />
                  <S.ProgressBarSegment $width={item.levels.upperIntermediate} $color="#A066FF" />
                  <S.ProgressBarSegment $width={item.levels.advanced} $color="#4C73FF" />
                  <S.ProgressBarSegment $width={item.levels.expert} $color="#FF5A5A" />
                </S.ProgressBarContainer>
              </S.ProblemRow>
            ))}
          </S.ProblemContent>
        </S.ProblemCard>
      </S.Container>
    </S.Page>
  );
};

export default GradeContainer;
