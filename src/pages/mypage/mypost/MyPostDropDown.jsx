// src/pages/mypage/mypost/MyPostsDropDown.jsx
import React, { useEffect, useState, forwardRef } from "react";        // 리액트 훅/forwardRef 임포트
import useDropDown from "../../../hooks/useDropDown";                   // 드롭다운 열림/닫힘 훅
import S from "../../quiz/quizdropdown/style";                          // 기존 드롭다운 스타일 재사용

// 드롭다운 항목(마이페이지 전용 목록)
const ITEMS = [
  { value: "latest",  label: "최신순" },                                // 최신순
  { value: "comment", label: "댓글순" },                                // 댓글순
  { value: "popular", label: "인기순" },                                // 인기순
];

/** 
 * ⛳ 프롭 필터러: 버튼용
 * - styled-components가 계산에 쓰는 select는 받되
 * - 실제 DOM <button>에는 내려보내지 않도록 제거
 */
const NoDomSelectButton = forwardRef(({ select, ...rest }, ref) => {    // select만 구조분해로 제거
  return <button ref={ref} {...rest} />;                                // 안전한 DOM 프롭만 전달
});
NoDomSelectButton.displayName = "NoDomSelectButton";

/**
 * ⛳ 프롭 필터러: 메뉴 래퍼용
 * - isDropped는 스타일 계산용으로만 쓰고
 * - 실제 DOM <div>에는 내려보내지 않도록 제거
 */
const NoDomDroppedDiv = forwardRef(({ isDropped, ...rest }, ref) => {   // isDropped만 제거
  return <div ref={ref} {...rest} />;                                   // 안전한 DOM 프롭만 전달
});
NoDomDroppedDiv.displayName = "NoDomDroppedDiv";

const MyPostsDropDown = ({ value = "latest", onChange }) => {           // 외부에서 초기값/변경 콜백 수신
  const [open, ref, handler] = useDropDown();                           // open: 열림상태, ref: 외부클릭 기준, handler: 토글
  const [selected, setSelected] = useState(value);                      // 현재 선택값 상태

  useEffect(() => {                                                     // 부모 value 변경 시 동기화
    setSelected(value);
  }, [value]);

  const labelOf = (v) =>                                                // value → 라벨 변환 유틸
    ITEMS.find((i) => i.value === v)?.label ?? "정렬";

  const select = (v) => {                                               // 항목 클릭 처리
    setSelected(v);                                                     // 내부 상태 갱신
    onChange?.(v);                                                      // 부모에 변경 알림
    handler();                                                          // 메뉴 닫기
  };

  const reset = () => select("latest");                                 // 필요 시 리셋(현재 미사용)

  return (
    <S.DropContainer>                                                   {/* 전체 래퍼 */}
      <S.ButtonWrap ref={ref}>                                          {/* 외부클릭 감지용 기준 노드 */}
        <S.DropDownButton
          as={NoDomSelectButton}                                        // ❗ DOM 프롭 필터러로 렌더(경고 방지)
          type="button"                                                 // 폼 submit 방지
          onClick={handler}                                             // 열림/닫힘 토글
          select={!!selected}                                           // 스타일 계산용 select(불리언 그대로)
          aria-haspopup="listbox"                                       // 접근성: 메뉴 존재
          aria-expanded={open}                                          // 접근성: 열림 상태
        >
          {labelOf(selected)}                                           {/* 현재 선택 라벨 */}
          <S.DropDownIconWrap>                                          {/* 아이콘 영역 */}
            <S.DropDownIcon />                                          {/* 아래화살표 아이콘 */}
          </S.DropDownIconWrap>
        </S.DropDownButton>

        <S.DropDownMenuWrap
          as={NoDomDroppedDiv}                                          // ❗ DOM 프롭 필터러로 렌더(경고 방지)
          isDropped={open}                                              // 스타일 계산용 열림 여부(불리언 그대로)
          role="listbox"                                                // 접근성: 목록 역할
        >
          {ITEMS.map((it) => (                                          // 항목 리스트
            <S.DropDownMenu
              key={it.value}                                            // 리스트 키
              onClick={() => select(it.value)}                          // 선택 핸들러
              role="option"                                             // 접근성: 옵션 역할
              aria-selected={selected === it.value}                     // 접근성: 선택 상태
            >
              {it.label}                                                {/* 항목 라벨 */}
            </S.DropDownMenu>
          ))}
        </S.DropDownMenuWrap>
      </S.ButtonWrap>
    </S.DropContainer>
  );
};

export default MyPostsDropDown;                                         // 기본 내보내기
