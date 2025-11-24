import React, { useEffect, useMemo, useState } from 'react';
import S from "./style"
const UserResult = ({datas = [], search = "", count}) => {
    // id → isFollow 를 덮어쓰는 가벼운 로컬 상태
  const [followUI, setFollowUI] = useState({}); 

  const toggleFollow = (id, current) => {
    // 1) 화면 먼저 토글
    setFollowUI(prev => ({ ...prev, [id]: !current }));
    // 2) 여기서 실제 API 호출 (실패 시 다시 prev로 돌리면 됨)
    // api.post('/follow/toggle', { userId: id, follow: !current }).catch(() =>
    //   setFollowUI(prev => ({ ...prev, [id]: current }))
    // );
  };

  const getId = (u) => u.userId ?? u.id ?? u.userSeq ?? u.userNo ?? u.userNickname;

  const top3 = useMemo(() => {
    return [...datas]
    .sort((a, b) => (b.followerCount ?? b.followerCount ?? 0) - (a.followerCount ?? a.followerCount ?? 0))
    .slice(0, 3);
  }, [datas]);

  const changeTags = top3.map((user)=>{
    console.log(user)
    const id = getId(user);
        const isFollow = (id in followUI) ? followUI[id] : !!user.isFollow;
    let nickname = user.userNickname;
    let level = user.userLever;
    let followCount = user.followerCount;
    let levelImageUrl = "/assets/images/test-grade/grade" + level+".png"
    return(
      <>
      <div>
      <S.UserCard>
        <S.UserLeftWrap>
          <S.UserProfile>
            <img 
              src={`${process.env.REACT_APP_BACKEND_URL}/file/display?fileName=${user.userThumbnailUrl}${user.userThumbnailName}`}
              alt="" 
            />
            <S.UserLevelCard className='lv'>
              <img src={levelImageUrl} className='lvImg'></img>
              <span >Lv {level === 10 ? "X" : level}</span>
            </S.UserLevelCard>
          </S.UserProfile>
          <p>{nickname}</p>
          <span className='follower'>
            팔로워 : 
          </span>
          <span className='count'>
            {followCount > 1000 ? followCount / 1000 + "k": followCount}
          </span>
        </S.UserLeftWrap>
          {
            isFollow ? 
              <S.AlreadyFollowingBox
                as="button"
                type="button"
                onClick={() => toggleFollow(id, isFollow)}
              ><span>팔로잉</span></S.AlreadyFollowingBox> : 
              <S.HopeFollowingBox
                as="button"
                type="button"
                onClick={() => toggleFollow(id, isFollow)}
              ><span>팔로우</span></S.HopeFollowingBox>
          }
      </S.UserCard>
      </div>
      </>
    )
  })
  // 검색 결과 페이지에서는 헤더를 표시하고, 마이페이지에서는 숨김
  const showHeader = search !== undefined && search !== "";
  
  return (
    <div>
      {showHeader && (
        <S.HeaderRow>
          <div>친구 <span className="blue">{count || datas.length}</span></div>
          <S.CleanLinkPlus to={`/search/follow?search=${encodeURIComponent(search)}`}>
            <img src="/assets/icons/plus-black.png" alt="" />
            더보기
          </S.CleanLinkPlus>
        </S.HeaderRow>
      )}
      {changeTags}
    </div>
  );
};

export default UserResult;