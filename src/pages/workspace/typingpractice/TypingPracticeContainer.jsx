import React, { useEffect, useState } from "react";
import S from "./style";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ResultModal from "./typingresult/ResultModal";

const TypingPracticeContainer = () => {
   const location = useLocation();
    // 현재 경로가 long이면 긴글연습 active
  const isLong = location.pathname.includes("long");
  console.log("🔥 렌더링, isLong =", isLong);

  const [lang, setLang] = useState("ko");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  //타이머
  const [practiceTime, setPracticeTime] = useState(0);

  //정확도 타수
  const [practiceAccuracy, setPracticeAccuracy] = useState(100);
  const [practiceWPM, setPracticeWPM] = useState(0);
  const [practiceFinish, setPracticeFinish] = useState(null);

  // 디버깅: practiceFinish 변경 감지
  useEffect(() => {
    console.log("🔥 practiceFinish 상태 변경:", practiceFinish);
    if (practiceFinish) {
      console.log("🔥 practiceFinish 값 있음 - 모달 표시해야 함:", practiceFinish);
    } else {
      console.log("🔥 practiceFinish null - 모달 숨김");
    }
  }, [practiceFinish]);



  //타수
  const maxWpm = 400;
  const wpmPercent = Math.min((practiceWPM / maxWpm) * 100, 100);


    // 버튼 active는 반대로 들어감
  const isShortActive = isLong;   // 긴글 UI → 짧은글 버튼 파랑
  const isLongActive = !isLong;   // 기본 화면 → 긴글 버튼 초록


  useEffect(() => {
    if (isLong) {
      fetchLongTitleList();
    } else {
      fetchShortTitleList();
    }
  }, [lang, isLong]);


  const [titleList, setTitleList] = useState([]);
  const [selected, setSelected] = useState("");

  // 리스트 가져오기
  const fetchLongTitleList = async () => {
    try {
      const res = await fetch(`http://localhost:10000/typing/long/list?language=${lang === "ko" ? "한국어" : "영어"}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();   

      const list = data.data || [];
      setTitleList(list);

      if (list.length > 0) {
        setSelected(list[0].title);
        navigate(`long?id=${list[0].id}`);
      }
    } catch (error) {
      console.error("긴글 목록 로드 실패:", error);
      setTitleList([]);
    }
  };

  const fetchShortTitleList = async () => {
    try {
      const res = await fetch(`http://localhost:10000/typing/short/list?language=${lang === "ko" ? "한국어" : "영어"}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      const list = data.data || [];
      setTitleList(list);

      if (list.length > 0) {
        setSelected(list[0].title);
        navigate(`?id=${list[0].id}`);  // short는 long 경로 없음
      }
    } catch (error) {
      console.error("짧은글 목록 로드 실패:", error);
      setTitleList([]);
    }
  };

  return (
    <>
    <S.Main>
       {/* 상단 옵션 영역 */}
      <S.Option>
        <S.ModeSelect>

          {/* /typing → 긴 글 연습 버튼만 표시 */}
          {!isLong && (
            <S.ModeButton
              $active={true}           // 초록
              onClick={() => navigate("long")}
            >
              긴 글 연습
            </S.ModeButton>
          )}

          {/* /typing/long → 짧은 글 연습 버튼만 표시 */}
          {isLong && (
            <S.ModeButton
              $active={false}          // 파랑
              onClick={() => navigate("")}
            >
              짧은 글 연습
            </S.ModeButton>
          )}


        </S.ModeSelect>

        <S.LanguageSelect>
          <S.ToggleWrapper 
            onClick={() => setLang(lang === "ko" ? "en" : "ko")} 
            $lang={lang}
          >
            <S.ToggleButton 
              $lang={lang} 
              $mode={isLong ? "long" : "short"} 
            />

            <span className="ko">한국어</span>
            <span className="en">ENG</span>
          </S.ToggleWrapper>
        </S.LanguageSelect>
      </S.Option>

      {/* 전체 레이아웃 */}
      <S.TypingAll>
        {/* 왼쪽 내 정보 */}
        <S.MyInfo>
          <S.MyInfoInner>
            <S.SelectTitle>글선택</S.SelectTitle>

            {/* 🔽 선택된 값 표시 영역 */}
            <S.DropdownBox onClick={() => setIsOpen(!isOpen)}>
              <span>{selected}</span>
              <S.Arrow><img src="/assets/images/downarrow.svg" alt="화살표" /></S.Arrow>
            </S.DropdownBox>

            
            {isOpen && (
              <S.DropdownMenu>
                {titleList.map((item) => (
                  <S.DropdownItem
                    key={item.id}
                    onClick={() => {
                      setSelected(item.title);
                      setIsOpen(false);
                      if (isLong) {
                        navigate(`long?id=${item.id}`);
                      } else {
                        navigate(`?id=${item.id}`);
                      }

                    }}
                  >
                    {item.title}
                  </S.DropdownItem>
                ))}
              </S.DropdownMenu>
            )}


{/*   <S.ModeOption>짧은 글 연습</S.ModeOption> */}
            <S.ModeOption>
              {isLong ? "긴 글 연습" : "짧은 글 연습"}
            </S.ModeOption>

            <S.MyCharacter>
              <img src="/assets/images/chicken.png" alt="캐릭터" />
              <S.CharacterName>만렙코더</S.CharacterName>
            </S.MyCharacter>

            <S.ProgressTitle>현재 진행도</S.ProgressTitle>

            {/* <S.ProgressBox>
              <S.ProgressTime>
                <span>진행 시간 (초)</span>
                <span>05 : 02</span>
              </S.ProgressTime>
              <S.Bar className="blue" />
            </S.ProgressBox> */}
            <S.ProgressBox>
              <S.ProgressTime>
                <span>진행 시간 (초)</span>
                <span>{practiceTime.toFixed(1)}</span>
              </S.ProgressTime>
              <S.Bar className="blue" />
            </S.ProgressBox>
            <S.ProgressBox>
              <S.ProgressTime>
                <span>타수 (타/분)</span>
                {/* <span>208</span> */}
                <span>{practiceWPM.toFixed(2)}</span>

              </S.ProgressTime>
              {/* <S.Bar className="blue" /> */}
             <S.Bar 
                className="blue"
                $width={`${Math.max(wpmPercent, 1)}%`} // 최소 1%
              />



            </S.ProgressBox>

            <S.ProgressBox>
              <S.ProgressTime>
                <span>정확도 (%)</span>
                {/* <span>100.00</span> */}
                <span>{practiceAccuracy.toFixed(2)}</span>

              </S.ProgressTime>
              {/* <S.Bar className="red" /> */}
              <S.Bar 
                className="red"
                $width={`${Math.max(practiceAccuracy, 1)}%`}
              />



            </S.ProgressBox>
          </S.MyInfoInner>
        </S.MyInfo>

        {/* <Outlet /> */}

        {/* <Outlet context={{ setPracticeTime }} /> */}
        <Outlet context={{ 
          setPracticeTime, 
          setPracticeAccuracy,
          setPracticeWPM,
          setPracticeFinish
        }} />


      
      </S.TypingAll>

      {/* 오른쪽 아래 버튼 */}
      <S.StopPracticeButton onClick={() => navigate("/workspace/rooms")}>
        타자연습<br />그만하기
      </S.StopPracticeButton>

    </S.Main>

    {/* 결과 모달 */}
    {practiceFinish && (
      <>
        {console.log("🔥 ResultModal 렌더링 시도:", practiceFinish)}
        <ResultModal
          wpm={practiceFinish.wpm || 0}
          accuracy={practiceFinish.accuracy || 0}
          time={practiceFinish.time || 0}
          onRetry={() => {
            // console.log("🔥 다시하기 클릭");
            setPracticeFinish(null);
            window.location.reload();
          }}
          onClose={() => {
            // console.log("🔥 그만하기 클릭");
            setPracticeFinish(null);
            navigate("/workspace/rooms");
          }}
        />
      </>
    )}
     
    </>
  );
};

export default TypingPracticeContainer;
