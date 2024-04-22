import Image from 'next/image';
import Button from '../common/button/Button';
import styled from 'styled-components';
import { BUTTON_TYPE } from '@/constants/BUTTON_TYPE';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';
import ArrowLeft from '@/public/icon/arrowLeft.svg';
import ArrowRight from '@/public/icon/arrowRight.svg';

const membersData = {
  members: [
    {
      id: 1,
      userId: 1,
      email: 'user1@example.com',
      nickname: 'User 1',
      profileImageUrl: 'https://i.ibb.co/kgykYbx/Ellipse-40.png',
      createdAt: '2024-04-20T13:41:57.582Z',
      updatedAt: '2024-04-20T13:41:57.582Z',
      isOwner: true,
    },
    {
      id: 2,
      userId: 2,
      email: 'user2@example.com',
      nickname: 'User 2',
      profileImageUrl: 'https://i.ibb.co/tPyNYb1/Ellipse-38.png',
      createdAt: '2024-04-20T13:41:57.582Z',
      updatedAt: '2024-04-20T13:41:57.582Z',
      isOwner: false,
    },
    {
      id: 3,
      userId: 3,
      email: 'user3@example.com',
      nickname: 'User 3',
      profileImageUrl: 'https://i.ibb.co/VgZHtYL/Ellipse-39.png',
      createdAt: '2024-04-20T13:41:57.582Z',
      updatedAt: '2024-04-20T13:41:57.582Z',
      isOwner: false,
    },
  ],
  totalCount: 3,
};

const S = {
  MemberListLayout: styled.div`
    width: 62rem;
    padding: 3.2rem 2.8rem;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.color.white};

    ${MEDIA_QUERIES.onMobile} {
      width: calc(100% - 10px);
    }
  `,

  MemberListHeader: styled.div`
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

  CurrentPageBox: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  CurrentPage: styled.p`
    font-size: 1.4rem;
    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.2rem;
    }
  `,
  ButtonBox: styled.div`
    margin-top: 0.2rem;
  `,

  MemberListContainer: styled.div`
    margin-top: 3rem;
  `,

  NameTitle: styled.p`
    color: ${({ theme }) => theme.color.gray};
  `,

  MemberListBox: styled.ul`
    margin-top: 2rem;
  `,

  MemberItem: styled.li`
    display: flex;
    justify-content: space-between;

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
    ${MEDIA_QUERIES.onMobile} {
      width: 3.4rem;
      height: 3.4rem;
    }
  `,
  Nickname: styled.p`
    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.4rem;
    }
  `,
  Button: styled(Button)`
    color: ${({ theme }) => theme.color.main};
    font-weight: 500;

    ${MEDIA_QUERIES.onMobile} {
      width: 5.2rem;
      padding: 0.5rem 1.3rem;
    }
  `,
};

function MemberList() {
  const { members } = membersData;
  return (
    <S.MemberListLayout>
      <S.MemberListHeader>
        <S.Title>구성원</S.Title>
        <S.CurrentPageBox>
          <S.CurrentPage>1페이지 중 1 </S.CurrentPage>
          <S.ButtonBox>
            <ArrowLeft />
            <ArrowRight />
          </S.ButtonBox>
        </S.CurrentPageBox>
      </S.MemberListHeader>

      <S.MemberListContainer>
        <S.NameTitle>이름</S.NameTitle>
        <S.MemberListContainer>
          {members.map((member) => (
            <S.MemberItem key={member.id}>
              <S.ImageAndNameContainer>
                <S.MemberImage
                  src={member.profileImageUrl}
                  width={38}
                  height={38}
                  alt={member.nickname}
                />
                <S.Nickname>{member.nickname}</S.Nickname>
              </S.ImageAndNameContainer>
              <S.Button size="S" styleType={BUTTON_TYPE.DESTRUCTIVE}>
                삭제
              </S.Button>
            </S.MemberItem>
          ))}
        </S.MemberListContainer>
      </S.MemberListContainer>
    </S.MemberListLayout>
  );
}

export default MemberList;
