// src/pages/community/post/postlist/components/Pagination.jsx
import React from "react";                     // 리액트 임포트
import S from "../style";                      // postlist의 스타일 재사용(../는 components 상위 폴더로 올라감)

/** 
 * 페이지네이션 컴포넌트
 * @param {number} current - 현재 페이지(1부터 시작)
 * @param {number} total - 전체 페이지 수
 * @param {function} onPrev - 이전 페이지로 이동 핸들러
 * @param {function} onNext - 다음 페이지로 이동 핸들러
 * @param {function} onPage - 특정 페이지로 이동 핸들러 (인자: 페이지 번호)
 */



const Pagination = ({ current = 1, total = 0, onPrev, onNext, onPage }) => {
  // total이 1 이하이면 표시 필요 없음 → 렌더 생략
  if (!total || total <= 1) return null;

  return (
    // 전체 페이지네이션 래퍼 (기존 S.Pagination 그대로 사용)
    <S.Pagination>
      {/* 왼쪽 화살표: 첫 페이지에서는 disabled */}
      <S.PageArrow
        className="left"                       // 좌측 방향 스타일용 클래스
        onClick={onPrev}                       // 이전 페이지 이동
        disabled={current === 1}               // 첫 페이지면 비활성화
        aria-label="이전 페이지"               // 접근성 라벨
      >
        <img src="/assets/icons/pnleftarrow.svg" alt="이전 페이지" />
      </S.PageArrow>

      {/* 페이지 숫자 버튼들: 1 ~ total */}
      {Array.from({ length: total }, (_, i) => {
        const page = i + 1;                    // 실제 페이지 번호(1부터)
        return (
          <S.PageButton
            key={page}                         // 리스트 키
            $active={current === page}         // 현재 페이지 강조
            onClick={() => onPage?.(page)}     // 특정 페이지 이동
            aria-current={current === page ? "page" : undefined} // 접근성 속성
          >
            {page}                             {/* 사용자에게 보이는 번호 */}
          </S.PageButton>
        );
      })}

      {/* 오른쪽 화살표: 마지막 페이지에서는 disabled */}
      <S.PageArrow
        className="right"                      // 우측 방향 스타일용 클래스
        onClick={onNext}                       // 다음 페이지 이동
        disabled={current === total}           // 마지막 페이지면 비활성화
        aria-label="다음 페이지"               // 접근성 라벨
      >
        <img src="/assets/icons/pnrightarrow.svg" alt="다음 페이지" />
      </S.PageArrow>
    </S.Pagination>
  );
};

export default Pagination;                     // 기본 내보내기
