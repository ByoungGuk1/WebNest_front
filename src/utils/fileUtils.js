// fileUtils.js

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
 * ✅ [추가] 폴더 경로 + 파일 이름을 합쳐서 fileName 문자열을 만드는 함수
 * @param {string} path - 예: 'img/' 또는 '2025/11/20/' (뒤에 / 없으면 자동으로 붙여줌)
 * @param {string} name - 예: '1.jpg' 또는 'uuid_profile.png'
 * @returns {string} - 예: 'img/1.jpg', '2025/11/20/uuid_profile.png'
 */
export const buildFileName = (path, name) => {
  if (!path || !name) return '';

  // path 끝에 '/'가 없으면 붙여주기
  let normalizedPath = path.endsWith('/') ? path : `${path}/`;

  // 앞에 불필요한 '/'가 여러 개 있는 경우 제거 (예: '/img/' -> 'img/')
  normalizedPath = normalizedPath.replace(/^\/+/, '');

  return `${normalizedPath}${name}`; // 최종: 'img/1.jpg' 이런 형태
};

/**
 * ✅ [추가] path + name을 바로 받아서 display URL까지 만들어주는 함수
 * @param {string} path - 폴더 경로 (예: 'img/')
 * @param {string} name - 파일 이름 (예: '1.jpg')
 * @returns {string} - 최종 img src로 쓸 수 있는 URL
 */
export const getFileDisplayUrlFromPathAndName = (path, name) => {
  const fileName = buildFileName(path, name);
  if (!fileName) return '';
  return getFileDisplayUrl(fileName);
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
