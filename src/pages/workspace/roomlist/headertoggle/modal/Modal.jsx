import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import S from './style';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Modal = ({ toggleModal }) => {

    // 리덕스에서 있는 유저 아이디 가져오기
    const currentUser = useSelector(state => state.user.currentUser)
    const userId = currentUser?.id
    const naviagate = useNavigate()
    const {
        register, handleSubmit, getValues, watch, setValue, formState: { isSubmitting, isSubmitted, errors }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            myGameRoomType: 'PUBLIC',
            gameType: null,
            language: null,
            difficulty: null,
            quizCount: 5,
            gameRoomMaxPlayer: 8,
            gameRoomTitle: '',
            gameRoomPassKey: '',
            gameRoomIsTeam: 0, // 0: 개인전, 1: 팀전
        },
    })
    // watch hookform의 상태 변경 감지
    const roomType = watch("myChatRoomType");
    const gameType = watch("gameType"); // 문제 유형: 게임 이름
    const language = watch("language"); // 활용기술: 언어
    const difficulty = watch("difficulty"); // 난이도
    const quizCount = watch("quizCount"); // 문제 수
    const gameRoomMaxPlayer = watch("gameRoomMaxPlayer"); // 플레이어 수

    // 드롭다운 열림/닫힘 상태
    const [isGameTypeOpen, setIsGameTypeOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);

    // 옵션 리스트
    const gameTypeOptions = [
        { value: 'SNAKE', label: '뱀주사위놀이' },
        { value: 'OMOK', label: '오목' },
        { value: 'WORD', label: '끝말잇기' }
    ];

    const languageOptions = [
        { value: 'JAVA', label: 'JAVA' },
        { value: 'JS', label: 'JS' },
        { value: 'ORACLE', label: 'ORACLE' }
    ];

    const difficultyOptions = [
        { value: '초급', label: '초급' },
        { value: '중급', label: '중급' },
        { value: '중상급', label: '중상급' },
        { value: '상급', label: '상급' },
        { value: '최상급', label: '최상급' }
    ];

    const handleGameTypeSelect = (value) => {
        setValue("gameType", value);
        setIsGameTypeOpen(false);
    };

    const handleLanguageSelect = (value) => {
        setValue("language", value);
        setIsLanguageOpen(false);
    };

    const handleDifficultySelect = (value) => {
        setValue("difficulty", value);
        setIsDifficultyOpen(false);
    };

    const getSelectedLabel = (value, options) => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : '선택하세요';
    };

    const handleQuizCountChange = (delta) => {
        const currentValue = parseInt(quizCount) || 5;
        const newValue = Math.max(1, Math.min(20, currentValue + delta));
        setValue("quizCount", newValue);
    };

    const handlePlayerCountChange = (delta) => {
        const currentValue = parseInt(gameRoomMaxPlayer) || 8;
        const newValue = Math.max(2, Math.min(8, currentValue + delta));
        setValue("gameRoomMaxPlayer", newValue);
    };

    // 난이도를 숫자로 변환
    const convertDifficultyToNumber = (difficulty) => {
        const difficultyMap = {
            '초급': 1,
            '중급': 2,
            '중상급': 3,
            '상급': 4,
            '최상급': 5
        };
        return difficultyMap[difficulty] || 1;
    };

    const handleSumbmitForm = handleSubmit(async (data) => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!data.gameRoomTitle || !data.gameRoomTitle.trim()) {
            alert("방 제목을 입력해주세요.");
            return;
        }

        if (!data.gameType) {
            alert("문제 유형을 선택해주세요.");
            return;
        }

        if (!data.language) {
            alert("활용기술을 선택해주세요.");
            return;
        }

        if (!data.difficulty) {
            alert("난이도를 선택해주세요.");
            return;
        }

        // 백엔드 API 형식에 맞게 데이터 변환
        // userId는 Authentication에서 자동으로 가져오므로 request body에 포함하지 않음
        const gameRoomVO = {
            gameRoomTitle: data.gameRoomTitle.trim(),
            gameRoomIsTeam: data.gameRoomIsTeam || 0, // 0: 개인전, 1: 팀전
            gameRoomType: data.gameType, // SNAKE, OMOK, WORD
            gameRoomLanguage: data.language, // JAVA, JS, ORACLE
            gameRoomDifficult: convertDifficultyToNumber(data.difficulty), // 1~5
            gameRoomIsOpen: 1, // 기본값: 공개
            gameRoomMaxPlayer: parseInt(data.gameRoomMaxPlayer) || 8,
            gameRoomIsStart: 0, // 기본값: 시작 전
        };

        // 비밀번호가 있으면 추가 (빈 문자열이면 제외)
        if (data.gameRoomPassKey && data.gameRoomPassKey.trim()) {
            gameRoomVO.gameRoomPassKey = data.gameRoomPassKey.trim();
        }

        // 백엔드 API 형식: { "gameRoomVO": {...} }
        const requestData = {
            gameRoomVO: gameRoomVO
        };

        console.log("📤 방 만들기 요청 데이터:", requestData);
        console.log("📤 실제 전송할 JSON:", JSON.stringify(requestData, null, 2));

        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                alert("로그인이 필요합니다.");
                return;
            }

            // privateapi 패키지이므로 /private prefix 필요
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/game-rooms`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                method: "POST",
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ 방 만들기 실패:", {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorText
                });
                
                try {
                    const errorResult = JSON.parse(errorText);
                    alert(errorResult.message || `방 만들기에 실패했습니다. (${response.status})`);
                } catch {
                    alert(`방 만들기에 실패했습니다. (${response.status}: ${response.statusText})`);
                }
                return;
            }

            const result = await response.json();
            console.log("📥 방 만들기 응답:", result);

            if (result.data) {
                const createdRoomId = result.data.id;
                toggleModal();
                
                // gameType을 라우터 경로로 매핑
                const gameTypeToRoute = {
                    'SNAKE': 'snakepuzzle',
                    'OMOK': 'concave',
                    'WORD': 'lastword'
                };
                const routePath = gameTypeToRoute[data.gameType] || data.gameType.toLowerCase();
                
                // 게임방으로 이동 (gameRoomType에 따라 경로 변경)
                naviagate(`/workspace/rooms/${createdRoomId}/${routePath}`);
            } else {
                alert(result.message || "방 만들기에 실패했습니다.");
            }
        } catch (error) {
            console.error("방 만들기 에러:", error);
            alert(`방 만들기 중 오류가 발생했습니다: ${error.message || error}`);
        }
    })

    return (
        <S.Modal>
                    <S.ExitBtn onClick={() => { toggleModal() }}>X</S.ExitBtn>
            <form onSubmit={handleSumbmitForm}>
                <S.TitleWrap>
                    <p>방 만들기</p>
                </S.TitleWrap>
                <S.InnerWrap>
                    <S.LeftTitle>
                        <p>방 제목</p>
                        <p>비밀 번호</p>
                        <p>문제 유형</p>
                        <p>플레이어 수</p>
                        <p>활용기술</p>
                        <p>문제 수</p>
                        <p>난이도</p>
                    </S.LeftTitle>
                    <S.RightInputWrap>
                        <S.RightInput
                            type="text" placeholder='방제목 입력' name='gameRoomTitle' 
                            {...register("gameRoomTitle", { required: true })}
                        />
                        {errors && errors?.gameRoomTitle?.type === "required" && (
                            <p>방제목 입력하세요.</p>
                        )}
                        <S.RightInput 
                            type="password" 
                            placeholder='선택사항 (20글자 내외)' 
                            name='gameRoomPassKey'
                            {...register("gameRoomPassKey")}
                        />
                        {roomType === "PRIVATE" && (
                            <label>
                                <p>방 비밀번호</p>
                                <S.RightInput
                                    type="text" placeholder='비밀번호 입력'
                                />
                            </label>
                        )}
                        {/* 문제 유형 (게임 이름) 드롭다운 */}
                        <S.DropdownWrapper>
                            <S.DropdownButton 
                                type="button"
                                onClick={() => {
                                    setIsGameTypeOpen(!isGameTypeOpen);
                                    setIsLanguageOpen(false);
                                    setIsDifficultyOpen(false);
                                }}
                            >
                                {getSelectedLabel(gameType, gameTypeOptions)}
                                <S.DropdownArrow $isOpen={isGameTypeOpen}>▼</S.DropdownArrow>
                            </S.DropdownButton>
                            {isGameTypeOpen && (
                                <S.DropdownMenu>
                                    {gameTypeOptions.map((option) => (
                                        <S.DropdownItem
                                            key={option.value}
                                            onClick={() => handleGameTypeSelect(option.value)}
                                            $isSelected={gameType === option.value}
                                        >
                                            {option.label}
                                        </S.DropdownItem>
                                    ))}
                                </S.DropdownMenu>
                            )}
                        </S.DropdownWrapper>
                        {/* 플레이어 수 (버튼 + 입력) */}
                        <S.NumberInputWrapper>
                            <S.NumberButton type="button" onClick={() => handlePlayerCountChange(-1)}>-</S.NumberButton>
                            <S.NumberInput 
                                type="number" 
                                min="2" 
                                max="8"
                                value={gameRoomMaxPlayer || 8}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value) || 2;
                                    const clampedValue = Math.max(2, Math.min(8, value));
                                    setValue("gameRoomMaxPlayer", clampedValue);
                                }}
                                name='gameRoomMaxPlayer'
                                {...register("gameRoomMaxPlayer", { valueAsNumber: true })}
                            />
                            <S.NumberButton type="button" onClick={() => handlePlayerCountChange(1)}>+</S.NumberButton>
                        </S.NumberInputWrapper>
                        {/* 활용기술 (언어) 드롭다운 */}
                        <S.DropdownWrapper>
                            <S.DropdownButton 
                                type="button"
                                onClick={() => {
                                    setIsLanguageOpen(!isLanguageOpen);
                                    setIsGameTypeOpen(false);
                                    setIsDifficultyOpen(false);
                                }}
                            >
                                {getSelectedLabel(language, languageOptions)}
                                <S.DropdownArrow $isOpen={isLanguageOpen}>▼</S.DropdownArrow>
                            </S.DropdownButton>
                            {isLanguageOpen && (
                                <S.DropdownMenu>
                                    {languageOptions.map((option) => (
                                        <S.DropdownItem
                                            key={option.value}
                                            onClick={() => handleLanguageSelect(option.value)}
                                            $isSelected={language === option.value}
                                        >
                                            {option.label}
                                        </S.DropdownItem>
                                    ))}
                                </S.DropdownMenu>
                            )}
                        </S.DropdownWrapper>
                        {/* 문제 수 (버튼만) */}
                        <S.NumberInputWrapper>
                            <S.NumberButton type="button" onClick={() => handleQuizCountChange(-1)}>-</S.NumberButton>
                            <S.NumberDisplay>{quizCount || 5}</S.NumberDisplay>
                            <S.NumberButton type="button" onClick={() => handleQuizCountChange(1)}>+</S.NumberButton>
                            <input type="hidden" name='quizCount' value={quizCount || 5} {...register("quizCount", { valueAsNumber: true })} />
                        </S.NumberInputWrapper>
                        {/* 난이도 드롭다운 */}
                        <S.DropdownWrapper>
                            <S.DropdownButton 
                                type="button"
                                onClick={() => {
                                    setIsDifficultyOpen(!isDifficultyOpen);
                                    setIsGameTypeOpen(false);
                                    setIsLanguageOpen(false);
                                }}
                            >
                                {getSelectedLabel(difficulty, difficultyOptions)}
                                <S.DropdownArrow $isOpen={isDifficultyOpen}>▼</S.DropdownArrow>
                            </S.DropdownButton>
                            {isDifficultyOpen && (
                                <S.DropdownMenu>
                                    {difficultyOptions.map((option) => (
                                        <S.DropdownItem
                                            key={option.value}
                                            onClick={() => handleDifficultySelect(option.value)}
                                            $isSelected={difficulty === option.value}
                                        >
                                            {option.label}
                                        </S.DropdownItem>
                                    ))}
                                </S.DropdownMenu>
                            )}
                        </S.DropdownWrapper>
                    </S.RightInputWrap>
                </S.InnerWrap>
                        <S.FormBtn disabled={isSubmitting}>방 개설하기</S.FormBtn>
            </form>
        </S.Modal>
    );
};

export default Modal;