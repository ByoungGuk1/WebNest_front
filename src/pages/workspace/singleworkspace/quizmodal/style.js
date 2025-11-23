// src/pages/cardflip/style.js
import styled from "styled-components";

const S = {};


// 결과 모달
S.ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
`;

S.ModalContent = styled.div`
    background: white;
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 9999;
`;

S.ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #e0e0e0;
`;

S.ModalTitle = styled.h2`
    font-size: 28px;
    font-weight: bold;
    color: #7345fd;
    margin: 0;
`;

S.CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 28px;
    color: #999;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
        background: #f0f0f0;
        color: #333;
    }
`;

S.MyResult = styled.div`
    margin-bottom: 24px;
    padding: 20px;
    background: linear-gradient(135deg, #7345fd 0%, #9d7aff 100%);
    border-radius: 16px;
    color: white;
`;

S.ResultTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
    color: white;
`;

S.ResultInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

S.ResultItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

S.ResultLabel = styled.span`
    font-size: 16px;
    font-weight: 500;
    opacity: 0.9;
`;

S.ResultValue = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

S.ResultsList = styled.div`
    margin-top: 24px;
`;

S.ResultsTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
`;

S.ResultRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    margin-bottom: 8px;
    background: ${({ $isMe }) => ($isMe ? '#f0f0ff' : '#f9f9f9')};
    border-radius: 12px;
    border: ${({ $isMe }) => ($isMe ? '2px solid #7345fd' : '2px solid transparent')};
    transition: all 0.2s;

    &:hover {
        background: ${({ $isMe }) => ($isMe ? '#e8e8ff' : '#f0f0f0')};
    }
`;

S.Rank = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #7345fd;
    min-width: 40px;
    text-align: center;
`;

S.UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
`;

S.UserThumbnail = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ddd;
`;

S.UserName = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #333;
`;

S.UserLevel = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #999;
    padding: 2px 8px;
    background: #e0e0e0;
    border-radius: 8px;
`;

S.ResultTime = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    min-width: 80px;
    text-align: right;
`;

S.ResultExp = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #7345fd;
    min-width: 80px;
    text-align: right;
`;

S.LoadingMessage = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #7345fd;
    padding: 40px 20px;
`;

export default S;
