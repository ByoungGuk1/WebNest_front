import React from 'react';

const DiceThrow = ({ onThrow }) => {
  return (
    <button
      onClick={onThrow}
      style={{ position: 'absolute', top: 20, left: 20, padding: '10px 20px' }}
    >
      🎲 주사위 던지기
    </button>
  );
};

export default DiceThrow;
