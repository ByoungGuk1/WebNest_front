import { useState, useCallback } from 'react';

const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");

/**
 * 파일 업로드 관련 hooks
 * 파일 업로드 및 표시 기능을 제공합니다.
 */
const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 파일 업로드 함수
   * @param {File|File[]} files - 업로드할 파일 또는 파일 배열
   * @returns {Promise<string[]|null>} - 업로드된 파일의 UUID 배열 또는 null
   */
  const uploadFiles = useCallback(async (files) => {
    if (!files || (Array.isArray(files) && files.length === 0)) {
      setError('파일을 선택해주세요.');
      return null;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      
      // 단일 파일 또는 파일 배열 처리
      if (Array.isArray(files)) {
        files.forEach((file) => {
          if (file instanceof File) {
            formData.append('uploadFile', file);
          }
        });
      } else if (files instanceof File) {
        formData.append('uploadFile', files);
      } else {
        throw new Error('유효하지 않은 파일 형식입니다.');
      }

      const response = await fetch(`${API_BASE}/file/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`파일 업로드 실패: ${response.status} - ${errorText}`);
      }

      const uuids = await response.json();
      return Array.isArray(uuids) ? uuids : [uuids];
    } catch (err) {
      console.error('파일 업로드 중 오류:', err);
      setError(err.message || '파일 업로드에 실패했습니다.');
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  /**
   * 파일 표시 URL 생성
   * @param {string} fileName - 파일 이름 (경로 포함 가능)
   * @returns {string} - 파일 표시 URL
   */
  const getFileDisplayUrl = useCallback((fileName) => {
    if (!fileName) return '';
    return `${API_BASE}/file/display?fileName=${encodeURIComponent(fileName)}`;
  }, []);

  /**
   * 파일 경로 생성 (업로드 경로 + 날짜 경로 + UUID + 파일명)
   * @param {string} uuid - 파일 UUID
   * @param {string} originalFileName - 원본 파일명
   * @param {string} datePath - 날짜 경로 (yyyy/MM/dd/)
   * @returns {string} - 전체 파일 경로
   */
  const getFilePath = useCallback((uuid, originalFileName, datePath = '') => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const path = datePath || `${year}/${month}/${day}/`;
    return `${path}${uuid}_${originalFileName}`;
  }, []);

  /**
   * 썸네일 파일 경로 생성
   * @param {string} uuid - 파일 UUID
   * @param {string} originalFileName - 원본 파일명
   * @param {string} datePath - 날짜 경로 (yyyy/MM/dd/)
   * @returns {string} - 썸네일 파일 경로
   */
  const getThumbnailPath = useCallback((uuid, originalFileName, datePath = '') => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const path = datePath || `${year}/${month}/${day}/`;
    return `${path}t_${uuid}_${originalFileName}`;
  }, []);

  return {
    uploadFiles,
    getFileDisplayUrl,
    getFilePath,
    getThumbnailPath,
    uploading,
    error,
  };
};

export default useFileUpload;


