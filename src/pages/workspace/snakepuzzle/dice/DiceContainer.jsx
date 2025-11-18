import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
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
    args: [0.02, 0.02, 0.02], // 실제 크기 맞춤
    linearDamping: 0.95,
    angularDamping: 0.95,
  }));

  const isStoppedRef = useRef(false);
  const diceMeshRef = useRef();
  const positionUnsub = useRef(null);
  const quaternionUnsub = useRef(null);

  React.useEffect(() => {
    positionUnsub.current = api.position.subscribe((p) => {
      if (diceMeshRef.current) diceMeshRef.current.position.set(p[0], p[1], p[2]);
      if (isStoppedRef.current) {
        api.velocity.set(0, 0, 0);
        api.angularVelocity.set(0, 0, 0);
      }
    });
    quaternionUnsub.current = api.quaternion.subscribe((q) => {
      if (diceMeshRef.current) diceMeshRef.current.quaternion.set(q[0], q[1], q[2], q[3]);
    });

    return () => {
      positionUnsub.current?.();
      quaternionUnsub.current?.();
    };
  }, [api]);

  const getTopFace = async () => {
    return new Promise((resolve) => {
      api.quaternion.subscribe((q) => {
        const quat = new THREE.Quaternion(q[0], q[1], q[2], q[3]);
        const up = new THREE.Vector3(0, 1, 0);

        const faceNormals = [
          { normal: new THREE.Vector3(0, 1, 0), value: 5 },
          { normal: new THREE.Vector3(0, -1, 0), value: 2 },
          { normal: new THREE.Vector3(0, 0, 1), value: 1 },
          { normal: new THREE.Vector3(0, 0, -1), value: 6 },
          { normal: new THREE.Vector3(1, 0, 0), value: 3 },
          { normal: new THREE.Vector3(-1, 0, 0), value: 4 },
        ];

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

      // 랜덤 오프셋 추가해서 겹침 최소화
      const offsetX = initialPosition ? initialPosition[0] + (Math.random() - 0.5) * 0.02 : 0;
      const offsetZ = initialPosition ? initialPosition[2] + (Math.random() - 0.5) * 0.02 : 0;

      api.position.set(offsetX, 0.15, offsetZ);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);

      setTimeout(() => {
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
      }, 20);

      setTimeout(async () => {
        isStoppedRef.current = true;

        const stopInterval = setInterval(() => {
          api.velocity.set(0, 0, 0);
          api.angularVelocity.set(0, 0, 0);
        }, 30);

        await new Promise((resolve) => setTimeout(resolve, 500));
        clearInterval(stopInterval);

        const pos = diceMeshRef.current?.position;
        const quat = diceMeshRef.current?.quaternion;
        if (pos) api.position.set(pos.x, pos.y, pos.z);
        if (quat) api.quaternion.set(quat.x, quat.y, quat.z, quat.w);

        const rolled = await getTopFace();
        if (onResult) onResult(diceIndex, rolled);
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
    diceRef1.current?.throwDice();
    diceRef2.current?.throwDice();
  }, []);

  const handleDiceResult = React.useCallback((diceIndex, value) => {
    resultsRef.current[diceIndex] = value;
    if (resultsRef.current[0] !== null && resultsRef.current[1] !== null) {
      onDiceResult?.(resultsRef.current);
    }
  }, [onDiceResult]);

  React.useEffect(() => {
    window.throwDice3D = throwDice;
    return () => { delete window.throwDice3D; };
  }, [throwDice]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'transparent' }}>
      <Canvas shadows camera={{ position: [0, 1.2, 0.5], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} target={[0, 0, 0]} />
        <Physics
          gravity={[0, -9.8, 0]}
          defaultContactMaterial={{ friction: 0.8, restitution: 0.1 }}
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
