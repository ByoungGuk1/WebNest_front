// src/pages/mypage/MyPageContainer.jsx
import React, { useEffect, useRef, useState } from "react";        // 필요한 훅만 임포트(useMemo/useLocation 제거)
import { useSearchParams } from "react-router-dom";                 // 쿼리스트링 제어
import S from "./style";                                            // 스타일 네임스페이스
import FriendContainer from "./friend/FriendContainer";             // 탭 컴포넌트들
import LikePostContainer from "./likepost/LikePostContainer";
import GradeContainer from "./grade/GradeContainer";
import ModifyContainer from "./modify/ModifyContainer";
import QuestionBookmarkContainer from "./questionbookmark/QuestionBookmarkContainer";
import MyPostContainer from "./mypost/MyPostContainer";

// ① 탭 id → 컴포넌트 매핑(불변)
const TAB_COMPONENTS = {
  questionbookmark: QuestionBookmarkContainer,
  mypost: MyPostContainer,
  likepost: LikePostContainer,
  friend: FriendContainer,
  grade: GradeContainer,
  modify: ModifyContainer,
};

// ② 탭 목록을 모듈 상수로 승격
const TABS = [
  { id: "questionbookmark", label: "문제" },
  { id: "mypost",           label: "게시글" },
  { id: "likepost",         label: "좋아요" },
  { id: "friend",           label: "친구" },
  { id: "grade",            label: "등급" },
  { id: "modify",           label: "정보 수정" },
];

const MyPageContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();        // 쿼리스트링 상태

  // ③ 첫 진입 시 tab 파라미터 없으면 기본값으로 세팅
  useEffect(() => {
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "questionbookmark" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const activeTab = searchParams.get("tab") || "questionbookmark";  // 현재 활성 탭 id
  const isActive = (id) => id === activeTab;                        // 활성 여부 함수

  // ④ 이동형 인디케이터용 참조/상태
  const navRef = useRef(null);                                      // 탭 바 컨테이너
  const btnRefs = useRef([]);                                       // 각 탭 버튼 DOM
  const [indicator, setIndicator] = useState({ left: 0, width: 0 }); // 인디케이터 좌표/폭

  // ⑤ 특정 버튼 요소 위치로 인디케이터 이동
  const moveIndicatorToEl = (el) => {
    if (!el || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({ left: rect.left - navRect.left, width: rect.width });
  };

  // ⑥ 활성 탭 버튼에 맞춰 인디케이터 동기화
  const syncToActive = () => {
    const idx = TABS.findIndex((t) => isActive(t.id));
    const el = btnRefs.current[idx] || btnRefs.current[0];
    moveIndicatorToEl(el);
  };

  // ⑦ 활성 탭 변경/윈도우 리사이즈에 반응하여 인디케이터 재계산
  useEffect(() => {
    syncToActive();
    const onResize = () => syncToActive();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab]); // location.pathname 의존 제거

  // ⑧ 탭 클릭: 쿼리스트링 갱신 후 인디케이터 이동
  const handleTabClick = (id, ev) => {
    setSearchParams({ tab: id });                                   // preventDefault 불필요(버튼)
    moveIndicatorToEl(ev.currentTarget);
  };

  const ActiveComp = TAB_COMPONENTS[activeTab] || TAB_COMPONENTS.questionbookmark; // 현재 탭 컴포넌트 안전 처리


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
          {TABS.map((t, i) => (
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
