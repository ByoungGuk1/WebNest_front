import React from 'react';
import MyTestContextComponent from './MyTestContextComponent';
import { MyTestValueProvider } from '../../../context/MyTestValueContext';

const MyTestContextContainer = () => {
  return (
    <MyTestValueProvider>
      <MyTestContextComponent />
    </MyTestValueProvider>
  );
};

export default MyTestContextContainer;