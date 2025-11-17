import React, { useState } from 'react';
import S from './style';
import Modal from './modal/Modal';
import { useNavigate } from 'react-router-dom';

const HeaderToggle = ({ teamMode, onTeamModeChange, rooms }) => {
    // const [defficultOpen, defficultRef, defficultHandler] = useDropDown();
    const [difficult, setDifficult] = useState(0);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 입장 가능 방: 시작 안 함 + 공개
    const entrancableRooms = rooms.filter((list) => !list.gameRoomIsStart).filter((room) => room.gameRoomIsOpen)

    const randomIndex = Math.floor(Math.random() * entrancableRooms.length)
        

    const handleTeamToggle = () => {
        // null -> false (개인전) -> true (팀전) -> null (전체) 순환
        if (teamMode === null) {
            onTeamModeChange(false); // 개인전
        } else if (teamMode === false) {
            onTeamModeChange(true); // 팀전
        } else {
            onTeamModeChange(null); // 전체
        }
    };

    // 타입 -> 라우터 경로 매핑
    const mapTypeToRoute = (type) => {
        let t = type;
        if (t && typeof t === 'object') {
            if (t.value != null) t = t.value; else if (t.type != null) t = t.type; else if (t.name != null) t = t.name; else t = String(t);
        }
        const upper = (t || '').toString().toUpperCase();
        if (upper === 'SNAKE') return 'snakepuzzle';
        if (upper === 'OMOK') return 'concave';
        if (upper === 'WORD') return 'lastword';
        return (t || '').toString().toLowerCase();
    };

    const normalizeId = (raw) => {
        if (raw == null) return '';
        if (typeof raw === 'object') {
            if (raw.id != null) return String(raw.id);
            if (raw.value != null) return String(raw.value);
            if (raw.$numberLong != null) return String(raw.$numberLong);
            return '';
        }
        return String(raw);
    };

    const goToRandomRoom = () => {
        if (randomIndex < 0) {
            alert('입장 가능한 방이 없습니다.');
            return;
        }
        const room = entrancableRooms[randomIndex];
        const roomIdStr = encodeURIComponent(normalizeId(room?.id));
        const routePath = mapTypeToRoute(room?.gameRoomType);
        if (!roomIdStr || !routePath) {
            alert('방 정보가 올바르지 않습니다.');
            return;
        }

        // 비밀번호 방이면 입력 요청
        const hasPassword = room?.gameRoomPassKey != null && String(room.gameRoomPassKey).trim() !== '';
        if (hasPassword) {
            const input = window.prompt('비밀번호를 입력하세요.');
            if (input == null) return;
            if (String(input).trim() !== String(room.gameRoomPassKey).trim()) {
                alert('비밀번호가 올바르지 않습니다.');
                return;
            }
        }
        navigate(`/workspace/rooms/${roomIdStr}/${encodeURIComponent(routePath)}`);
    };

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

    return (
        <S.GameRoomToggleWrap>
            <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/plus2.png" alt='방만들기기' /></S.IconCircle><S.GameRoomToggleInnerText onClick={toggleModal}>방 만들기</S.GameRoomToggleInnerText>{isModalOpen && (
                <>
                    <Modal toggleModal={toggleModal} />
                    <S.ModalBG />
                </>
            )}</S.GameRoomToggle>
            <S.GameRoomToggle onClick={goToRandomRoom}><S.IconCircle><img src="/assets/icons/flash.png" alt='빠른입장'/></S.IconCircle><S.GameRoomToggleInnerText>빠른 입장</S.GameRoomToggleInnerText></S.GameRoomToggle>
            <S.GameRoomToggle onClick={nextLevel}><S.IconCircle><img src="/assets/icons/star.png" alt='난이도' /></S.IconCircle><S.GameRoomToggleInnerText>{currentDifficult.value}</S.GameRoomToggleInnerText></S.GameRoomToggle>
            <S.GameRoomToggle $isSelected={teamMode !== null} onClick={handleTeamToggle}>
                <S.IconCircle><img src="/assets/icons/people.png" alt='개인전' /></S.IconCircle>
                <S.GameRoomToggleInnerText $isSelected={teamMode !== null}>
                    {teamMode === null ? '전체' : (teamMode === false ? '개인전' : '팀전')}
                </S.GameRoomToggleInnerText>
            </S.GameRoomToggle>
            <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/computer.png" alt='게임방방'/></S.IconCircle><S.GameRoomToggleInnerText>게임방</S.GameRoomToggleInnerText></S.GameRoomToggle>
        </S.GameRoomToggleWrap>
    );
};

export default HeaderToggle;