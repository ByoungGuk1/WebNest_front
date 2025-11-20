import styled from "styled-components";
import { flexBeetweenRow, h6Medium } from "styles/common";

const S = {};

S.Background = styled.div`
  position: fixed;
  inset: 0;
  background-image: url("/assets/background/workspacebackground.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

S.Wrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
  /* border: solid 1px #d9d9d9; */
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

S.MenuWrapper = styled.div`
  border: solid 1px #d9d9d9;
  display: flex;
  justify-content: right;
  height: 700px;
`;

S.MenuLayout = styled.div`
  display: flex;
  justify-content: right;

  & > div {
    width: 300px;
    border: solid 1px #d9d9d9;
  }
`;

S.Content = styled.div`
  height: 100%;
  width: 100%;
`;

S.ChattingLayout = styled.div`
  width: 320px;
  height: 100%;
`;

S.MainWrapper = styled.div`
  ${flexBeetweenRow}
  gap: 40px;
`;

S.CardLayout = styled.div`
  /* border: solid 1px #d9d9d9; */
  width: 100%;
  ${flexBeetweenRow}
  justify-content: space-around;
  gap: auto;
`;

S.HeaderContainer = styled.div`
  /* width: 1160px; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

S.HelperWwrap = styled.div`
  display: flex;
  justify-content: end;
  width: 320px;
  margin: 36px 0;
`;

S.HelperItems = styled.div`
  width: 80px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 20px rgba(149, 133, 242, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 8px;
  & > span {
    ${h6Medium}
    user-select: none;
  }

  & > img {
    width: auto;
    height: auto;
    max-width: 20px;
    max-height: 100%;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    /* 벡터 이미지의 경우 아래 속성 사용 */
    /* image-rendering: auto; */
  }

  &[data-type="help"] > span {
    background: linear-gradient(to bottom, #4dd998, #297351);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &[data-type="settings"] > span {
    background: linear-gradient(to bottom, #9585f2, #2f1ba4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &[data-type="exit"] > span {
    background: linear-gradient(to bottom, #ff7a65, #99493d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 20px rgba(149, 133, 242, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }
`;
S.GameRoomToggle = styled.div`
    position: relative;
    width: 142px;
    height: 50px;
    border-radius: 25px;
    padding-left: 8px;
    background: ${({ $isSelected }) => $isSelected 
        ? 'linear-gradient(to right, #6D2FFD 0%, #7255EE 38%, #AB4BFF 100%)' 
        : '#F5F7FD'};
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1;
    
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 25px;
        padding: 3px;
        background: ${({ $isSelected }) => $isSelected 
            ? 'transparent' 
            : 'linear-gradient(to right, #AB4BFF, #7255EE, #2F58FD)'};
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
                mask-composite: exclude;
        z-index: 0;
        pointer-events: none;
        display: ${({ $isSelected }) => $isSelected ? 'none' : 'block'};
    }
    & > * {
        z-index: 1;
    }
    &:hover {
        background: ${({ $isSelected }) => $isSelected 
            ? 'linear-gradient(to right, #6D2FFD 0%, #7255EE 38%, #AB4BFF 100%)' 
            : 'linear-gradient(to left, #2F58FD, #7255EE, #AB4BFF)'};
    }
    &:hover ${S.GameRoomToggleInnerText} {
        -webkit-text-fill-color: ${({ $isSelected }) => $isSelected ? '#FFFFFF' : '#FFFFFF'};
        color: #FFFFFF;
    }
`;

S.ExitIconWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  & img {
    width: 50%;
  }
`

S.IconCircle = styled.div`
    width: 40px;
    height: 40px;
    background-color: #FFFFFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 20px;
        height: 20px;
    }
`;

S.GameRoomToggleInnerText = styled.span`
    ${h6Medium}
    background: linear-gradient(to right, #AB4BFF, #7255EE, #2F58FD);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    /* gap: 12px; */
`;

S.ToggleIconCircle = styled.div`
    width: 40px;
    height: 40px;
    background-color: #FFFFFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 30px;
        height: 30px;
    }
`;
export default S;
