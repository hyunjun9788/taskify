import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/button/Button';
import useCancelInvitationMutation from '@/hooks/query/dashboards/useCancelInvitationMutation';
import useLoadInvitationQuery from '@/hooks/query/dashboards/useLoadInvitationQuery';
import { BUTTON_TYPE } from '@/constants/BUTTON_TYPE';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';
import ArrowLeft from '@/public/icon/arrowLeft.svg';
import ArrowRight from '@/public/icon/arrowRight.svg';

const S = {
  InviteListLayout: styled.div`
    width: 60rem;
    height: 40rem;
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
    align-items: center;
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
    gap: 2.2rem;
    align-items: center;

    ${MEDIA_QUERIES.onMobile} {
      position: relative;
    }
  `,
  PageNavigationBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;

    ${MEDIA_QUERIES.onMobile} {
      padding-right: 0.3rem;
      align-items: center;
      display: flex;
      flex-direction: column;
    }
  `,

  PageCount: styled.div`
    font-size: 1.4rem;
    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.2rem;
    }
  `,

  Buttons: styled.div`
    display: flex;
    background-color: blue;
  `,

  ArrowButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 2rem;
    padding: 1.2rem;
    border: ${({ theme }) => theme.border.lightGray};
    background-color: ${({ theme }) => theme.color.white};
  `,

  InviteListContainer: styled.div`
    margin-top: 3rem;
  `,
  LoadingMessage: styled.h1`
    padding: 8rem 0;
    font-size: 2rem;
    text-align: center;
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

    border-bottom: 1px solid ${({ theme }) => theme.color.grayLight};

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
      top: 7.8rem;
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
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);

  const { data, isLoading } = useLoadInvitationQuery({
    dashboardId: id,
    page,
    size: 4,
  });
  const invitations = data?.invitations;

  const { mutate: responseInvitationCancelMutate } =
    useCancelInvitationMutation();

  const totalPages =
    data && data.totalCount ? Math.ceil(data.totalCount / 4) : 1;

  const handlePrevBtnClick = () => {
    setPage((prev) => prev - 1);
  };
  const handleNextBtnClick = () => {
    setPage((prev) => prev + 1);
  };

  const handleClickCancelBtn = (invitationId) => {
    responseInvitationCancelMutate({ dashboardId: id, invitationId });
  };

  return (
    <S.InviteListLayout>
      <S.InviteListHeader>
        <S.Title>초대 내역</S.Title>
        <S.CurrentPageContainer>
          <S.PageNavigationBox>
            <S.PageCount>
              {totalPages} 페이지중 {page}
            </S.PageCount>
            <S.Buttons>
              <S.ArrowButton disabled={page <= 1} onClick={handlePrevBtnClick}>
                <ArrowLeft />
              </S.ArrowButton>
              <S.ArrowButton
                disabled={page >= totalPages}
                onClick={handleNextBtnClick}
              >
                <ArrowRight />
              </S.ArrowButton>
            </S.Buttons>
          </S.PageNavigationBox>

          <S.InviteButton onClick={openInviteModal} size="S">
            초대하기
          </S.InviteButton>
        </S.CurrentPageContainer>
      </S.InviteListHeader>

      <S.InviteListContainer>
        <S.EmailTitle>이메일</S.EmailTitle>
        <S.InviteListContainer>
          {isLoading && <S.LoadingMessage>불러오는 중...</S.LoadingMessage>}
          {invitations &&
            invitations.map((invitation) => (
              <S.InviteItem key={invitation?.invitee?.id}>
                <S.Email>{invitation?.invitee?.email}</S.Email>
                <S.CancelButton
                  onClick={() => handleClickCancelBtn(invitation.id)}
                  size="S"
                  styleType={BUTTON_TYPE.DESTRUCTIVE}
                >
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
