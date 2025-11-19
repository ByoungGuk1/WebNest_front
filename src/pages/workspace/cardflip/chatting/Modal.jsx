import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import S from './style';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Modal = ({handleModal}) => {
  
  // 리덕스에서 있는 유저 아이디 가져오기
  const customerId = useSelector(state => state.user.currentUser?.id)
  const naviagate = useNavigate()

  const {
      register, handleSubmit, getValues, watch, formState: {isSubmitting, isSubmitted, errors}
    } = useForm({
      mode: "onChange",
      defaultValues: {
        myChatRoomType: 'PUBLIC',
      },
    })

  // watch hookform의 상태 변경 감지
  const roomType = watch("myChatRoomType");

  const handleSumbmitForm = handleSubmit(async (data) => {
    // 리덕스에 아이디 추가
    data.customerId = customerId
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat-rooms/create-rooms`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(({message, data}) => {
      const {newRoomId} = data;
      handleModal()
      naviagate(`/chat/${newRoomId}`)
    })
  })

  return (
    <S.Modal>
      <form onSubmit={handleSumbmitForm}>
        <label>
          <S.TitleWrap>
            <p>방제목</p>
            <p onClick={() => {handleModal()}}>X</p>
          </S.TitleWrap>
          <input 
            type="text" placeholder='방제목 입력' name='myChatRoomName' 
            {...register("myChatRoomName")}
          />
          {errors && errors?.myChatRoomName?.type === "required" && (
            <p>방제목 입력하세요.</p>
          )}
        </label>
        <label>
          <p>공개 여부</p>
          <div>
            <label>
              <span>PUBLIC</span><input type="radio" value={"PUBLIC"} name='myChatRoomType' {...register("myChatRoomType")} />
            </label>
            <label>
              <span>PRIVATE</span><input type="radio" value={"PRIVATE"} {...register("myChatRoomType")} />
            </label>
          </div>
        </label>
        { roomType === "PRIVATE" && (
          <label>
            <p>방 비밀번호</p>
            <input 
              type="text" placeholder='비밀번호 입력' name='myChatRoomPassword'
              {...register("myChatRoomPassword")}
            />
          </label>
        )}
        <button disabled={isSubmitting}>방 개설하기</button>
      </form>
    </S.Modal>
  );
};

export default Modal;