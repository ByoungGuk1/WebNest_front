const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");

/**
 * 파일 표시 URL 생성
 * @param {string} fileName - 파일 이름 (경로 포함 가능)
 * @returns {string} - 파일 표시 URL
 */
export const getFileDisplayUrl = (fileName) => {
  if (!fileName) return '';
  return `${API_BASE}/file/display?fileName=${encodeURIComponent(fileName)}`;
};

/**
 * 파일 경로 생성 (업로드 경로 + 날짜 경로 + UUID + 파일명)
 * @param {string} uuid - 파일 UUID
 * @param {string} originalFileName - 원본 파일명
 * @param {string} datePath - 날짜 경로 (yyyy/MM/dd/), 없으면 오늘 날짜 사용
 * @returns {string} - 전체 파일 경로
 */
export const getFilePath = (uuid, originalFileName, datePath = null) => {
  if (!uuid || !originalFileName) return '';
  
  let path = datePath;
  if (!path) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    path = `${year}/${month}/${day}/`;
  }
  
  return `${path}${uuid}_${originalFileName}`;
};

