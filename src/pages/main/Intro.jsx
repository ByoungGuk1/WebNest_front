import React from 'react';
import S from "./style";
import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <S.IntroFullWrapper>
      <img src='assets/images/main-page/puzzle.png' class='puzzle'></img>
      <S.IntroTextWrap>
        <S.IntroText>
          <div>
            <p>코딩이 처음이라면, &nbsp;</p>
            <span class="purple">연습하기</span>
            <span>부터!</span>
          </div>
          <p class = "light">코딩이 처음이라도 할 수 있어요! 다양한 문제 유형을 풀어보면서 같이 코딩을 배워볼까요?</p>
        </S.IntroText>
      </S.IntroTextWrap>

      <S.StepWrap>
        <S.TextWrap>
          <S.StepBox> <span>STEP 1</span></S.StepBox>
          <S.TextArea>
              <span>프로그래밍 연습 문제</span>
              <p>프로그래밍 언어를 몰라도 괜찮아요!</p>
              <p>빈 칸 챌린지 문제를 풀어 보며 텍스트 코딩을 배워보세요.</p>
          </S.TextArea>
          <Link to={"/"}>
            <S.ButtonBox>
              훈련장 바로가기
            </S.ButtonBox>
          </Link>
        </S.TextWrap>

        <img src="assets/images/main-page/step1Img.png" alt="" />
      </S.StepWrap>

      <S.StepWrap>
        <S.TextWrap>
          <S.StepBox> <span>STEP 2</span></S.StepBox>
          <S.TextArea>
              <span>질문하기 활용</span>
              <p>둥지 - 질문 탭에서 </p>
              <p>도움을 주고 받으며 함께 성장할 수 있습니다.</p>
          </S.TextArea>
          <Link to={"/"}>
            <S.ButtonBox>
              문제둥지 바로가기
            </S.ButtonBox>
          </Link>
        </S.TextWrap>

        <img src="assets/images/main-page/step1Img.png" alt="" />
      </S.StepWrap>

      <S.StepWrap>
        <S.TextWrap>
          <S.StepBox> <span>STEP 3</span></S.StepBox>
          <S.TextArea>
              <span>함께 코딩하기</span>
              <p>다양한 코드 게임을 활용해</p>
              <p>친구들과 같이 코딩을 재미있게 할 수 있습니다.</p>
          </S.TextArea>
          <Link to={"/"}>
            <S.ButtonBox>
              <span>
                게임장 바로가기
              </span>
            </S.ButtonBox>
          </Link>
        </S.TextWrap>

        <img src="assets/images/main-page/step1Img.png" alt="" />
      </S.StepWrap>
      {/* -----=  level 레이아웃  =----- */}
      <div>
        <S.LvText>
          <span class='blue'>Web</span>
          <span class='green'>Nest</span>
          <span>&nbsp;&nbsp;레벨 시스템</span>
        </S.LvText>
      </div>

      <S.LvRowWrap>
        <S.lvWrap>
          <div>
            <img src='assets/images/main-page/levels/Lv1.svg'></img>
          </div>
          <S.Lv1Box>
            <span>Lv 1</span>
          </S.Lv1Box>
        </S.lvWrap>

        <S.lvWrap>
          <div>
            <img src='assets/images/main-page/levels/Lv2.svg'></img>
          </div>
          <S.Lv2Box> <span>Lv 2</span> </S.Lv2Box> 
        </S.lvWrap>

        <S.lvWrap>
          <div>
            <img src='assets/images/main-page/levels/Lv3.png' ></img>
          </div>
          <S.Lv3Box> <span>Lv 3</span></S.Lv3Box>
        </S.lvWrap>

        <S.lvWrap>
          <div>
            <img src='assets/images/main-page/levels/Lv4.png' ></img>
          </div>
          <S.Lv4Box> <span>Lv 4</span></S.Lv4Box>
        </S.lvWrap>

        <S.lvWrap>
          <div>
            <img src='assets/images/main-page/levels/Lv5.png' ></img>
          </div>
          <S.Lv5Box> <span>Lv 5</span></S.Lv5Box>
        </S.lvWrap>

        <S.lvWrap>
          <div>
            <img src='assets/images/main-page/levels/Lv6.png' ></img>
          </div>
          <S.Lv6Box> <span>Lv 6</span></S.Lv6Box>
        </S.lvWrap>

        <S.lvWrap>
          <div>
            <img src='assets/images/main-page/levels/Lv7.png' ></img>
          </div>
          <S.Lv7Box> <span>Lv 7</span></S.Lv7Box>
        </S.lvWrap>

        <S.lvWrap>
          <div class="position">
            <img src='assets/images/main-page/levels/Lv8.png' class="lv8"></img>
          </div>
          <S.Lv8Box> <span>Lv 8</span></S.Lv8Box>
        </S.lvWrap>

        <S.lvWrap>
          <div class="position">
            <img src='assets/images/main-page/levels/Lv9.png' class="lv9" ></img>
          </div>
          <S.Lv9Box> <span>Lv 9</span></S.Lv9Box>
        </S.lvWrap>

        <S.lvWrap>
          <div class="position">
            <img src='assets/images/main-page/levels/Lv10.png' class="lv10"></img>
          </div>
          <S.Lv10Box> <span>Lv X</span></S.Lv10Box>
        </S.lvWrap>
      </S.LvRowWrap>

    </S.IntroFullWrapper>



  );
};

export default Intro;