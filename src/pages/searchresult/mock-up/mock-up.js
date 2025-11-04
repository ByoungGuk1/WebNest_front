// mock/genQuestionPosts.js
export const genQuestionPosts = (n = 10) =>
  Array.from({ length: n }, (_, i) => ({
    id: `q-${i + 1}`,
    postTitle: `질문 제목 ${i + 1}`,
    postContent: `질문 내용 샘플 ${i + 1}`,
    postLang: ["JS", "ORACLE", "JAVA"][i % 3],
    postCreateAt: new Date(Date.now() - i * 3600_000).toISOString(), // 1시간 간격
    createUserInfo: {
      userId: `u${(i % 50) + 1}`,
      userName: `사용자 ${(i % 50) + 1}`,
      userGrade: ((i % 10) + 1), // 1~10
      avatarUrl: `/static/avatars/${(i % 8) + 1}.png`,
    },
  }));
