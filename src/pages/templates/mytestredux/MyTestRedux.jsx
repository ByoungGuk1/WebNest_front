import React, { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myPayloadType } from '../../../modules/mytest';

const MyTestRedux = () => {
  // 리덕스의 액션을 발생하여 상태를 변경
  const dispatch = useDispatch()

  // 리덕의 값을 선택
  const mydata = useSelector((state) => state.mytest)

  // 리덕스 값은 랜더링 이후 검사할 것
  useEffect(() => {
    if(mydata == null){
      console.log("비교")
    }
  }, [])

  const changeName = () => {
    dispatch(myPayloadType("장보고"))
  }

  return (
    <div>
      <p>이름: {mydata?.myTestName}</p>
      <p>나이: {mydata?.myTestAge}</p>
      <p>주소: {mydata?.myTestAddress}</p>
      <button onClick={changeName}>이름 변경</button>
    </div>
  );
};

export default MyTestRedux;