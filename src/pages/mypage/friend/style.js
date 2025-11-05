import styled from "styled-components";                           // styled-components 임포트
import theme from "../../../styles/theme";                        // 프로젝트 테마 임포트
import { h6Bold, h6Medium, h7Medium } from "../../../styles/common"; // (예비) 타이포 스타일

const S = {};                                                     // 네임스페이스 객체

S.Wrap = styled.div`
  padding: 45px 0 0 0;                                            /* 위 여백 */
  display: flex;                                                  /* 가로 배치 */
  align-items: center;                                            /* 세로 중앙 정렬 */
  justify-content: center;                                        /* 가로 중앙 정렬 */
  width: 100%;                                                    /* 전체 폭 */
  gap: 12px;                                                      /* 버튼 간격 */
`;

S.btn = styled.button`
  width: 86px;                                                    /* 탭 버튼 가로 */
  height: 40px;                                                   /* 탭 버튼 높이 */
  border-radius: 4px;                                             /* 둥근 모서리 */
  background-color: ${theme.PALETTE.primary.green.lightGray};           /* 기본 파랑 */
  color: ${theme.PALETTE.primary.green.gray};                                                 /* 텍스트 흰색 */
  border: none;                                                   /* 테두리 제거 */
  font-weight: 600;                                               /* 굵게 */
  cursor: pointer;                                                /* 포인터 */
  &[aria-pressed="true"] {
    color: ${theme.PALETTE.neutral.white.secondary};   /* 활성 탭 */
    background-color: ${theme.PALETTE.primary.blue.main};       /* 보라 강조 */
  }
`;

S.List = styled.ul`
  max-width: 1080px;                                              /* 본문 최대 폭 */
  margin: 24px auto 0;                                            /* 가운데 정렬 */
  padding: 0;                                                     /* 패딩 제거 */
  list-style: none;                                               /* 불릿 제거 */
`;

S.Item = styled.li`
  display: flex;                                                  /* 좌/우 배치 */
  align-items: center;                                            /* 세로 중앙 */
  justify-content: space-between;                                 /* 정보/버튼 분리 */
  padding: 16px 8px;                                              /* 패딩 */
  border-bottom: 1px solid rgba(0,0,0,0.08);                      /* 구분선 */
`;

S.User = styled.div`
  display: flex;                                                  /* 프로필/텍스트 가로 배치 */
  align-items: center;                                            /* 세로 중앙 */
  gap: 12px;                                                      /* 간격 */
`;

S.Profile = styled.div`                                           /* ✅ Avatar → Profile로 명칭 변경 */
  width: 40px;                                                    /* 크기 */
  height: 40px;                                                   /* 크기 */
  border-radius: 50%;                                             /* 원형 */
  background: #eee;                                               /* 임시 배경 (이미지 대신) */
`;

S.Meta = styled.small`
  display: block;                                                 /* 줄바꿈 */
  opacity: 0.6;                                                   /* 희미하게 */
`;

S.ActionBtn = styled.button`
  padding: 8px 12px;                                              /* 버튼 패딩 */
  border-radius: 8px;                                             /* 둥근 모서리 */
  border: 1px solid rgba(0,0,0,0.12);                             /* 연한 테두리 */
  background: ${({ $positive }) =>                                /* 탭에 따른 배경색 */
    $positive ? theme.PALETTE.primary.green.main : "#fff"};       
  color: ${({ $positive }) => ($positive ? "#fff" : "#333")};     /* 글자색 */
  font-weight: 600;                                               /* 굵게 */
  cursor: pointer;                                                /* 포인터 */
`;

export default S;                                                 // 기본 export
