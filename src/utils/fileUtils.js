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

/**
 * 썸네일 파일 경로 생성
 * @param {string} uuid - 파일 UUID
 * @param {string} originalFileName - 원본 파일명
 * @param {string} datePath - 날짜 경로 (yyyy/MM/dd/), 없으면 오늘 날짜 사용
 * @returns {string} - 썸네일 파일 경로
 */
export const getThumbnailPath = (uuid, originalFileName, datePath = null) => {
  if (!uuid || !originalFileName) return '';
  
  let path = datePath;
  if (!path) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    path = `${year}/${month}/${day}/`;
  }
  
  return `${path}t_${uuid}_${originalFileName}`;
};

/**
 * 파일 크기 포맷팅
 * @param {number} bytes - 바이트 크기
 * @returns {string} - 포맷된 파일 크기 (예: "1.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * 이미지 파일인지 확인
 * @param {string} fileName - 파일명
 * @returns {boolean}
 */
export const isImageFile = (fileName) => {
  if (!fileName) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
  const lowerFileName = fileName.toLowerCase();
  return imageExtensions.some(ext => lowerFileName.endsWith(ext));
};

