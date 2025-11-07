import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import S from './style';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Modal = ({ toggleModal }) => {

    // 리덕스에서 있는 유저 아이디 가져오기
    const customerEmail = useSelector(state => state.user.currentUser.memberEmail)
    const naviagate = useNavigate()
    console.log("customerEmail", customerEmail)
    const {
        register, handleSubmit, getValues, watch, formState: { isSubmitting, isSubmitted, errors }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            myGameRoomType: 'PUBLIC',
        },
    })
    // watch hookform의 상태 변경 감지
    const roomType = watch("myChatRoomType");

    const handleSumbmitForm = handleSubmit(async (data) => {
        // 리덕스에 아이디 추가
        console.log("data : ", data)
        data.customerId = customerEmail
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/game-rooms/create-rooms`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(({ message, data }) => {
                console.log("data:", data)
                const { newRoomId } = data;
                toggleModal()
                naviagate(`/chat/${newRoomId}`)
            })
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
                            {...register("gameRoomTitle")}
                        />
                        {errors && errors?.gameRoomTitle?.type === "required" && (
                            <p>방제목 입력하세요.</p>
                        )}
                        <S.RightInput type="password" placeholder='선택사랑 (20글자 내외)' />
                        {roomType === "PRIVATE" && (
                            <label>
                                <p>방 비밀번호</p>
                                <S.RightInput
                                    type="text" placeholder='비밀번호 입력'
                                />
                            </label>
                        )}
                        <S.RightInput type="text" placeholder='전부 풀기' />
                        <S.RightInput type="text" placeholder='8명이하' />
                        <S.RightInput type="text" placeholder='JAVA' />
                        <S.RightInput type="text" placeholder='최대 10문제' />
                        <S.RightInput type="text" placeholder='초급' />
                    </S.RightInputWrap>
                </S.InnerWrap>
                        <S.FormBtn disabled={isSubmitting}>방 개설하기</S.FormBtn>
            </form>
        </S.Modal>
    );
};

export default Modal;