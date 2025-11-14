import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Following = () => {

  const { following } = useOutletContext()

  return (
    <div>
      팔로잉
    </div>
  );
};

export default Following;