import React, { createContext } from 'react';

const GameContext = createContext({
    isHost: false,
    isGameStarted: false,
    onStartGame: () => { },
    onReady: () => { },
    onInvite: () => { },
    showInviteModal: false,
    setShowInviteModal: () => { },
    // 필요하면 추가 상태/핸들러를 여기에 문서화
});


export default GameContext;