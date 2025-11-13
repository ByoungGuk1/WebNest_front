import styled from "styled-components";

const S = {};

S.Option = styled.div`
  width: 100%;
  padding: 30px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.ModeSelect = styled.div``;

S.ModeButton = styled.button`
  background-color: #0fce7e;
  color: white;
  border: none;
  border-radius: 100px;
  padding: 14px 40px;
  font-size: 18px;
  cursor: pointer;
`;

S.LanguageSelect = styled.div``;

S.LanguageToggle = styled.div`
  background-color: white;
  border-radius: 100px;
  padding: 6px 20px;
  font-size: 16px;
  border: 2px solid #e5e5e5;

  span {
    margin-left: 8px;
    opacity: 0.5;
  }
`;

S.TypingAll = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 20px;
`;

S.MyInfo = styled.div`
  width: 320px;
  min-height: 600px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #e2e8f0;
  padding: 25px;
`;

S.MyInfoInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

S.SelectTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
`;

S.DropdownBox = styled.div`
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.Arrow = styled.div`
  font-size: 14px;
`;

S.MyCharacter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px 0;

  img {
    width: 100px;
    height: 100px;
  }
`;

S.CharacterName = styled.div`
  font-size: 16px;
  margin-top: 10px;
  font-weight: 700;
`;

S.ProgressTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-top: 10px;
`;

S.ProgressBox = styled.div`
  p {
    font-size: 13px;
    color: #666;
    margin-bottom: 4px;
  }

  b {
    font-size: 16px;
    display: block;
    margin-bottom: 6px;
  }
`;

S.Bar = styled.div`
  width: 100%;
  height: 4px;

  &.blue {
    background-color: #4aa7ff;
  }
  &.red {
    background-color: #ff5e5e;
  }
`;

S.TypingSection = styled.div`
  width: 800px;
`;

S.SectionTitle = styled.div`
  background-color: #0fce7e;
  color: white;
  padding: 18px;
  border-radius: 8px;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
`;

S.InputBox = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  border: 2px solid #0fce7e;
  border-radius: 8px;
  margin-bottom: 25px;
`;

S.SentenceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style: none;

  li {
    background-color: white;
    padding: 16px;
    border-radius: 10px;
    font-size: 16px;
  }
`;

S.StopPracticeButton = styled.button`
  position: fixed;
  right: 50px;
  bottom: 50px;
  border: 2px solid #8b5cf6;
  color: #8b5cf6;
  background-color: white;
  border-radius: 100px;
  padding: 15px 30px;
  font-size: 16px;
  cursor: pointer;
`;

export default S;
