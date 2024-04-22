import { ImgFileUpload } from '../common/ImgFileUpload';
import Button from '../common/button/Button';
import FormInput from '../common/input/FormInput';
import styled from 'styled-components';
import { BUTTON_TYPE } from '@/constants/BUTTON_TYPE';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

interface ProfileChangeProps {
  name: string;
}

function ProfileChange({ name }: ProfileChangeProps) {
  const S = {
    Container: styled.div`
      width: 62rem;
      height: 36rem;
      padding: 3.2rem 2.8rem 2.8rem 2.8rem;
      border-radius: 0.8rem;
      background-color: ${({ theme }) => theme.color.white};

      ${MEDIA_QUERIES.onMobile} {
        width: 28.4rem;
        height: 46.2rem;
      }
    `,
    AlignBox: styled.div`
      display: flex;
      align-items: center;
      margin: 3.2rem 0 2.4rem 0;

      ${MEDIA_QUERIES.onMobile} {
        flex-direction: column;
        align-items: normal;
        margin-top: 8rem;
      }
    `,
    ImageBox: styled.div`
      flex: 1;
    `,
    ImageTitle: styled.span`
      font-size: 2.4rem;
      font-weight: 700;
    `,
    ImageContent: styled.div`
      margin-top: -7rem;
    `,
    InputBox: styled.div`
      flex: 2;
      margin-left: 1.6rem;

      ${MEDIA_QUERIES.onMobile} {
        margin-top: 2.4rem;
        margin-left: 0;
      }
    `,
  };
  return (
    <S.Container>
      <S.ImageTitle>프로필</S.ImageTitle>
      <S.AlignBox>
        <S.ImageBox>
          <S.ImageContent>
            <ImgFileUpload edit={false} small={false} />
          </S.ImageContent>
        </S.ImageBox>
        <S.InputBox>
          <FormInput formType="editProfile" btnSize="S" />
        </S.InputBox>
      </S.AlignBox>
    </S.Container>
  );
}

export default ProfileChange;
