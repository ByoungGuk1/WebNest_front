import React from 'react';
import S from './style';

const MiddleSearchBar = () => {
    return (
        <>
            <S.SearchWrap>
                <S.LeftWrap>
                    <S.LeftInput placeholder="친구 찾기">
                    </S.LeftInput>
                    <img src="/assets/icons/search.png" />
                </S.LeftWrap>

                <S.RightWrap>
                    <S.RightArrayWrap>
                        <span>최신순</span><S.IconBox><img src="/assets/icons/Symbol.svg" /></S.IconBox>
                    </S.RightArrayWrap>
                    <S.RightRefreshWrap>
                        <span>목록 새로고침</span><S.IconBox><img src="/assets/icons/Refresh.svg" /></S.IconBox>
                    </S.RightRefreshWrap>
                    <S.RightInputWrap>
                        <input></input>
                        <button></button>
                        {/* <S.RightInput placeholder="방 번호 또는 제목을 입력하세요" />
                        <img className="lastImg" src="/assets/icons/search.png" /> */}
                    </S.RightInputWrap>
                </S.RightWrap>
            </S.SearchWrap>
        </>
    );
};

export default MiddleSearchBar;