import React, { useState } from "react";
import { useForm } from "react-hook-form";
import S from "./style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Modal = ({ toggleModal }) => {
  // 리덕스에서 있는 유저 아이디 가져오기
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id;
  const naviagate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      myGameRoomType: "PUBLIC",
      gameType: null,
      gameRoomMaxPlayer: 8,
      gameRoomTitle: "",
      gameRoomPassKey: "",
      gameRoomIsTeam: 1, // 0: 개인전, 1: 팀전
    },
  });
  // watch hookform의 상태 변경 감지
  const roomType = watch("myChatRoomType");
  const gameType = watch("gameType"); // 게임 유형: 게임 이름
  const gameRoomIsTeam = watch("gameRoomIsTeam"); // 팀전 여부
  const gameRoomMaxPlayer = watch("gameRoomMaxPlayer"); // 플레이어 수

  // 드롭다운 열림/닫힘 상태
  const [isGameTypeOpen, setIsGameTypeOpen] = useState(false);
  // 인풋 포커스 상태
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // 옵션 리스트
  const gameTypeOptions = [
    { value: "snakepuzzle", label: "뱀 주사위 놀이" },
    { value: "concave", label: "오목" },
    { value: "cardflip", label: "카드 뒤집기 놀이" },
    { value: "lastword", label: "끝말잇기" },
  ];


  const handleGameTypeSelect = (value) => {
    setValue("gameType", value);
    setIsGameTypeOpen(false);
    // 오목 또는 카드 뒤집기 선택 시 플레이어 수 2명으로 고정 및 팀전 비활성화
    // 다른 게임 유형으로 변경되면 기본값(8명)으로 복원
    if (value === "concave" || value === "cardflip") {
      setValue("gameRoomMaxPlayer", 2);
      setValue("gameRoomIsTeam", 0); // 팀전 불가
    } else {
      setValue("gameRoomMaxPlayer", 8);
    }
  };

  const getSelectedLabel = (value, options) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : "선택하세요";
  };

  const handlePlayerCountChange = (delta) => {
    const currentValue = parseInt(gameRoomMaxPlayer) || 8;
    const newValue = Math.max(2, Math.min(8, currentValue + delta));
    setValue("gameRoomMaxPlayer", newValue);
  };

  // 팀전 가능 여부 확인 (오목, 카드 게임은 팀전 불가)
  const isTeamModeAvailable = gameType !== "concave" && gameType !== "cardflip";

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
      alert("게임 유형을 선택해주세요.");
      return;
    }

    // 백엔드 API 형식에 맞게 데이터 변환
    // userId는 Authentication에서 자동으로 가져오므로 request body에 포함하지 않음
    // gameType을 백엔드 형식으로 변환 (대문자)
    const gameTypeToBackend = {
      snakepuzzle: "SNAKE",
      concave: "OMOK",
      cardflip: "CARD",
      lastword: "WORD",
    };
    const backendGameType = gameTypeToBackend[data.gameType] || data.gameType.toUpperCase();
    
    const gameRoomVO = {
      gameRoomTitle: data.gameRoomTitle.trim(),
      gameRoomIsTeam: data.gameRoomIsTeam || 0, // 0: 개인전, 1: 팀전
      gameRoomType: backendGameType, // SNAKE, OMOK, CARD, WORD
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
      gameRoomVO: gameRoomVO,
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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/private/game-rooms`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ 방 만들기 실패:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });

        try {
          const errorResult = JSON.parse(errorText);
          alert(
            errorResult.message ||
              `방 만들기에 실패했습니다. (${response.status})`
          );
        } catch {
          alert(
            `방 만들기에 실패했습니다. (${response.status}: ${response.statusText})`
          );
        }
        return;
      }

      const result = await response.json();
      console.log("📥 방 만들기 응답:", result);

      if (result.data) {
        const createdRoomId = result.data.id;
        toggleModal();

        // gameType이 이미 라우터 경로 형식이므로 그대로 사용
        const routePath = data.gameType;

        // 게임방으로 이동 (gameRoomType에 따라 경로 변경)
        naviagate(`/workspace/rooms/${createdRoomId}/${routePath}`);
      } else {
        alert(result.message || "방 만들기에 실패했습니다.");
      }
    } catch (error) {
      console.error("방 만들기 에러:", error);
      alert(`방 만들기 중 오류가 발생했습니다: ${error.message || error}`);
    }
  });

  const hasError = errors && errors?.gameRoomTitle?.type === "required";

  return (
    <S.Modal $hasError={hasError}>
      <S.ExitBtn
        onClick={() => {
          toggleModal();
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </S.ExitBtn>
      <S.InnerItems>
      <S.TitleWrap>
        <p>방 만들기</p>
      </S.TitleWrap>
      <S.Form onSubmit={handleSumbmitForm}>
        <S.LeftTitle>
          <S.Items>
            <p>방 제목</p>
            <S.RightInput
              type="text"
              placeholder="방제목 입력"
              name="gameRoomTitle"
              $focused={isTitleFocused}
              onFocus={() => setIsTitleFocused(true)}
              onBlur={() => setIsTitleFocused(false)}
              {...register("gameRoomTitle", { required: true })}
            />
          </S.Items>
          {errors && errors?.gameRoomTitle?.type === "required" && (
            <p>방제목 입력하세요.</p>
          )}
          <S.Items>
            <p>비밀 번호</p>
            <S.RightInput
              type="password"
              placeholder="선택사항 (20글자 내외)"
              name="gameRoomPassKey"
              $focused={isPasswordFocused}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              {...register("gameRoomPassKey")}
            />
            {roomType === "PRIVATE" && (
              <label>
                <p>방 비밀번호</p>
                <S.RightInput type="text" placeholder="비밀번호 입력" />
              </label>
            )}
          </S.Items>
          <S.Items>
            <p>게임 유형</p>
            <S.DropdownWrapper>
              <S.DropdownButton
                type="button"
                onClick={() => {
                  setIsGameTypeOpen(!isGameTypeOpen);
                }}
                $hasValue={!!gameType}
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
          </S.Items>
          <S.Items>
            <p>플레이어 수</p>
            <S.NumberInputWrapper>
              <S.NumberButton
                type="button"
                onClick={() => handlePlayerCountChange(-1)}
              >
                -
              </S.NumberButton>
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
                name="gameRoomMaxPlayer"
                {...register("gameRoomMaxPlayer", { valueAsNumber: true })}
              />
              <S.NumberButton
                type="button"
                onClick={() => handlePlayerCountChange(1)}
              >
                +
              </S.NumberButton>
            </S.NumberInputWrapper>
          </S.Items>
          {isTeamModeAvailable && (
            <S.Items>
              <p>팀전 여부</p>
              <S.DropdownWrapper>
                <S.DropdownButton
                  type="button"
                  onClick={() => {
                    const newValue = gameRoomIsTeam === 0 ? 1 : 0;
                    setValue("gameRoomIsTeam", newValue);
                  }}
                  $hasValue={true}
                >
                  {gameRoomIsTeam === 1 ? "팀전" : "개인전"}
                  <S.DropdownArrow $isOpen={false}>▼</S.DropdownArrow>
                </S.DropdownButton>
              </S.DropdownWrapper>
            </S.Items>
          )}
        </S.LeftTitle>
        <S.FormBtn disabled={isSubmitting}>방 개설하기</S.FormBtn>
      </S.Form>
      </S.InnerItems>
    </S.Modal>
  );
};

export default Modal;
