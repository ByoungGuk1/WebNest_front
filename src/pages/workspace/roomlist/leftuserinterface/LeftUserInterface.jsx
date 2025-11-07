import React, { useEffect, useState } from 'react';
import S from './style';

const LeftUserInterface = () => {

    const [users, setUsers] = useState(null);

    const maxExp = 1000;
    useEffect(() => {
        const getCurrentUser = async () => {
            const response = await fetch("/json_server/gamelist/user.json")
            if (!response.ok) throw new Error("게임리스트 오류");
            const jsonUsers = await response.json();
            const targetUser = jsonUsers?.users?.find((user) => user.userName == "만렙코더")
            setUsers(targetUser);
        }
        getCurrentUser()
            .then((res) => {
                console.log(res)
            })
            .catch(console.err)
    }, [])
    return (
        <S.LeftInterFaceWrap>
            <S.LeftFriendWrap>
                <span>맞팔로우를 통해 친구를 < br />사귀어보세요</span>
            </S.LeftFriendWrap>
            {users && (
                <S.LeftUserCardWrap>
                    {/* 유저카드헤더 */}
                    <S.LeftUserHeaderWrap>
                        <S.LeftUserHeaderLeft><img src="/assets/icons/usericon.svg" />내정보</S.LeftUserHeaderLeft>
                        <div>
                            <span><img src="/assets/icons/trophy.png" />업적</span>
                            <span><img src="/assets/icons/fire.png" /> {users.streak}</span>
                        </div>
                        
                    </S.LeftUserHeaderWrap>
                    {/* 유저카드바디 */}
                    <S.LeftUserMiddleWrap>
                        <S.UserProfileImgWrap>
                            <img src="/assets/images/chicken.png" />
                        </S.UserProfileImgWrap>
                        <S.LeftUserMiddleTextWrap>
                            <S.LeftUserCardName>
                                {users.userName}
                            </S.LeftUserCardName>
                            <S.UserInfoWrap>
                                <S.UserInfoRow>
                                    <S.UserInfoTitle>레벨</S.UserInfoTitle>
                                    <S.UserInfoContent level>LV {users.userLevel}</S.UserInfoContent>
                                </S.UserInfoRow>
                                <S.UserInfoRow>
                                    <S.UserInfoTitle><img src="/assets/icons/setting.svg" />기술</S.UserInfoTitle>
                                    <S.UserInfoContent>{users.mainSkill}</S.UserInfoContent>
                                </S.UserInfoRow>
                                <S.UserInfoRow>
                                    <S.UserInfoTitle>승리</S.UserInfoTitle>
                                    <S.UserInfoContent>{users.wins}승</S.UserInfoContent>
                                </S.UserInfoRow>
                            </S.UserInfoWrap>

                        </S.LeftUserMiddleTextWrap>
                    </S.LeftUserMiddleWrap>
                    {/* 유저카드푸터 */}
                    <S.LeftUserCheerUp>
                        <p>{users.statusMessage}</p>
                    </S.LeftUserCheerUp>
                    <S.ExpBarWrap>

                        <S.ExpBarFill style={{ width: `${(users.userExp / maxExp) * 100}%` }}>
                            <S.ExpText>{users.userExp} / {maxExp}</S.ExpText>
                        </S.ExpBarFill>
                    </S.ExpBarWrap>
                </S.LeftUserCardWrap>
            )}
        </S.LeftInterFaceWrap>
    );
};

export default LeftUserInterface;