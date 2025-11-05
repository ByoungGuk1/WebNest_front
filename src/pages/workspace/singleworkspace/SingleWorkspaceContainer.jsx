import React from "react";
import { Outlet } from "react-router-dom";
import S from "./style";

const SingleWorkspaceContainer = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
      <h1>Single Workspace Page</h1>
      <S.LevelBadge1>
        <S.LevelIcon src="/assets/images/grade/grade1.png" alt="레벨 아이콘" />
        <span>Lv 1</span>
      </S.LevelBadge1>
      <S.LevelBadge2>
        <S.LevelIcon src="/assets/images/grade/grade2.png" alt="레벨 아이콘" />
        <span>Lv 2</span>
      </S.LevelBadge2>
      <S.LevelBadge3>
        <S.LevelIcon src="/assets/images/grade/grade3.png" alt="레벨 아이콘" />
        <span>Lv 3</span>
      </S.LevelBadge3>
      <S.LevelBadge4>
        <S.LevelIcon src="/assets/images/grade/grade4.png" alt="레벨 아이콘" />
        <span>Lv 4</span>
      </S.LevelBadge4>
      <S.LevelBadge5>
        <S.LevelIcon src="/assets/images/grade/grade5.png" alt="레벨 아이콘" />
        <span>Lv 5</span>
      </S.LevelBadge5>
      <S.LevelBadge6>
        <S.LevelIcon src="/assets/images/grade/grade6.png" alt="레벨 아이콘" />
        <span>Lv 6</span>
      </S.LevelBadge6>
      <S.LevelBadge7>
        <S.LevelIcon src="/assets/images/grade/grade7.png" alt="레벨 아이콘" />
        <span>Lv 7</span>
      </S.LevelBadge7>
      <S.LevelBadge8>
        <S.LevelIcon src="/assets/images/grade/grade8.png" alt="레벨 아이콘" />
        <span>Lv 8</span>
      </S.LevelBadge8>
      <S.LevelBadge9>
        <S.LevelIcon src="/assets/images/grade/grade9.png" alt="레벨 아이콘" />
        <span>Lv 9</span>
      </S.LevelBadge9>
      <S.LevelBadge10>
        <S.LevelIcon src="/assets/images/grade/grade10.png" alt="레벨 아이콘" />
        <span>Lv X</span>
      </S.LevelBadge10>

      <Outlet />
    </div>
  );
};

export default SingleWorkspaceContainer;
