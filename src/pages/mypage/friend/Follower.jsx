import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Follower = () => {

  const {followers} = useOutletContext()

  return (
    <div>
      팔로워
    </div>
  );
};

export default Follower;