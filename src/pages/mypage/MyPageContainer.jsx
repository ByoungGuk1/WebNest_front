// src/pages/mypage/MyPageContainer.jsx
import React, { useMemo, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import S from "./style";
import FriendContainer from "./friend/FriendContainer";
import LikePostContainer from "./likepost/LikePostContainer";
import GradeContainer from "./grade/GradeContainer";
import ModifyContainer from "./modify/ModifyContainer";
import QuestionBookmarkContainer from "./questionbookmark/QuestionBookmarkContainer";
import MyPostContainer from "./mypost/MyPostContainer";


const TAB_COMPONENTS = {
  questionbookmark: QuestionBookmarkContainer,
  mypost: MyPostContainer,
  likepost: LikePostContainer,
  friend: FriendContainer,
  grade: GradeContainer,
  modify: ModifyContainer,
};

const MyPageContainer = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = useMemo(
    () => [
      { id: "questionbookmark", label: "문제" },
      { id: "mypost",           label: "게시글" },
      { id: "likepost",         label: "좋아요" },
      { id: "friend",           label: "친구" },
      { id: "grade",            label: "등급" },
      { id: "modify",           label: "정보 수정" },
    ],
    []
  );

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "questionbookmark" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const activeTab = searchParams.get("tab") || "questionbookmark";
  const isActive = (id) => id === activeTab;

  const navRef = useRef(null);
  const btnRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const moveIndicatorToEl = (el) => {
    if (!el || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({ left: rect.left - navRect.left, width: rect.width });
  };

  const syncToActive = () => {
    const idx = tabs.findIndex((t) => isActive(t.id));
    const el = btnRefs.current[idx] || btnRefs.current[0];
    moveIndicatorToEl(el);
  };

  useEffect(() => {
    syncToActive();
    const onResize = () => syncToActive();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, location.pathname]);

  const handleTabClick = (id, ev) => {
    ev.preventDefault();
    setSearchParams({ tab: id });
    moveIndicatorToEl(ev.currentTarget);
  };

  const ActiveComp = TAB_COMPONENTS[activeTab] || TAB_COMPONENTS.questionbookmark;

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

        <S.Tabs ref={navRef}>
          <span
            className="indicator"
            style={{ left: `${indicator.left}px`, width: `${indicator.width}px` }}
          />
          {tabs.map((t, i) => (
            <button
              key={t.id}
              className={`tab ${isActive(t.id) ? "active" : ""}`}
              ref={(el) => (btnRefs.current[i] = el)}
              onClick={(e) => handleTabClick(t.id, e)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </S.Tabs>

        <S.Content>
          <ActiveComp />
        </S.Content>
      </S.Wrapper>
    </S.Page>
  );
};

export default MyPageContainer;
