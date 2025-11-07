import React, { useState } from 'react';
import S from './style';
import Modal from './modal/Modal';

const HeaderToggle = () => {
    // const [defficultOpen, defficultRef, defficultHandler] = useDropDown();
    const [difficult, setDifficult] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const difficultSelect = [
        { key: "초급", value: "초급" },
        { key: "중급", value: "중급" },
        { key: "중상급", value: "중상급" },
        { key: "상급", value: "상급" },
        { key: "최상급", value: "최상급" },
    ];
    const currentDifficult = difficultSelect[difficult]

    const nextLevel = () => {
        setDifficult((i) => (i + 1) % difficultSelect.length);
    }

    console.log("currentDifficult:", difficult)
    // <S.DropConatiner ref={defficultRef}>
    //     <S.ButtonWrap>
    //         {/* {defficultOpen && (  게임방 눌렀을때 게임선택 토글버튼 누르면 나오는 메뉴들
    //             <S.DropDownMenu> 
    //                 <span><S.ToggleIconCircle><img src="/assets/icons/os.svg" /></S.ToggleIconCircle>오목</span>
    //                 <span><S.ToggleIconCircle><img src="/assets/icons/snake.svg" /></S.ToggleIconCircle>뱀 퍼즐</span>
    //                 <span><S.ToggleIconCircle><img src="/assets/icons/ga.svg" /></S.ToggleIconCircle>끝말잇기</span>
    //                 <span><S.ToggleIconCircle><img src="/assets/icons/gamecard.svg" /></S.ToggleIconCircle>카드 뒤집기</span>
    //             </S.DropDownMenu>
    //           )} */}
    //     </S.ButtonWrap>
    // </S.DropConatiner>

    return (
        <S.GameRoomToggleWrap>
            <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/plus2.png" alt='방만들기기' /></S.IconCircle><S.GameRoomToggleInnerText onClick={toggleModal}>방 만들기</S.GameRoomToggleInnerText>{isModalOpen && (
                <>
                    <Modal toggleModal={toggleModal} />
                    <S.ModalBG />
                </>
            )}</S.GameRoomToggle>
            <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/flash.png" alt='빠른입장'/></S.IconCircle><S.GameRoomToggleInnerText>빠른 입장</S.GameRoomToggleInnerText></S.GameRoomToggle>
            <S.GameRoomToggle onClick={nextLevel}><S.IconCircle><img src="/assets/icons/star.png" alt='난이도' /></S.IconCircle><S.GameRoomToggleInnerText>{currentDifficult.value}</S.GameRoomToggleInnerText></S.GameRoomToggle>
            <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/people.png" alt='개인전' /></S.IconCircle><S.GameRoomToggleInnerText>개인전</S.GameRoomToggleInnerText></S.GameRoomToggle>
            <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/computer.png" alt='게임방방'/></S.IconCircle><S.GameRoomToggleInnerText>게임방</S.GameRoomToggleInnerText></S.GameRoomToggle>
        </S.GameRoomToggleWrap>
    );
};

export default HeaderToggle;