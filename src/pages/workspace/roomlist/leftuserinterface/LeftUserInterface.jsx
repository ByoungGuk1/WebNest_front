import React from 'react';
import theme from '../../../../styles/theme';
import S from './style';

const LeftUserInterface = ({ myInfos = {}, myWinCount = 0 }) => {
    const maxExp = 1000;

    return (
        <S.LeftInterFaceWrap>
            <S.LeftUserCardWrap>
                    {/* 유저카드헤더 */}
                    <S.LeftUserHeaderWrap>
                        <S.LeftUserHeaderLeft><img src="/assets/icons/usericon.svg" />내정보</S.LeftUserHeaderLeft>
                        <div>
                            <span><img src="/assets/icons/trophy.png" />업적</span>
                            <span><img src="/assets/icons/fire.png" /> {myWinCount}</span>
                        </div>
                        
                    </S.LeftUserHeaderWrap>
                    {/* 유저카드바디 */}
                    <S.LeftUserMiddleWrap>
                        <S.UserProfileImgWrap>
                            <img src={myInfos.userThumbnailUrl || myInfos.profileUrl || '/assets/images/chicken.png'} alt={myInfos.userNickname || myInfos.nickname} />
                        </S.UserProfileImgWrap>
                        <S.LeftUserMiddleTextWrap>
                            <S.LeftUserCardName>
                                {myInfos.userNickname || myInfos.nickname || '익명'}
                            </S.LeftUserCardName>
                            <S.UserInfoWrap>
                                <S.UserInfoRow>
                                    <S.UserInfoTitle>레벨</S.UserInfoTitle>
                                    <S.UserInfoContent $level={true}>LV {myInfos.userLevel || myInfos.level || 1}</S.UserInfoContent>
                                </S.UserInfoRow>
                                <S.UserInfoRow>
                                    <S.UserInfoTitle><img src="/assets/icons/setting.svg" />기술</S.UserInfoTitle>
                                    <S.UserInfoContent>{myInfos.mainSkill || myInfos.userSkill || '-'}</S.UserInfoContent>
                                </S.UserInfoRow>
                                <S.UserInfoRow>
                                    <S.UserInfoTitle>승리</S.UserInfoTitle>
                                    <S.UserInfoContent>{myInfos.wins || myWinCount || 0}승</S.UserInfoContent>
                                </S.UserInfoRow>
                            </S.UserInfoWrap>

                        </S.LeftUserMiddleTextWrap>
                    </S.LeftUserMiddleWrap>
                    {/* 유저카드푸터 */}
                    <S.LeftUserCheerUp>
                        <p>{myInfos.statusMessage || myInfos.userStatusMessage || '상태 메시지가 없습니다.'}</p>
                    </S.LeftUserCheerUp>
                    <S.ExpBarWrap>
                        <S.ExpBarFill style={{ width: `${((myInfos.userExp || myInfos.exp || 0) / maxExp) * 100}%` }}>
                            <S.ExpText>{myInfos.userExp || myInfos.exp || 0} / {maxExp}</S.ExpText>
                        </S.ExpBarFill>
                    </S.ExpBarWrap>
            </S.LeftUserCardWrap>
        </S.LeftInterFaceWrap>
    );
};

export default LeftUserInterface;