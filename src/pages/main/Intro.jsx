import React, { useEffect, useMemo, useRef, useState } from 'react';
import S from "./style";
import { Link } from 'react-router-dom';

const Intro = () => {
  // 스크롤 진입 감지 (카드 섹션)
  const cardsRef = useRef(null);
  const [cardsRevealed, setCardsRevealed] = useState(false);

  // 스크롤 진입 감지 (레벨 섹션)
  const levelsRef = useRef(null);
  const [levelsRevealed, setLevelsRevealed] = useState(false);
  const [eggsVisible, setEggsVisible] = useState(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCardsRevealed(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = levelsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLevelsRevealed(true);
        // 막대 애니메이션(순차 지연 총 길이) 이후 알 등장
        // 10개 * 120ms + 여유 500ms ≈ 1700ms
        setTimeout(() => setEggsVisible(true), 1700);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stepSlideStyle = (index) => {
    // 0: 좌->우, 1: 우->좌, 2: 좌->우
    const isLeftToRight = index % 2 === 0;
    const distance = 60; // 이동 거리 증가
    const delay = index * 160; // 지연 증가
    const duration = 800; // 속도 느리게
    return {
      opacity: cardsRevealed ? 1 : 0,
      transform: cardsRevealed ? 'translateX(0)' : (isLeftToRight ? `translateX(-${distance}px)` : `translateX(${distance}px)`),
      transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
    };
  };

  // 카드 섹션 배경 페어(퍼즐 + 텍스트 래퍼) 동시 등장
  const bgPairStyle = {
    opacity: cardsRevealed ? 1 : 0,
    transform: cardsRevealed ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
    transition: 'opacity 700ms ease 0ms, transform 700ms ease 0ms',
  };

  const levels = useMemo(() => Array.from({ length: 10 }, (_, i) => i + 1), []);
  const barStyle = (idx) => ({
    opacity: levelsRevealed ? 1 : 0,
    transform: levelsRevealed ? 'translateY(0) scaleY(1)' : 'translateY(24px) scaleY(0.2)',
    transition: `opacity 700ms ease ${idx * 120}ms, transform 700ms ease ${idx * 120}ms`,
  });
  const eggStyle = (idx) => ({
    opacity: eggsVisible ? 1 : 0,
    transform: eggsVisible ? 'scale(1)' : 'scale(0.6)',
    transition: `opacity 480ms ease ${1100 + idx * 100}ms, transform 480ms ease ${1100 + idx * 100}ms`,
  });

  return (
    <S.IntroFullWrapper>
      <S.IntroStepWrap ref={cardsRef}>
        <img src='assets/images/main-page/puzzle.png' className='puzzle' style={bgPairStyle}></img>
        <S.IntroTextWrap style={bgPairStyle}>
          <S.IntroText>
            <div>
              <S.SubP>코딩이 처음이라면, </S.SubP>
              <span className="purple">연습하기</span>
              <span>부터!</span>
            </div>
            <p className="light">코딩이 처음이라도 할 수 있어요! 다양한 문제 유형을 풀어보면서 같이 코딩을 배워볼까요?</p>
          </S.IntroText>
        </S.IntroTextWrap>
        <S.StepWrap style={stepSlideStyle(0)}>
          <S.TextWrap>
              <div>
                <S.StepBox> <span>STEP 1</span></S.StepBox>
                <S.TextArea>
                    <span>프로그래밍 연습 문제</span>
                    <p>프로그래밍 언어를 몰라도 괜찮아요!</p>
                    <p>빈 칸 챌린지 문제를 풀어 보며 텍스트 코딩을 배워보세요.</p>
                </S.TextArea>
                <Link to={"/"}>
                  <S.ButtonBox>
                    훈련장 바로가기 &gt;
                  </S.ButtonBox>
                </Link>
              </div>
            </S.TextWrap>
          <img src="/assets/images/main-page/step1Img.png" alt="banner" />
        </S.StepWrap>
        <S.StepWrap style={stepSlideStyle(1)}>
          <S.TextWrap>
            <div>
              <S.StepBox> <span>STEP 2</span></S.StepBox>
              <S.TextArea>
                  <span>질문하기 활용</span>
                  <p>둥지 - 질문 탭에서 </p>
                  <p>도움을 주고 받으며 함께 성장할 수 있습니다.</p>
              </S.TextArea>
              <Link to={"/"}>
                <S.ButtonBox>
                  문제둥지 바로가기 &gt;
                </S.ButtonBox>
              </Link>
            </div>
          </S.TextWrap>
          <img src="/assets/images/main-page/banner-blue.png" alt="banner" />
        </S.StepWrap>
        <S.StepWrap style={stepSlideStyle(2)}>
          <S.TextWrap>
            <div>
              <S.StepBox> <span>STEP 3</span></S.StepBox>
              <S.TextArea>
                  <span>함께 코딩하기</span>
                  <p>다양한 코드 게임을 활용해</p>
                  <p>친구들과 같이 코딩을 재미있게 할 수 있습니다.</p>
              </S.TextArea>
              <Link to={"/"}>
                <S.ButtonBox>
                  <span>
                    게임장 바로가기 &gt;
                  </span>
                </S.ButtonBox>
              </Link>
            </div>
          </S.TextWrap>
          <img src="/assets/images/main-page/banner-red.png" alt="" />
        </S.StepWrap>
      </S.IntroStepWrap>
      {/* -----=  level 레이아웃  =----- */}
      <S.LevelBg className='level-bg' src={`${process.env.PUBLIC_URL}/assets/images/challenge-bg.svg`} alt="배경이미지" />
      <div ref={levelsRef}>
        <S.LvText>
          <span className='blue'>Web</span>
          <span className='green'>Nest</span>
          <span>&nbsp;&nbsp;레벨 시스템</span>
        </S.LvText>

        <S.LvRowWrap>
          {/* 1 */}
          <S.lvWrap style={barStyle(0)}>
            <div>
              <img src='/assets/images/main-page/levels/Lv1.svg' style={eggStyle(0)}></img>
            </div>
            <S.Lv1Box>
              <span>Lv 1</span>
            </S.Lv1Box>
          </S.lvWrap>

          {/* 2 */}
          <S.lvWrap style={barStyle(1)}>
            <S.LevelImageWrapper>
              <img src='/assets/images/level/2.svg' alt='Lv 2' className='level-2' style={eggStyle(1)}></img>
            </S.LevelImageWrapper>
            <S.Lv2Box> <span>Lv 2</span> </S.Lv2Box> 
          </S.lvWrap>

          {/* 3 */}
          <S.lvWrap style={barStyle(2)}>
            <div>
              <img src='/assets/images/main-page/levels/Lv3.png' style={eggStyle(2)}></img>
            </div>
            <S.Lv3Box> <span>Lv 3</span></S.Lv3Box>
          </S.lvWrap>

          {/* 4 */}
          <S.lvWrap style={barStyle(3)}>
            <S.LevelImageWrapper>
              <img src='/assets/images/level/4.svg' alt='Lv 4' className='level-4' style={eggStyle(3)}></img>
            </S.LevelImageWrapper>
            <S.Lv4Box> <span>Lv 4</span></S.Lv4Box>
          </S.lvWrap>

          {/* 5 */}
          <S.lvWrap style={barStyle(4)}>
            <S.LevelImageWrapper>
              <img src='/assets/images/level/5.svg' alt='Lv 5' className='level-5' style={eggStyle(4)}></img>
            </S.LevelImageWrapper>
            <S.Lv5Box> <span>Lv 5</span></S.Lv5Box>
          </S.lvWrap>

          {/* 6 */}
          <S.lvWrap style={barStyle(5)}>
            <S.LevelImageWrapper>
              <img src='/assets/images/level/6.svg' alt='Lv 6' className='level-6' style={eggStyle(5)}></img>
            </S.LevelImageWrapper>
            <S.Lv6Box> <span>Lv 6</span></S.Lv6Box>
          </S.lvWrap>

          {/* 7 */}
          <S.lvWrap style={barStyle(6)}>
            <div>
              <img src='/assets/images/main-page/levels/Lv7.png' style={eggStyle(6)}></img>
            </div>
            <S.Lv7Box> <span>Lv 7</span></S.Lv7Box>
          </S.lvWrap>

          {/* 8 */}
          <S.lvWrap style={barStyle(7)}>
            <div className="position">
              <img src='/assets/images/level/8.svg' className="lv8" alt='Lv 8' style={eggStyle(7)}></img>
            </div>
            <S.Lv8Box> <span>Lv 8</span></S.Lv8Box>
          </S.lvWrap>

          {/* 9 */}
          <S.lvWrap style={barStyle(8)}>
            <div className="position">
              <img src='/assets/images/main-page/levels/Lv9.png' className="lv9" style={eggStyle(8)}></img>
            </div>
            <S.Lv9Box> <span>Lv 9</span></S.Lv9Box>
          </S.lvWrap>

          {/* 10 */}
          <S.lvWrap style={barStyle(9)}>
            <div className="position">
              <img src='/assets/images/main-page/levels/Lv10.png' className="lv10" style={eggStyle(9)}></img>
            </div>
            <S.Lv10Box> <span>Lv X</span></S.Lv10Box>
          </S.lvWrap>
        </S.LvRowWrap>
      </div>
    </S.IntroFullWrapper>
  );
};

export default Intro;