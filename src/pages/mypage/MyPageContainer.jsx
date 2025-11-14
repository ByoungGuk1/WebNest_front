import { NavLink, Outlet } from "react-router-dom";
import S from "./style"; 
import { useEffect, useState } from "react";

const MyPageContainer = () => {
  
  const [myData, setMyData] = useState(null)

  // 마이페이지 데이터를 한 번에 불러온다.
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const getMyDatas = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/users/my-page`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        method: "GET",
      })

      if(!response.ok) throw new Error(`${response.status} getMyDatas error`)
      const datas = await response.json()
      setMyData(datas.data)
    }

    getMyDatas()
      .catch((err) => {
        console.log(`getMyDatas ${err}`)
      })
  }, [])

  return (
    <S.Page>
      <S.BannerWrap>
        <S.Banner>
          <S.BannerInner />
        </S.Banner>
      </S.BannerWrap>

      <S.Wrapper>
        <S.ProfileArea>
          <S.ProfileImg src="/assets/images/chicken.png" alt="프로필" />
          <div>
            <S.Nickname>희동고동희</S.Nickname>
          </div>
          <S.Follow>
            <span><b>팔로워</b> 20</span>
            <span><b>·</b></span>
            <span><b>팔로잉</b> 10</span>
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
        <Outlet context={
          {...myData}
        } />
      </S.Wrapper>
    </S.Page>
  );
};

export default MyPageContainer;
