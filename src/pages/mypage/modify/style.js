import styled from 'styled-components';
import { h5Bold, h6Medium, h7Medium } from '../../../styles/common';
import theme from '../../../styles/theme';

const S = {};

/* 1160 그리드 중앙 + 좌측 정렬 */
S.Container = styled.div`
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;
`;

S.ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
`;

S.ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme?.PALETTE?.neutral?.white?.dark || '#D9D9D9'};
`;

S.ProfileButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

S.ProfileButton = styled.button`
  ${h7Medium}
  padding: 5px 30px;
  border: 1px solid ${({ theme }) => theme?.PALETTE?.primary?.purple?.main || '#7255EE'};
  background: #fff;
  color: ${({ theme }) => theme?.PALETTE?.primary?.purple?.main || '#7255EE'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme?.PALETTE?.primary?.purple?.main || '#7255EE'};
    color: #fff;
  }

  &:active {
    transform: scale(0.98);
  }
`;

S.Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;

`;

S.FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

S.Label = styled.label`
  ${h6Medium}
  font-weight: 600;
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.main || '#121212'};
`;

S.Input = styled.input`
  ${h6Medium}
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme?.PALETTE?.neutral?.white?.dark || '#D9D9D9'};
  border-radius: 8px;
  background: #fff;
  color: ${({ theme }) => theme?.PALETTE?.neutral?.gray?.main || '#121212'};
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme?.PALETTE?.primary?.purple?.main || '#7255EE'};
  }

  &::placeholder {
    color: ${({ theme }) => theme?.PALETTE?.neutral?.gray?.main || '#dbdadaff'};
  }

  &:disabled {
   background: ${({ theme }) => theme?.PALETTE?.neutral?.white?.secondary || '#dbdadaff'};
    color: ${({ theme }) => theme?.PALETTE?.neutral?.gray?.main || '#dbdadaff '};
    cursor: not-allowed;
  }
`;

S.DateInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;


S.PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

S.EyeIcon = styled.div`
  position: absolute;
  right: 16px;
  color: ${({ theme }) => theme?.PALETTE?.neutral?.gray?.main || '#808080'};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme?.PALETTE?.primary?.purple?.main || '#7255EE'};
  }
`;

S.Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${({ theme }) => theme?.PALETTE?.neutral?.white?.dark || '#D9D9D9'};
  margin: 8px 0;

`;

S.SubmitButton = styled.button`
  ${h5Bold}
  align-self: flex-end;
  padding: 4px 50px;
  border: 1px solid ${({ theme }) => theme?.PALETTE?.primary?.purple?.main || '#7255EE'};
  background: ${({ theme }) => theme?.PALETTE?.primary?.purple?.light || '#7255EE'};
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme?.PALETTE?.primary?.purple?.main || '#6434b1'};

  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

S.ErrorMessage = styled.div`
  ${h7Medium}
  color: ${({ theme }) => theme?.PALETTE?.primary?.red?.main || '#ff4320'};
  margin-top: 4px;
`;

export default S;

