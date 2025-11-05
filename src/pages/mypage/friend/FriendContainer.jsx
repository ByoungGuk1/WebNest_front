import React, { useState } from 'react';              
import S from "./style";                             

const FriendContainer = () => {                       
  const [activeTab, setActiveTab] = useState("followers"); // 현재 탭 상태(기본: 팔로우)

  const followers = [                                 // 더미 데이터: 나를 팔로잉한 사용자들
    { id: 1, nickname: "부카기", meta: "팔로워 2.3K" },
    { id: 2, nickname: "코딩새", meta: "팔로워 1.1K" },
  ];
  const followings = [                                // 더미 데이터: 내가 팔로잉하는 사용자들
    { id: 3, nickname: "웹네스트", meta: "문제 120" },
    { id: 4, nickname: "JS토끼", meta: "문제 42"   },
  ];

  const list = activeTab === "followers" ? followers : followings; // 탭에 맞게 목록 선택
  
  return (                                       
    <div>                                           
      <S.Wrap>                                        {/* 가운데 정렬된 탭 영역 */}
        <S.btn onClick={() => setActiveTab("followers")} aria-pressed={activeTab === "followers"}>
          <span>팔로워</span>                          {/* 팔로워 탭 */}
        </S.btn>
        <S.btn onClick={() => setActiveTab("following")} aria-pressed={activeTab === "following"}>
          <span>팔로잉</span>                          {/* 팔로잉 탭 */}
        </S.btn>
      </S.Wrap>

      <S.List>                                        {/* 목록 컨테이너 */}
        {list.map(u => (                              // 사용자별 아이템 렌더
          <S.Item key={u.id}>                         {/* 한 줄 아이템 */}
            <S.User>                                  {/* 좌측: 프로필 + 텍스트 */}
              <S.Profile />                           {/* Profile로 변경된 원형 프로필 */}
              <div>                                  
                <span>{u.nickname}</span>         {/* 닉네임 */}
                <span><b>팔로워</b> 10</span>
              </div>
            </S.User>

            <S.ActionBtn                              
              $positive={activeTab === "following"}   /* 팔로잉 탭이면 초록 버튼 */
              onClick={() => {                        /* 추후 API 연동 자리 */
                console.log("click user:", u.id);
              }}
            >
              {activeTab === "followers" ? "팔로우" : "팔로잉"} {/* 라벨 분기 */}
            </S.ActionBtn>
          </S.Item>
        ))}
      </S.List>
    </div>
  );
};

export default FriendContainer;                      
