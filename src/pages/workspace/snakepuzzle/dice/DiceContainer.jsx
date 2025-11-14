import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, useBox } from '@react-three/cannon';
import Dice from './Dice';
import Ground from './Ground';
import * as THREE from 'three';

const DicePhysics = React.forwardRef((props, ref) => {
  const { initialPosition, diceIndex, onResult } = props;
  const [diceRef, api] = useBox(() => ({
    mass: 1,
    position: initialPosition || [0, 2, 0],
    args: [0.0002, 0.0002, 0.0002],
  }));

  const diceMeshRef = useRef();
  const positionUnsub = useRef(null);
  const quaternionUnsub = useRef(null);

  // Body의 위치/회전을 Mesh에 바로 적용
  React.useEffect(() => {
    positionUnsub.current = api.position.subscribe((p) => {
      if (diceMeshRef.current) {
        diceMeshRef.current.position.set(p[0], p[1], p[2]);
      }
    });
    quaternionUnsub.current = api.quaternion.subscribe((q) => {
      if (diceMeshRef.current) {
        diceMeshRef.current.quaternion.set(q[0], q[1], q[2], q[3]);
      }
    });
    
    return () => {
      if (positionUnsub.current) {
        positionUnsub.current();
        positionUnsub.current = null;
      }
      if (quaternionUnsub.current) {
        quaternionUnsub.current();
        quaternionUnsub.current = null;
      }
    };
  }, [api]);

  // 위쪽 면 계산
  const getTopFace = async () => {
    return new Promise((resolve) => {
      api.quaternion.subscribe((q) => {
        const quat = new THREE.Quaternion(q[0], q[1], q[2], q[3]);
        const up = new THREE.Vector3(0, 1, 0);

        // Dice의 각 면이 향하는 로컬 노멀 벡터
        const faceNormals = [
          { normal: new THREE.Vector3(0, 1, 0), value: 5 },
          { normal: new THREE.Vector3(0, -1, 0), value: 2 },
          { normal: new THREE.Vector3(0, 0, 1), value: 1 },
          { normal: new THREE.Vector3(0, 0, -1), value: 6 },
          { normal: new THREE.Vector3(1, 0, 0), value: 3 },
          { normal: new THREE.Vector3(-1, 0, 0), value: 4 },
        ];

        // 월드 좌표로 변환 후 Y축과 각도 비교
        let maxDot = -Infinity;
        let topValue = 1;

        faceNormals.forEach((face) => {
          const worldNormal = face.normal.clone().applyQuaternion(quat);
          const dot = worldNormal.dot(up);
          if (dot > maxDot) {
            maxDot = dot;
            topValue = face.value;
          }
        });

        resolve(topValue);
      });
    });
  };

  React.useImperativeHandle(ref, () => ({
    throwDice: () => {
      const offsetX = initialPosition ? initialPosition[0] : 0;
      const offsetZ = initialPosition ? initialPosition[2] : 0;
      
      // 주사위를 Ground 범위 내에서 시작 (Ground는 -0.25 ~ 0.25 범위)
      // 주사위를 충분히 높은 위치에서 시작 (땅과 낑기지 않도록)
      api.position.set(offsetX, 0.15, offsetZ);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
      
      setTimeout(() => {
        // Ground 범위 내에서만 움직이도록 속도 제한
        api.velocity.set(
          (Math.random() - 0.5) * 0.5,
          2 + Math.random() * 0.5,
          (Math.random() - 0.5) * 0.5
        );
        api.angularVelocity.set(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        );
      }, 10);

      setTimeout(async () => {
        const rolled = await getTopFace();
        console.log(`🎲 주사위 ${diceIndex + 1} 결과: ${rolled}`);
        if (onResult) {
          onResult(diceIndex, rolled);
        }
      }, 2500);
    },
  }));

  return (
    <group ref={diceMeshRef}>
      <Dice />
    </group>
  );
});



const DiceContainer = ({ onDiceResult }) => {
  const diceRef1 = useRef();
  const diceRef2 = useRef();
  const resultsRef = useRef([null, null]);

  const throwDice = React.useCallback(() => {
    resultsRef.current = [null, null];
    if (diceRef1.current) diceRef1.current.throwDice();
    if (diceRef2.current) diceRef2.current.throwDice();
  }, []);

  const handleDiceResult = React.useCallback((diceIndex, value) => {
    resultsRef.current[diceIndex] = value;
    
    // 두 주사위 결과가 모두 나왔을 때 콜백 호출
    if (resultsRef.current[0] !== null && resultsRef.current[1] !== null) {
      if (onDiceResult) {
        onDiceResult(resultsRef.current);
      }
    }
  }, [onDiceResult]);

  React.useEffect(() => {
    window.throwDice3D = throwDice;
    return () => {
      delete window.throwDice3D;
    };
  }, [throwDice]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'transparent' }}>
      <Canvas shadows camera={{ position: [0, 1.2, 0.5], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        <OrbitControls 
          enableRotate={true} 
          enableZoom={true}
          enablePan={true}
          target={[0, 0, 0]}
        />
        <Physics 
          gravity={[0, -9.8, 0]}
          defaultContactMaterial={{
            friction: 0.4,
            restitution: 0.3,
          }}
          tolerance={0.0001}
          iterations={10}
        >
          <DicePhysics ref={diceRef1} initialPosition={[-0.1, 0.02, 0]} diceIndex={0} onResult={handleDiceResult} />
          <DicePhysics ref={diceRef2} initialPosition={[0.1, 0.02, 0]} diceIndex={1} onResult={handleDiceResult} />
          <Ground />
        </Physics>
      </Canvas>
    </div>
  );
};

export default DiceContainer;
