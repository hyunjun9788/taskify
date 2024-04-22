import DashBoardHeader from './DashBoardHeader';
import Sidebar from './SideBar';
import styled from 'styled-components';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const dashboards = [
  { id: '1', color: '#FFA500', name: '대시보드 1', createdByMe: true },
  { id: '2', color: '#FF2660', name: '대시보드 2', createdByMe: true },
  { id: '3', color: '#7AC555', name: '대시보드 3', createdByMe: false },
];

const S = {
  LayoutContainer: styled.div`
    overflow: auto;

    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,
  BodyContainer: styled.div`
    padding: 7rem 0 0 30rem;

    ${MEDIA_QUERIES.onTablet} {
      padding-left: 16rem;
    }

    ${MEDIA_QUERIES.onMobile} {
      padding: 6rem 0 0 6.7rem;
    }
  `,
};

function PageLayout({
  children,
  myPage,
  openInviteModal,
}: {
  children: React.ReactNode;
  openInviteModal?: () => void;
  myPage: boolean;
}) {
  const MY_IMAGE_URL = 'https://i.ibb.co/ysRQMyj/me.jpg';
  const invitedUsers = [
    {
      id: 1,
      profileImageUrl: 'https://i.ibb.co/kgykYbx/Ellipse-40.png',
    },
    {
      id: 2,
      profileImageUrl: 'https://i.ibb.co/tPyNYb1/Ellipse-38.png',
    },
    {
      id: 3,
      profileImageUrl: 'https://i.ibb.co/VgZHtYL/Ellipse-39.png',
    },
    {
      id: 4,
      profileImageUrl: 'https://i.ibb.co/VgZHtYL/Ellipse-39.png',
    },
    {
      id: 5,
      profileImageUrl: 'https://i.ibb.co/VgZHtYL/Ellipse-39.png',
    },
    {
      id: 6,
      profileImageUrl: 'https://i.ibb.co/VgZHtYL/Ellipse-39.png',
    },
  ];

  return (
    <S.LayoutContainer>
      <Sidebar dashboards={dashboards} />
      <DashBoardHeader
        dashboardName={dashboards[0].name}
        createdByMe={dashboards[0].createdByMe}
        profileName="남현준"
        profileImgURL={MY_IMAGE_URL}
        invitedUsers={invitedUsers}
        openInviteModal={openInviteModal}
        myPage={myPage}
      />
      <S.BodyContainer>{children}</S.BodyContainer>
    </S.LayoutContainer>
  );
}

export default PageLayout;
