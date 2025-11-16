export const getPlayers = async (roomId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/player/${roomId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) return null;

    const response = await res.json();
    const players = response?.data || [];
    return Array.isArray(players) ? players : [];
  } catch (error) {
    return null;
  }
};

export const updatePlayerStatus = async (roomId, userId, updateData) => {
  try {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/player/${roomId}/${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      }
    );
  } catch (error) {}
};

export const updateAllUsersStatus = async (roomId, profileText, isReady) => {
  const players = await getPlayers(roomId);
  if (!players?.length) return;

  const updatePromises = players.map(async (player) => {
    const userId = player.userId || player.id;
    if (!userId) return;

    const updateData = {
      userId,
      gameRoomId: roomId,
      gameJoinIsHost: player.gameJoinIsHost || false,
      gameJoinTeamcolor: player.gameJoinTeamcolor,
      gameJoinMyturn: player.gameJoinMyturn || false,
      gameJoinProfileText: profileText,
      gameJoinIsReady: isReady ? 1 : 0,
    };

    return updatePlayerStatus(roomId, userId, updateData);
  });

  await Promise.all(updatePromises);
};

export const checkAllPlayersReady = async (roomId) => {
  const players = await getPlayers(roomId);
  if (!players?.length) return false;

  return players.every((player) => {
    const profileText = player.gameJoinProfileText?.trim() || "";
    const normalizedText = profileText.replace(/\s+/g, "");
    return normalizedText === "준비완료" || player.gameJoinIsReady === 1;
  });
};

export const selectRandomWord = (wordList) => {
  return wordList[Math.floor(Math.random() * wordList.length)];
};
