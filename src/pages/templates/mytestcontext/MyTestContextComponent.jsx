import React, { useContext } from 'react';
import { MyTestValueContext } from '../../../context/MyTestValueContext';

const MyTestContextComponent = () => {
  const {state, actions, loading, erorr} = useContext(MyTestValueContext)
  console.log(state.myData1)
  const myList = state.myData1.map((data, i) => (
    <li key={i}>{data}</li>
  ))
  return (
    <div>
      <p>{state.myData2["value1"]}</p>
      <ul>
        {myList}
      </ul>
    </div>
  );
};

export default MyTestContextComponent;