import Image from 'next/image';
import Button from '../common/button/Button';
import styled from 'styled-components';
import { BUTTON_TYPE } from '@/constants/BUTTON_TYPE';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';
import ArrowLeft from '@/public/icon/arrowLeft.svg';
import ArrowRight from '@/public/icon/arrowRight.svg';

const inviteData = {
  totalCount: 0,
  invitations: [
    {
      invitee: {
        nickname: 'string',
        email: 'CodeitA@codeit.com',
        id: 0,
      },
    },
    {
      invitee: {
        nickname: 'string',
        email: 'CodeitB@codeit.com',
        id: 0,
      },
    },
  ],
};
const S = {
  InviteListLayout: styled.div`
    width: 62rem;
    padding: 3.2rem 2.8rem;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.color.white};

    ${MEDIA_QUERIES.onMobile} {
      width: calc(100% - 10px);
    }
  `,
  InviteListHeader: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Title: styled.p`
    font-size: 2.4rem;
    font-weight: 700;

    ${MEDIA_QUERIES.onMobile} {
      font-size: 2rem;
    }
  `,

  CurrentPageContainer: styled.div`
    display: flex;
    gap: 0.2rem;
    align-items: center;

    ${MEDIA_QUERIES.onMobile} {
      position: relative;
    }
  `,
  CurrentPage: styled.p`
    font-size: 1.4rem;
    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.2rem;
    }
  `,

  ButtonBox: styled.div`
    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.2rem;
    }
  `,

  InviteListContainer: styled.div`
    margin-top: 3rem;
  `,

  EmailTitle: styled.p`
    color: ${({ theme }) => theme.color.gray};
  `,

  InviteListBox: styled.ul`
    margin-top: 2rem;
  `,

  InviteItem: styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0 1.5rem 0;
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.color.grayLight};
    }
  `,
  ImageAndNameContainer: styled.div`
    display: flex;
    align-items: center;
  `,

  MemberImage: styled(Image)`
    margin-right: 1rem;
  `,
  Email: styled.p`
    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.4rem;
    }
  `,
  CancelButton: styled(Button)`
    color: ${({ theme }) => theme.color.main};
    font-weight: 500;

    ${MEDIA_QUERIES.onMobile} {
      width: 5.2rem;
      padding: 0.5rem 1.3rem;
    }
  `,
  InviteButton: styled(Button)`
    padding: 0.7rem 2rem;

    ${MEDIA_QUERIES.onMobile} {
      position: absolute;
      top: 4.5rem;
      right: 0;
      width: 8.6rem;
      height: 2.8rem;
      padding: 0.5rem 0.8rem;

      font-size: 1.2rem;
    }
  `,
};

interface InviteHistoryListProps {
  openInviteModal: () => void;
}

function InviteHistoryList({ openInviteModal }: InviteHistoryListProps) {
  const { invitations } = inviteData;

  return (
    <S.InviteListLayout>
      <S.InviteListHeader>
        <S.Title>초대 내역</S.Title>
        <S.CurrentPageContainer>
          <S.CurrentPage>1페이지 중 1 </S.CurrentPage>
          <S.ButtonBox>
            <ArrowLeft />
            <ArrowRight />
          </S.ButtonBox>

          <S.InviteButton onClick={openInviteModal} size="S">
            초대하기
          </S.InviteButton>
        </S.CurrentPageContainer>
      </S.InviteListHeader>

      <S.InviteListContainer>
        <S.EmailTitle>이메일</S.EmailTitle>
        <S.InviteListContainer>
          {invitations.map((invitation) => (
            <S.InviteItem key={invitation.invitee.id}>
              <S.Email>{invitation.invitee.email}</S.Email>
              <S.CancelButton size="S" styleType={BUTTON_TYPE.DESTRUCTIVE}>
                취소
              </S.CancelButton>
            </S.InviteItem>
          ))}
        </S.InviteListContainer>
      </S.InviteListContainer>
    </S.InviteListLayout>
  );
}

export default InviteHistoryList;
