import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../modules/user';
import useFileUpload from '../../../hooks/useFileUpload';
import { getFileDisplayUrl } from '../../../utils/fileUtils';
import { getFilePath } from '../../../utils/fileUtils';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { getFileDisplayUrlFromPathAndName } from "../../../utils/fileUtils";

const ModifyContainer = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({
    userName: '',
    userNickname: '',
    userEmail: '',
    userBirthday: '',
    userPhone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  
  const { uploadFiles, uploading: fileUploading } = useFileUpload();

  // Redux에서 사용자 정보를 가져와서 폼에 설정
useEffect(() => {
  if (currentUser && currentUser.id) {
    setFormData({
      userName: currentUser.userName || '',
      userNickname: currentUser.userNickname || '',
      userEmail: currentUser.userEmail || '',
      userBirthday: currentUser.userBirthday 
        ? new Date(currentUser.userBirthday).toISOString().split('T')[0]
        : '',
      userPhone: currentUser.userPhone || '',
    });

    const thumbnailUrl = currentUser.userThumbnailUrl;
    const thumbnailName = currentUser.userThumbnailName;

    // 기본 이미지
    if (!thumbnailUrl || thumbnailUrl === '/default') {
      setProfilePreview('/assets/images/defalutpro.svg');
      return;
    }

    // 외부 URL / assets 경로
    if (thumbnailUrl.startsWith('http') || thumbnailUrl.startsWith('/assets')) {
      setProfilePreview(thumbnailUrl);
      return;
    }

    // 폴더 + 파일명 조합
    if (thumbnailUrl && thumbnailName) {
      setProfilePreview(
        getFileDisplayUrlFromPathAndName(thumbnailUrl, thumbnailName)
      );
      return;
    }

    setProfilePreview('/assets/images/defalutpro.svg');
  }
}, [currentUser]);


  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 비밀번호 필드 변경 핸들러
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 현재 비밀번호 입력 시 에러 메시지 초기화 및 검증 상태 초기화
    if (name === 'currentPassword') {
      setPasswordError('');
      setIsPasswordVerified(false);
      // 현재 비밀번호가 비어있으면 새 비밀번호 필드도 초기화
      if (!value) {
        setPasswordData((prev) => ({
          ...prev,
          newPassword: '',
          confirmPassword: '',
        }));
      }
    }
  };

  // 현재 비밀번호 blur 핸들러 (포커스를 잃을 때 검증)
  const handleCurrentPasswordBlur = async () => {
    if (!passwordData.currentPassword) {
      return;
    }
    await handleVerifyCurrentPassword();
  };

  // 현재 비밀번호 검증 핸들러
  const handleVerifyCurrentPassword = async () => {
    if (!passwordData.currentPassword) {
      setPasswordError('');
      setIsPasswordVerified(false);
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setPasswordError('로그인이 필요합니다.');
        setIsPasswordVerified(false);
        return;
      }

      // 현재 비밀번호로 로그인 시도하여 검증
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            userEmail: currentUser.userEmail,
            userPassword: passwordData.currentPassword,
          }),
        }
      );

      if (response.ok) {
        setIsPasswordVerified(true);
        setPasswordError('');
      } else {
        setIsPasswordVerified(false);
        setPasswordError('현재 비밀번호와 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('비밀번호 검증 오류:', error);
      setIsPasswordVerified(false);
      setPasswordError('비밀번호 검증 중 오류가 발생했습니다.');
    }
  };

  // 프로필 이미지 선택 핸들러
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 기본 프로필 이미지로 변경
  const handleDefaultImage = () => {
    setProfileImage(null);
    setProfilePreview('/assets/images/defalutpro.svg');
  };

  // 비밀번호 표시/숨김 토글
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        setIsLoading(false);
        return;
      }

      // 비밀번호 변경이 있는지 확인
      const hasPasswordChange = 
        passwordData.currentPassword || 
        passwordData.newPassword || 
        passwordData.confirmPassword;

      if (hasPasswordChange) {
        // 비밀번호 변경 검증
        if (!passwordData.currentPassword) {
          alert('현재 비밀번호를 입력해주세요.');
          setIsLoading(false);
          return;
        }
        if (!passwordData.newPassword || passwordData.newPassword.length < 8) {
          alert('새 비밀번호는 8자 이상이어야 합니다.');
          setIsLoading(false);
          return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          alert('새 비밀번호가 일치하지 않습니다.');
          setIsLoading(false);
          return;
        }
      }

      // 사용자 정보 업데이트
      const updateData = {
        userName: formData.userName,
        userNickname: formData.userNickname,
        userEmail: formData.userEmail,
        userBirthday: formData.userBirthday 
          ? new Date(formData.userBirthday).toISOString()
          : null,
        userPhone: formData.userPhone || null,
      };

      // 프로필 이미지가 변경된 경우 파일 업로드
      if (profileImage) {
        const uuids = await uploadFiles([profileImage]);

        if (uuids && uuids.length > 0) {
          const uuid = uuids[0];
          const originalFileName = profileImage.name;
          
          // 백엔드 형식에 맞춰 날짜 경로 생성 (yyyy/MM/dd/)
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          const folderPath = `${year}/${month}/${day}/`; // "2025/11/24/"
          
          // 파일명 생성 (UUID_원본파일명)
          const fileName = `${uuid}_${originalFileName}`; // "uuid_originalFileName.jpg"
          
          // 폴더 경로와 파일명을 분리해서 저장
          updateData.userThumbnailUrl = folderPath; // "2025/11/" (경로만)
          updateData.userThumbnailName = fileName;  // "uuid_originalFileName.jpg" (파일명만)
        } else {
          alert('프로필 이미지 업로드에 실패했습니다.');
          setIsLoading(false);
          return;
        }
      } else if (profilePreview === '/assets/images/defalutpro.svg') {
        // 기본 이미지로 변경하는 경우
        updateData.userThumbnailName = 'default.jpg';
        updateData.userThumbnailUrl = '/default';
      }

      // 비밀번호 변경이 있는 경우 추가
      if (hasPasswordChange) {
        updateData.userPassword = passwordData.newPassword;
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/private/users/modify`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();
      console.log('Modify API 응답:', result);

      if (!response.ok) {
        // 현재 비밀번호가 일치하지 않는 경우
        if (result.message && (
          result.message.includes('비밀번호') || 
          result.message.includes('password') ||
          result.message.includes('일치하지') ||
          response.status === 401
        )) {
          setPasswordError('현재 비밀번호와 일치하지 않습니다.');
          setIsPasswordVerified(false);
        } else {
          alert(result.message || '정보 수정에 실패했습니다.');
        }
        setIsLoading(false);
        return;
      }

      // 성공 시 에러 메시지 초기화
      setPasswordError('');
      setIsPasswordVerified(false);

      // modify API 응답에서 업데이트된 사용자 정보 가져오기 (썸네일 포함)
      const updatedUserData = result?.data ?? result;
      console.log('업데이트된 사용자 데이터:', updatedUserData);
      
      if (updatedUserData && updatedUserData.id != null) {
        // 백엔드에서 반환한 업데이트된 사용자 정보(썸네일 포함)를 Redux에 저장
        dispatch(setUser(updatedUserData));
        console.log('Redux 업데이트 완료');
      } else {
        // 응답에 데이터가 없는 경우 /users/me로 다시 가져오기
        console.log('응답에 데이터가 없어 /users/me로 재요청');
        const userResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/private/users/me`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (userResponse.ok) {
          const userResult = await userResponse.json();
          const userData = userResult?.data ?? userResult;
          console.log('재요청한 사용자 데이터:', userData);
          if (userData && userData.id != null) {
            dispatch(setUser(userData));
            console.log('Redux 업데이트 완료 (재요청)');
          }
        }
      }

      alert('정보가 성공적으로 수정되었습니다.');

      // 비밀번호 필드 초기화
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordError('');
      setIsPasswordVerified(false);
    } catch (error) {
      console.error('정보 수정 오류:', error);
      alert('정보 수정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.ProfileSection>
        <S.ProfileImageWrapper>
          <S.ProfileImage 
            src={profilePreview} 
            alt="프로필" 
          />
        </S.ProfileImageWrapper>
        <S.ProfileButtonGroup>
          <S.ProfileButton onClick={handleDefaultImage}>
            기본 프로필 이미지
          </S.ProfileButton>
          <S.ProfileButton as="label" htmlFor="profile-image-upload">
            프로필 이미지 업로드
          </S.ProfileButton>
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageSelect}
          />
        </S.ProfileButtonGroup>
      </S.ProfileSection>

      <S.Form onSubmit={handleSubmit}>
        <S.FormSection>
          <S.Label>이름</S.Label>
          <S.Input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
          />
        </S.FormSection>

        <S.FormSection>
          <S.Label>닉네임</S.Label>
          <S.Input
            type="text"
            name="userNickname"
            value={formData.userNickname}
            onChange={handleInputChange}
            required
          />
        </S.FormSection>

        <S.FormSection>
          <S.Label>이메일</S.Label>
          <S.Input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleInputChange}
            disabled
          />
        </S.FormSection>

        <S.FormSection>
          <S.Label>생년월일</S.Label>
          <S.DateInputWrapper>
            <S.Input
              type="date"
              name="userBirthday"
              value={formData.userBirthday}
              onChange={handleInputChange}
            />

          </S.DateInputWrapper>
        </S.FormSection>

        <S.Divider />

        <S.FormSection>
          <S.Label>현재 비밀번호</S.Label>
          <S.PasswordInputWrapper>
            <S.Input
              type={showPasswords.current ? 'text' : 'password'}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              onBlur={handleCurrentPasswordBlur}
              placeholder="현재 사용중인 비밀번호를 입력하세요"
            />
            <S.EyeIcon onClick={() => togglePasswordVisibility('current')}>
              <FontAwesomeIcon 
                icon={showPasswords.current ? faEyeSlash : faEye} 
              />
            </S.EyeIcon>
          </S.PasswordInputWrapper>
          {passwordError && <S.ErrorMessage>{passwordError}</S.ErrorMessage>}
        </S.FormSection>

        <S.FormSection>
          <S.Label>새 비밀번호</S.Label>
          <S.PasswordInputWrapper>
            <S.Input
              type={showPasswords.new ? 'text' : 'password'}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="비밀번호는 8글자 이상 입력하세요."
              disabled={!isPasswordVerified || !!passwordError || !passwordData.currentPassword}
            />
            <S.EyeIcon onClick={() => togglePasswordVisibility('new')}>
              <FontAwesomeIcon 
                icon={showPasswords.new ? faEyeSlash : faEye} 
              />
            </S.EyeIcon>
          </S.PasswordInputWrapper>
        </S.FormSection>

        <S.FormSection>
          <S.Label>새 비밀번호 확인</S.Label>
          <S.PasswordInputWrapper>
            <S.Input
              type={showPasswords.confirm ? 'text' : 'password'}
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 다시 입력하세요."
              disabled={!isPasswordVerified || !!passwordError || !passwordData.currentPassword}
            />
            <S.EyeIcon onClick={() => togglePasswordVisibility('confirm')}>
              <FontAwesomeIcon 
                icon={showPasswords.confirm ? faEyeSlash : faEye} 
              />
            </S.EyeIcon>
          </S.PasswordInputWrapper>
        </S.FormSection>

        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : '완료'}
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};

export default ModifyContainer;