import React, { useMemo } from "react";
import S from "./style";

const QuestionPostResult = ({ datas = [], search = "" }) => {
  const top3 = useMemo(() => {
    return [...datas]
      .sort((a, b) => new Date(b.postCreateAt ?? b.createdAt ?? 0) - new Date(a.postCreateAt ?? a.createdAt ?? 0))
      .slice(0, 3);
  }, [datas]);

  const LangBadge = ({ lang = "" }) => {
    const k = String(lang).toLowerCase();
    if (k === "java")   return <S.javaBox>JAVA</S.javaBox>;
    if (k === "js")     return <S.jsBox>JS</S.jsBox>;
    return <S.oracleBox>ORACLE</S.oracleBox>;
  };

  return (
    <S.Container>
      <S.HeaderRow>
        <div>문제둥지 <span className="blue">{datas.length}</span></div>
        <S.CleanLinkPlus to={`/search-detail/question-post?search=${encodeURIComponent(search)}`}>
          <img src="/assets/icons/plus-black.png" alt="" />
          더보기
        </S.CleanLinkPlus>
      </S.HeaderRow>

      <S.List>
        {top3.map(post => (
          <S.Item key={post.postId ?? post.id}>
            <S.CleanLink>
              <S.BadgeCol>
                <LangBadge lang={post.quizLanguage ?? post.postLang} />
              </S.BadgeCol>

              <S.TextCol>
                <S.Title>{post.postTitle ?? post.title}</S.Title>

                {/* 네가 만들어둔 분할/하이라이트 결과를 여기 Body 안에만 넣으면 됨 */}
                <S.Body>
                  <span>{post.postContent}</span>
                </S.Body>
              </S.TextCol>
            </S.CleanLink>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
};

export default QuestionPostResult;
