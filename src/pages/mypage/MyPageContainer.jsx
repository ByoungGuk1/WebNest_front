import { NavLink, Outlet } from "react-router-dom";
import S from "./style"; 
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { getFileDisplayUrl } from "../../utils/fileUtils";
import { getFileDisplayUrlFromPathAndName } from "../../utils/fileUtils";

const MyPageContainer = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [myData, setMyData] = useState(null)

  // 마이페이지 데이터를 한 번에 불러온다.
  const getMyDatas = async () => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      console.error("accessToken이 없습니다. 로그인이 필요합니다.");
      setMyData({});
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/users/my-page`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      })

      if(!response.ok) {
        const errorText = await response.text();
        console.error(`getMyDatas error: ${response.status}`, errorText);
        
        if (response.status === 401) {
          console.error("인증 실패 - 토큰이 유효하지 않거나 만료되었습니다.");
        }
        
        throw new Error(`${response.status} getMyDatas error: ${errorText}`);
      }
      
      const datas = await response.json();
      setMyData(datas.data || {});
    } catch (err) {
      console.error(`getMyDatas ${err}`);
      setMyData({}); // 빈 객체로 설정하여 에러 발생 시에도 기본값 제공
    }
  }

  useEffect(() => {
    getMyDatas();
  }, [])

  // 기본 프로필 이미지 경로
  const DEFAULT_PROFILE_IMAGE = "/assets/images/defalutpro.svg";

  // 프로필 이미지 URL 변환 
  const profileImageUrl = useMemo(() => {
    const thumbnailUrl = currentUser?.userThumbnailUrl;
    const thumbnailName = currentUser?.userThumbnailName;
    
    // 사진이 없거나 빈 값인 경우 기본 프로필 사진 반환
    if (!thumbnailUrl || thumbnailUrl === '' || thumbnailUrl === '/default' || thumbnailUrl === 'null' || thumbnailUrl === 'undefined') {
      return DEFAULT_PROFILE_IMAGE;
    }
    // 외부 URL이거나 assets 경로인 경우 그대로 사용
    if (thumbnailUrl.startsWith('http') || thumbnailUrl.startsWith('/assets')) {
      return thumbnailUrl;
    }
    
    // userThumbnailUrl과 userThumbnailName이 모두 있는 경우 새로운 형식 사용
    if (thumbnailUrl && thumbnailName) {
      return getFileDisplayUrlFromPathAndName(thumbnailUrl, thumbnailName) || DEFAULT_PROFILE_IMAGE;
    }
    
    // 기존 형식 호환성 유지 (전체 경로가 하나의 필드에 있는 경우)
    return DEFAULT_PROFILE_IMAGE;
  }, [currentUser?.userThumbnailUrl, currentUser?.userThumbnailName]);

  // 이미지 로드 실패 시 기본 프로필 사진으로 대체
  const handleImageError = (e) => {
    e.target.src = DEFAULT_PROFILE_IMAGE;
  };

  return (
    <S.Page>
      <S.BannerWrap>
        <S.Banner>
          <S.BannerInner />
        </S.Banner>
      </S.BannerWrap>

      <S.Wrapper>
        <S.ProfileArea>
          <S.ProfileImg 
            src={profileImageUrl} 
            alt="프로필"
            onError={handleImageError}
          />
          <div>
            <S.Nickname>{currentUser?.userNickname || "사용자"}</S.Nickname>
          </div>
          <S.Follow>
            <span><b>팔로워</b> {myData?.followers?.length || 0}</span>
            <span><b>·</b></span>
            <span><b>팔로잉</b> {myData?.following?.length || 0}</span>
          </S.Follow>
        </S.ProfileArea>
        <S.Tabs>
          <NavLink className={"tab"} to={"/my-page"} end>문제</NavLink>
          <NavLink className={"tab"} to={"/my-page/my-post"}>게시글</NavLink>
          <NavLink className={"tab"} to={"/my-page/like"}>좋아요</NavLink>
          <NavLink className={"tab"} to={"/my-page/friend/follower"}>친구</NavLink>
          <NavLink className={"tab"} to={"/my-page/grade"}>등급</NavLink>
          <NavLink className={"tab"} to={"/my-page/modify"}>정보수정</NavLink>
        </S.Tabs>
        <Outlet context={{
          ...myData,
          refreshData: getMyDatas
        }} />
      </S.Wrapper>
    </S.Page>
  );
};

export default MyPageContainer;
