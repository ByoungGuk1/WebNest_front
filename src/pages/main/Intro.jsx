import React from 'react';
import S from "./style";

const Intro = () => {
  return (
    <S.IntroWrap>
      <S.TitleWrap>
        <img src='/assets/images/main-page/puzzle.png'></img>
        <S.IntroTitle>
          <span>코딩이 처음이라면,&nbsp;</span>
          <span class="purple">연습하기&nbsp;</span>
          <span>부터!</span>
        </S.IntroTitle>
          <p>코딩이 처음이라도 할 수 있어요! 다양한 문제 유형을 풀어보면서 같이 코딩을 배워볼까요?</p>
      </S.TitleWrap>
      <S.StepColWrap>
        <S.StepWrap>
          <S.Textwrap>
            <S.TextIcon>
              <span>STEP 1</span>
            </S.TextIcon>
            <S.TextArial>
              <p>프로그래밍 연습 문제</p>
              <strong>프로그래밍 언어를 몰라도 괜찮아요!</strong>
              <strong>빈 칸 챌린지 문제를 풀어 보며 텍스트 코딩을 배워보세요.</strong>
            </S.TextArial>
            <button>훈련장 바로가기</button>
          </S.Textwrap>
          <img src='/assets/images/main-page/step1Img.png' class='step'></img>
        </S.StepWrap>
        <S.StepWrap>
          <S.Textwrap>
            <S.TextIcon>
              <span>STEP 2</span>
            </S.TextIcon>
            <S.TextArial>
              <p>질문하기</p>
              <strong>문제 해결,토론하기에서 </strong>
              <strong>도움을 주고 받으며 함께 성장 할 수 있습니다.</strong>
            </S.TextArial>
            <button>둥지로 이동하기</button>
          </S.Textwrap>
          <img src='/assets/images/main-page/step1Img.png' class='step'></img>
        </S.StepWrap>
        <S.StepWrap>
          <S.Textwrap>
            <S.TextIcon>
              <span>STEP 3</span>
            </S.TextIcon>
            <S.TextArial>
              <p>함께 코딩하기</p>
              <strong>다양한 코드 게임을 활용해 </strong>
              <strong>친구들과 같이 코딩을 재미있게 할 수 있습니다.</strong>
            </S.TextArial>
            <button>게임장 바로가기 </button>
          </S.Textwrap>
          <img src='/assets/images/main-page/step1Img.png' class='step'></img>
        </S.StepWrap>

      </S.StepColWrap>
    </S.IntroWrap>
  );
};

export default Intro;