import React, { useState } from 'react';
import CircleColor from '../common/CircleColor';
import { ColorSelector, resultColorState } from '../common/ColorSelector';
import InputField from '../common/InputField';
import Button from '../common/button/Button';
import Form from '../form/Form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import useWindowSize, { Size } from '@/hooks/useWindowSize';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const dashboardData = {
  id: 0,
  title: '프로젝트',
  color: 'red',
  createdAt: '2024-04-20T06:58:07.454Z',
  updatedAt: '2024-04-20T06:58:07.454Z',
  createdByMe: true,
  userId: 0,
};

const S = {
  DashboardForm: styled.form``,

  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 62rem;
    height: 25.6rem;
    padding: 3.2rem 2.8rem;
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.color.white};

    ${MEDIA_QUERIES.onMobile} {
      width: calc(100% - 10px);
    }
  `,

  NameAndColorBox: styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: 1.5rem;
  `,

  DashboardName: styled.div`
    font-size: 20px;
    font-weight: 700;
  `,

  TitleInput: styled(InputField)`
    ${MEDIA_QUERIES.onMobile} {
      height: 4.2rem;
      padding: 0.8rem 0.9rem;

      font-size: 1.4rem;

      &:placeholder-shown {
        text-overflow: ellipsis;
      }
    }
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: end;
  `,
  Button: styled(Button)`
    ${MEDIA_QUERIES.onMobile} {
      width: 8.6rem;
      height: 2.8rem;
      padding: 0.5rem 0.8rem;
      margin-top: 1rem;

      font-size: 1.2rem;
    }
  `,
};

function NameAndColorChangeBox() {
  //   const { width }: Size = useWindowSize();
  //   const isMobile: boolean = width !== undefined && width < 768;

  //   const colorState = useRecoilValue(resultColorState);
  //   console.log(colorState);
  const [dashboardName, setDashboardName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardName(e.target.value);
  };

  return (
    <S.DashboardForm>
      <S.ContentContainer>
        <S.NameAndColorBox>
          <S.DashboardName>{dashboardData.title}</S.DashboardName>
          <ColorSelector />
        </S.NameAndColorBox>
        <S.TitleInput
          label="대시보드 이름"
          id="dashboardName"
          placeholder="대시보드 이름을 입력하세요."
          value={dashboardName}
          onChange={handleInputChange}
        />
        <S.ButtonBox>
          <S.Button size="S">변경</S.Button>
        </S.ButtonBox>
      </S.ContentContainer>
    </S.DashboardForm>
  );
}
export default NameAndColorChangeBox;
