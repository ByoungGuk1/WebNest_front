import React from "react";
import S from "./style";

const UserGrade = ({ level }) => {
  const publicUrl = `/assets/images/level/`;
  const gradeUrl = {
    1: publicUrl + `1.svg`,
    2: publicUrl + `2.svg`,
    3: publicUrl + `3.svg`,
    4: publicUrl + `4.svg`,
    5: publicUrl + `5.svg`,
    6: publicUrl + `6.svg`,
    7: publicUrl + `7.svg`,
    8: publicUrl + `8.svg`,
    9: publicUrl + `9.svg`,
    10: publicUrl + `10.svg`,
  };

  return (
    <S.UserGradeWrap>
      <img src={gradeUrl[level]} alt="." />
      <div>LV {level}</div>
    </S.UserGradeWrap>
  );
};

export default UserGrade;
