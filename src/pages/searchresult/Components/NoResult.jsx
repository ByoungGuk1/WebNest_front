// src/pages/searchresult/Components/NoResult.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import S from "./style";

const NoResult = ({
  // 옵션: 상단 카운트가 있으면 넣어주고, 안 넣으면 0으로 표시됨
  total = 0,
  question = 0,
  discussion = 0,
  free = 0,
  friend = 0,
  activeTab = 1, // 1=전체, 2=문제, 3=토론, 4=자유, 5=친구
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  return (
    <S.Wrap>
      {/* 검색 인풋 */}
      <S.InputRow>
        <input
          placeholder="검색내용"
          defaultValue={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/search?search=${encodeURIComponent(e.currentTarget.value)}`);
            }
          }}
        />
        <img src="/assets/images/header/search.png" alt="검색" />
      </S.InputRow>

      {/* 탭 + 카운트 */}
      <S.Tabs>
        <S.Tab $active={activeTab === 1}>
          전체&nbsp;<span className="count">{total || ""}</span>
        </S.Tab>
        <S.Tab $active={activeTab === 2}>
          문제&nbsp;<span className="count">{question || ""}</span>
        </S.Tab>
        <S.Tab $active={activeTab === 3}>
          토론&nbsp;<span className="count">{discussion || ""}</span>
        </S.Tab>
        <S.Tab $active={activeTab === 4}>
          자유&nbsp;<span className="count">{free || ""}</span>
        </S.Tab>
        <S.Tab $active={activeTab === 5}>
          친구&nbsp;<span className="count">{friend || ""}</span>
        </S.Tab>
      </S.Tabs>

      {/* 빈 결과 카드 */}
      <S.EmptyCard>
        <S.IconWrap>
          <img src="/assets/images/cannotFound.png" alt="검색 아이콘" />
        </S.IconWrap>

        <S.EmptyText>
          <span className="term">“{search || "검색결과"}”</span> 와 일치하는 검색 결과가
          없습니다.
        </S.EmptyText>
      </S.EmptyCard>

      {/* 가이드 영역 */}
      <S.HelpGrid>
        <S.HelpBox>
          <S.HelpTitle>내가 직접 글쓰러 가기</S.HelpTitle>
          <ul>
            <li>
              <button type="button" onClick={() => navigate("/question/new")}>
                문제둥지에 글쓰러 가기
              </button>
            </li>
            <li>
              <button type="button" onClick={() => navigate("/post/new")}>
                자유둥지에 글쓰러 가기
              </button>
            </li>
          </ul>
        </S.HelpBox>

        <S.HelpBox>
          <S.HelpTitle>다른 키워드로 검색해주세요.</S.HelpTitle>
          <ul>
            <li>입력하신 단어의 철자가 정확한지 확인해 주세요.</li>
            <li>입력 단어 수를 줄이거나, 보다 일반적인 키워드로 검색해 보세요.</li>
            <li>쉼표 또는 %, #, @ ! 같은 특수문자를 제외하고 검색해 보세요.</li>
          </ul>
        </S.HelpBox>
      </S.HelpGrid>
    </S.Wrap>
  );
};

export default NoResult;
