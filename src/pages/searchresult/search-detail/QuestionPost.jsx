import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import S from "./style";

const QuestionPost = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "";
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]); // 항상 배열

  const badge = (langRaw) => {
    const lang = (langRaw || "").toLowerCase();
    if (lang === "java")   return <S.javaBox>JAVA</S.javaBox>;
    if (lang === "js")     return <S.jsBox>JS</S.jsBox>;
    return <S.oracleBox>ORACLE</S.oracleBox>;
  };

  useEffect(() => {
    (async () => {
      const resp = await fetch("/json_server/searchResponse/postSearchDetailResp.json");
      const data = await resp.json();
      // page1, page2 ... 형태면 우선 page1만
      const page1 = Array.isArray(data?.page1) ? data.page1 : [];
      setPosts(page1);
    })();
  }, []);

  return (
    <S.Container>
      <S.HeaderRow>
        <div>
          문제둥지 <span className="blue">{posts.length}</span>
        </div>
      </S.HeaderRow>

      <S.List>
        {posts.map((p) => (
          <S.Item
            key={p.postId}
            onClick={() => navigate(`/question/${p.postId}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(`/question/${p.postId}`)}
          >
            <S.BadgeCol>{badge(p.quizLanguage)}</S.BadgeCol>

            <S.TextCol>
              <S.TitleRow>
                {/* 배지랑 타이틀을 동일 라인에 배치하고 싶다면 배지를 여기로 옮겨도 됨 */}
                {/* <S.BadgeCol as="div">{badge(p.quizLanguage)}</S.BadgeCol> */}
                <S.Title title={p.postTitle}>{p.postTitle}</S.Title>
              </S.TitleRow>

              <S.Body>
                {p.postContent}
              </S.Body>
            </S.TextCol>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
};

export default QuestionPost;
