import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../common/button/Button';
import styled from 'styled-components';
import { BUTTON_TYPE } from '@/constants/BUTTON_TYPE';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';
import landing from '@/public/image/landing.png';

const S = {
  MainBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 9.4rem;
    background-color: ${({ theme }) => theme.color.black};
  `,

  MainImageWrapper: styled.div`
    position: relative;
    width: 28.7rem;
    height: 16.8rem;
    margin-bottom: 2.6rem;

    ${MEDIA_QUERIES.onTablet} {
      width: 53.7rem;
      height: 31.4rem;
      margin-bottom: 4.8rem;
    }

    ${MEDIA_QUERIES.onPc} {
      width: 72.2rem;
      height: 42.2rem;
    }
  `,

  TitleWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 2.8rem;

    ${MEDIA_QUERIES.onTablet} {
      flex-direction: row;
      gap: 2.4rem;
    }

    ${MEDIA_QUERIES.onMobile} {
      gap: 0.5rem;
      flex-direction: column;
    }
  `,

  WhiteText: styled.h1`
    color: ${({ theme }) => theme.color.white};
    text-align: center;
    font-size: 7.6rem;
    font-weight: 700;
    letter-spacing: -0.2rem;

    ${MEDIA_QUERIES.onTablet} {
      font-size: 5.6rem;
    }

    ${MEDIA_QUERIES.onMobile} {
      font-size: 4rem;
    }
  `,

  MainColorText: styled.h1`
    color: ${({ theme }) => theme.color.main};
    text-align: center;
    font-size: 9rem;
    font-weight: 700;
    letter-spacing: -0.1rem;

    ${MEDIA_QUERIES.onTablet} {
      font-size: 7rem;
      line-height: 6.5rem;
    }

    ${MEDIA_QUERIES.onMobile} {
      font-size: 4.2rem;
    }
  `,

  ServiceDescription: styled.p`
    margin-top: 1.8rem;
    margin-bottom: 7rem;
    color: ${({ theme }) => theme.color.white};
    text-align: center;
    font-size: 1.2rem;
    letter-spacing: -0.1rem;

    ${MEDIA_QUERIES.onTablet} {
      margin-top: 2.4rem;
      margin-bottom: 6.6rem;
      font-size: 1.4rem;
    }

    ${MEDIA_QUERIES.onPc} {
      font-size: 1.6rem;
    }
  `,

  LoginButtonBox: styled.button`
    margin-bottom: 8rem;
    cursor: pointer;

    @media ${MEDIA_QUERIES.onTablet} {
      margin-bottom: 18.4rem;
    }
  `,
  Button: styled(Button)`
    width: 28rem;
    padding: 1.5rem 0 1.6rem 0;
  `,
};

export default function LandingHeader() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };
  return (
    <S.MainBox>
      <S.MainImageWrapper>
        <Image fill src={landing} alt="히어로 이미지" />
      </S.MainImageWrapper>
      <S.TitleWrapper>
        <S.WhiteText>새로운 일정 관리</S.WhiteText>
        <S.MainColorText>Taskify</S.MainColorText>
      </S.TitleWrapper>
      <S.ServiceDescription>
        공주들아 서비스 한줄 소개 생각하긔 꼬옥 ~!
      </S.ServiceDescription>
      <S.LoginButtonBox onClick={handleLoginClick}>
        <S.Button size="L" styleType={BUTTON_TYPE.PRIMARY}>
          로그인하기
        </S.Button>
      </S.LoginButtonBox>
    </S.MainBox>
  );
}
