import React, { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import S from "./style";
import { ResponsivePie } from "@nivo/pie";

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

const levelIconSrc = (lv) => {
  if (lv === 10) {
    return `/assets/images/level/x.svg`;
  }
  return `/assets/images/level/${lv}.svg`;
};

const clampLevel = (lv) => {
  const n = Number(lv) || 1;
  return Math.min(10, Math.max(1, n));
};

const GradeContainer = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const fullReduxState = useSelector((state) => state);
  const myData = useOutletContext();
  const { records } = myData;
  const safeLevel = clampLevel(currentUser?.userLevel || 1);
  const userExp = currentUser?.userExp || 0;

  // 최고 속도 기준으로 정렬된 첫 번째 기록
  const sortedRecords = useMemo(() => {
    if (!records || records.length === 0) return null;
    const sorted = [...records].sort((a, b) => (b.typingRecordTypist || 0) - (a.typingRecordTypist || 0));
    return sorted[0];
  }, [records]);

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

  // 경험치 데이터 계산 - 리덕스의 총 exp 사용
  const expData = useMemo(() => {
    const quizMyPage = myData?.quizMyPage || [];
    
    // 문제 경험치: 푼 문제들의 quizExp 합산
    const problemExp = quizMyPage.reduce((sum, quiz) => {
      return sum + (quiz.quizExp || 0);
    }, 0);
    
    // 답변 경험치: 채택된 답변으로 얻은 경험치
    const answerExp = myData?.answerExp || 0;
    
    // 리덕스에서 총 경험치 가져오기
    const totalUserExp = userExp || 0;
    
    // 게임 경험치: 리덕스의 총 exp에서 문제와 답변 exp를 뺀 값
    const gameExp = Math.max(0, totalUserExp - problemExp - answerExp);
    
    return {
      problem: problemExp,
      answer: answerExp,
      game: gameExp,
      total: totalUserExp,
    };
  }, [myData?.quizMyPage, myData?.answerExp, userExp]);

  // 타자 데이터 상태
  const [typingData, setTypingData] = useState({
    speed: 0,
    accuracy: 0,
    maxSpeed: 0,
  });

  useEffect(() => {
    if (sortedRecords) {
      setTypingData({
        speed: sortedRecords.typingRecordTypist || 0, // WPM (분당 단어 수) - 타자 속도
        accuracy: sortedRecords.typingRecordAccuracy || 0, // 정확도 (%)
        maxSpeed: sortedRecords.typingRecordTypist || 0, // 최고 속도 (WPM)
      });
    } else {
      setTypingData({
        speed: 0,
        accuracy: 0,
        maxSpeed: 0,
      });
    }
  }, [sortedRecords])



  // 파이 차트 계산
  // const pieChartGradient = useMemo(() => {
  //   const total = expData.total || 1;
  //   const cardFlip = expData.game || 0;
  //   const omok = expData.game || 0;
  //   const training = expData.problem || 0;
  //   const wordChain = expData.game || 0;
    
  //   let currentAngle = 0;
  //   const segments = [];
    
  //   if (cardFlip > 0) {
  //     const endAngle = currentAngle + (cardFlip / total) * 360;
  //     segments.push(`#7255EE ${currentAngle}deg ${endAngle}deg`);
  //     currentAngle = endAngle;
  //   }
    
  //   if (omok > 0) {
  //     const endAngle = currentAngle + (omok / total) * 360;
  //     segments.push(`#9585F2 ${currentAngle}deg ${endAngle}deg`);
  //     currentAngle = endAngle;
  //   }
    
  //   if (training > 0) {
  //     const endAngle = currentAngle + (training / total) * 360;
  //     segments.push(`#AB4BFF ${currentAngle}deg ${endAngle}deg`);
  //     currentAngle = endAngle;
  //   }
    
  //   if (wordChain > 0) {
  //     const endAngle = currentAngle + (wordChain / total) * 360;
  //     segments.push(`#C4B5FD ${currentAngle}deg ${endAngle}deg`);
  //     currentAngle = endAngle;
  //   }
    
  //   return segments.length > 0 ? segments.join(", ") : "#E9E9EE";
  // }, [expData]);
  
  // 파이 차트 데이터 - expData 기반으로 계산
  const data = useMemo(() => {
    // 경험치가 모두 0인 경우 기본값 설정 (차트가 보이도록)
    if (expData.total === 0) {
      return [
        { id: 'problem', value: 0, color:"#7255EE" },
        { id: 'answer', value: 0, color:"#9585F2" },
        { id: 'game', value: 0, color:"#AB4BFF" },
      ];
    }
    
    return [
      { id: 'problem', value: expData.problem, color:"#7255EE" },
      { id: 'answer', value: expData.answer, color:"#9585F2" },
      { id: 'game', value: expData.game, color:"#AB4BFF" },
    ];
  }, [expData]);

  // 1. 애니메이션을 위한 상태 추가
  const [pieAngles, setPieAngles] = useState({
    startAngle: -90,
    endAngle: -90, // 초기에는 닫힌 상태 (0)
  });

  // 2. 컴포넌트 마운트 시 애니메이션 시작
  useEffect(() => {
   // 짧은 지연 시간 후 목표 각도로 업데이트하여 애니메이션 시작
  const timeout = setTimeout(() => {
      setPieAngles({
      startAngle: -90,
      endAngle: 270, // 펼쳐지는 각도 (360도 회전)
    });
  }, 200); // 200ms 지연

  return () => clearTimeout(timeout);
  }, []);

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
              {/* <S.PieChart $gradient={pieChartGradient} /> */}
              <div style={{ height: "200px", width: "100%" }}>
              <ResponsivePie
                  margin={{top: 15, right: 15, bottom: 15, left: 1}}
                  data={data}
                  innerRadius={0.5} // 도넛 모양 비율
                  padAngle={1}// 조각 사이 간격
                  colors={(datum) => datum.data.color} // 데이터별 색상
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  arcLabel={(d) => `${d.id}: ${d.value}`}
                  arcLabelsRadiusOffset={0.7} // 라벨 위치 조정
                  enableArcLinkLabels={false} // 외부 라벨 끄기
                  theme={{
                    labels: {
                      text: {
                        fontSize: 12,
                        fontWeight: 'bold',
                      },
                    },
                  }}
                  animate={true}                   // 애니메이션 활성화
                  motionConfig="slow"            // 애니메이션 스타일을 좀 더 느리게 변경
                  // 3. 상태로 관리되는 각도 사용
                  startAngle={pieAngles.startAngle}                 // 시작 각도
                  endAngle={pieAngles.endAngle}                   // 끝 각도
                />
              </div>
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
              <S.TypingValue>{typingData.maxSpeed}</S.TypingValue>
              <S.TypingLabel>최고 속도</S.TypingLabel>
            </S.TypingItem>
          </S.TypingContent>
        </S.TypingCard>

      </S.Container>
    </S.Page>
  );
};

export default GradeContainer;
