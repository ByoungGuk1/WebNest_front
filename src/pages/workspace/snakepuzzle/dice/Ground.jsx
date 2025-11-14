import React from 'react';
import { usePlane } from '@react-three/cannon';

// 백그라운드
const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static',
  }));

  return (
    <mesh ref={ref} receiveShadow visible={false}>
      <planeGeometry args={[1, 1]} /> 
      <meshStandardMaterial color="#4DD998" />
    </mesh>
  );
};

export default Ground;
