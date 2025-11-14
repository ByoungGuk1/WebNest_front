import React from 'react';
import S from "./style";
import { Link } from 'react-router-dom';

const BackGround = () => {
  return (
    <S.BackWrap>
      <img src='assets/images/main-page/main-back.png'></img>
      <S.CardWrap>
        <S.SelfCard>
          <S.CardText>
            <p class="title">혼자서 배우기</p>
            <p>모르는 부분은 게시글에 작성해,</p>
            <p>프로그래밍을 혼자서 공부할 수 있어요.</p>
          </S.CardText>

          <S.CardThumSelf>
            <img src='assets/images/chicken.png' class='cardImage'></img>
          </S.CardThumSelf>

          <Link to={"/"}>
            <S.SelfButton>혼자서 시작하기</S.SelfButton>
          </Link>
        </S.SelfCard>

        <S.TogetherCard>
          <S.CardText>
            <p class="title">친구들과 함께하기</p>
            <p>코딩 문제를 친구들과 함께,</p>
            <p>프로그램을 공부할 수 있어요.</p>
          </S.CardText>

          <S.CardThumTogether>
            <img src='/assets/images/chickens.png' class='cardImage'></img>
          </S.CardThumTogether>

          <S.CardButtonWrap>
            <div>
              <Link to={"/"}>
                <S.CardButton>방장으로 시작</S.CardButton>
              </Link>
            </div>
            <div>
              <Link to={"/"}>
                <S.CardButton>빠른 입장</S.CardButton>
              </Link>
            </div>
          </S.CardButtonWrap>
        </S.TogetherCard>

      </S.CardWrap>
    </S.BackWrap>
  );
};

export default BackGround;