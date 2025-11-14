import styled from "styled-components";
import { flexBeetweenRow, h6Medium } from "styles/common";

const S = {};

S.Wrapper = styled.div`
  width: 1440px;
  height: 100vh;
  margin: 0 auto;
  border: solid 1px #d9d9d9;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

S.MenuWrapper = styled.div`
  border: solid 1px #d9d9d9;
  display: flex;
  justify-content: right;
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
width: 1040px;
`;

S.ChattingLayout = styled.div`
  width: 320px;
  height: 700px;
`

S.MainWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

S.CardLayout = styled.div`
  border: solid 1px #d9d9d9;
  width: 100%;
  ${flexBeetweenRow}
  justify-content: space-around;
  gap: auto;
`;

S.HelperWwrap = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-top: 20px;
`

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
    background: linear-gradient(to bottom, #4DD998, #297351);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &[data-type="settings"] > span {
    background: linear-gradient(to bottom, #9585F2, #2F1BA4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &[data-type="exit"] > span {
    background: linear-gradient(to bottom, #FF7A65, #99493D);
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
`
export default S;
