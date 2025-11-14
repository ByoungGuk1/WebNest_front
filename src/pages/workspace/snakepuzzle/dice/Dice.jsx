import React from 'react';
import { useGLTF } from '@react-three/drei';

const Dice = (props) => {
  const { scene } = useGLTF('/assets/gameroom/dice/dice.glb');
  // 주사위 모델을 복제하여 사용 (원본을 변경하지 않기 위해)
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  return <primitive object={clonedScene} scale={[0.0001, 0.0001, 0.0001]} {...props} />;
};

export default Dice;
