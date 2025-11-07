import styled from "styled-components";

const S = {}

S.Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background-color: white;
  z-index: 100;
  padding: 20px;
  font-size: 18px;
  
  & input[type='text'] {
    width: 200px;
    font-size: 18px;
  }
`;

S.TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

S.ModalBG = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;

S.Li = styled.li`
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 8px;
  border-radius: 5px;
`

export default S;