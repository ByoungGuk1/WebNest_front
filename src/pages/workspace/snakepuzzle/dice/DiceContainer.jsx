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
    linearDamping: 0.95,
    angularDamping: 0.95,
  }));

  const isStoppedRef = useRef(false);

  const diceMeshRef = useRef();
  const positionUnsub = useRef(null);
  const quaternionUnsub = useRef(null);

  // Body의 위치/회전을 Mesh에 바로 적용
  React.useEffect(() => {
    positionUnsub.current = api.position.subscribe((p) => {
      if (diceMeshRef.current) {
        diceMeshRef.current.position.set(p[0], p[1], p[2]);
        // 주사위가 멈춘 후에도 떨림 방지
        if (isStoppedRef.current) {
          api.velocity.set(0, 0, 0);
          api.angularVelocity.set(0, 0, 0);
        }
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
      isStoppedRef.current = false;
      const offsetX = initialPosition ? initialPosition[0] : 0;
      const offsetZ = initialPosition ? initialPosition[2] : 0;
      
      // 주사위를 Ground 범위 내에서 시작 (Ground는 -0.25 ~ 0.25 범위)
      // 주사위를 충분히 높은 위치에서 시작 (땅과 낑기지 않도록)
      api.position.set(offsetX, 0.15, offsetZ);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
      
      // 즉시 주사위 굴리기 시작
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

      setTimeout(async () => {
        isStoppedRef.current = true;
        
        // 주사위가 멈추도록 속도 완전히 제거 (여러 번 반복)
        const stopInterval = setInterval(() => {
          api.velocity.set(0, 0, 0);
          api.angularVelocity.set(0, 0, 0);
        }, 30);
        
        // 추가로 안정화 시간을 두고 결과 확인 (시간 단축)
        await new Promise(resolve => setTimeout(resolve, 300));
        
        clearInterval(stopInterval);
        
        // 최종적으로 한 번 더 완전히 정지
        api.velocity.set(0, 0, 0);
        api.angularVelocity.set(0, 0, 0);
        
        // 현재 위치 고정
        const currentPos = diceMeshRef.current?.position;
        if (currentPos) {
          api.position.set(currentPos.x, currentPos.y, currentPos.z);
        }
        
        // 주사위를 반듯하게 정렬
        const currentQuat = diceMeshRef.current?.quaternion;
        if (currentQuat) {
          // 현재 쿼터니언으로 위쪽 면 계산
          const quat = new THREE.Quaternion(currentQuat.x, currentQuat.y, currentQuat.z, currentQuat.w);
          const up = new THREE.Vector3(0, 1, 0);
          
          // 주사위의 각 면 노멀 벡터 (로컬 좌표)
          const faceNormals = [
            { normal: new THREE.Vector3(0, 1, 0), value: 5 },
            { normal: new THREE.Vector3(0, -1, 0), value: 2 },
            { normal: new THREE.Vector3(0, 0, 1), value: 1 },
            { normal: new THREE.Vector3(0, 0, -1), value: 6 },
            { normal: new THREE.Vector3(1, 0, 0), value: 3 },
            { normal: new THREE.Vector3(-1, 0, 0), value: 4 },
          ];
          
          // 위쪽 면 찾기
          let maxDot = -Infinity;
          let topFace = null;
          
          faceNormals.forEach((face) => {
            const worldNormal = face.normal.clone().applyQuaternion(quat);
            const dot = worldNormal.dot(up);
            if (dot > maxDot) {
              maxDot = dot;
              topFace = face;
            }
          });
          
          // 위쪽 면이 정확히 위를 향하도록 회전 계산
          if (topFace) {
            const targetNormal = new THREE.Vector3(0, 1, 0);
            const currentWorldNormal = topFace.normal.clone().applyQuaternion(quat);
            
            // 회전축과 각도 계산
            const rotationAxis = new THREE.Vector3().crossVectors(currentWorldNormal, targetNormal).normalize();
            const angle = Math.acos(Math.max(-1, Math.min(1, currentWorldNormal.dot(targetNormal))));
            
            if (rotationAxis.length() > 0.001 && Math.abs(angle) > 0.001) {
              const alignQuat = new THREE.Quaternion().setFromAxisAngle(rotationAxis, angle);
              const finalQuat = quat.clone().multiply(alignQuat);
              api.quaternion.set(finalQuat.x, finalQuat.y, finalQuat.z, finalQuat.w);
            } else {
              // 이미 정렬되어 있으면 그대로 유지
              api.quaternion.set(quat.x, quat.y, quat.z, quat.w);
            }
          }
        }
        
        // 정렬 후 추가 안정화 시간
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const rolled = await getTopFace();
        console.log(`🎲 주사위 ${diceIndex + 1} 결과: ${rolled}`);
        if (onResult) {
          onResult(diceIndex, rolled);
        }
      }, 1500);
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
          enableRotate={false} 
          enableZoom={false}
          enablePan={false}
          target={[0, 0, 0]}
        />
        <Physics 
          gravity={[0, -9.8, 0]}
          defaultContactMaterial={{
            friction: 0.8,
            restitution: 0.1,
          }}
          tolerance={0.001}
          iterations={20}
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
