import { useState } from 'react';
import styled from 'styled-components';
import SideBar from '@/components/common/DashBoardHeader/SideBar';
import DashBoardHeader from '@/components/common/DashBoardHeader/index';
import CardConfirmModal from '@/components/common/Modal/card-confirm/CardConfirmModal';
import PageLayout from '@/components/common/PageLayout';
import Sidebar from '@/components/common/SideBar';
import BackDropModal from '@/components/common/modal/BackDropModal';
import HashTag from '@/components/common/tag/HashTag';
import StateTag from '@/components/common/tag/StateTag';
import '@/styles/GlobalStyle';

function Hj() {
  const [isModalOpen1, setModalOpen1] = useState(false);
  const openModal1 = () => setModalOpen1(true);
  const closeModal1 = () => setModalOpen1(false);

  const stateTags = ['To Do', 'On Progress', 'Done'];
  const isMobile = false;
  const hashTag = ['프로젝트', '프론트엔드', '어려워'];
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
  ];
  const cardInfoData = {
    id: 0,
    title: '새로운 일정 관리 Taskify',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.',
    tags: ['To Do'],
    dueDate: '2022.12.30 19:00',
    assignee: {
      profileImageUrl: 'https://i.ibb.co/ysRQMyj/me.jpg',
      nickname: 'jun',
      id: 0,
    },
    imageUrl: 'https://i.ibb.co/5WsrwJY/Group-751.png',
    teamId: '3',
    columnId: 0,
    createdAt: '2024-04-17T07:10:28.745Z',
    updatedAt: '2024-04-17T07:10:28.745Z',
  };

  const dashboards = [
    { id: '1', color: '#FFA500', name: '대시보드 1', createdByMe: true },
    { id: '2', color: '#FF2660', name: '대시보드 2', createdByMe: true },
    { id: '3', color: '#7AC555', name: '대시보드 3', createdByMe: false },
  ];

  const S = {
    Container: styled.div`
      position: relative;
    `,
    Button: styled.button`
      border: 1px solid black;
      background-color: yellow;
      padding: 30px;
    `,
  };
  return (
    // <PageLayout myPage={false}>
    //   <div style={{ width: '100px', height: '100px', background: 'red' }}>
    //     red
    //   </div>
    <div>
      <S.Button onClick={openModal1}>1번 모달(기본)</S.Button>
      <BackDropModal isOpen={isModalOpen1} onClose={closeModal1}>
        <S.Container>
          {/* <Sidebar dashboards={dashboards} />
      <DashBoardHeader
        menuName="내 대시보드"
        profileName="남현준"
        profileImgURL={MY_IMAGE_URL}
        invitedUsers={invitedUsers}
      /> 
    <div>
        {stateTags.map((tag, index) => (
          <StateTag isMobile={isMobile}>{tag}</StateTag>
        ))}
        {hashTag.map((tag, index) => (
          <HashTag index={index} isMobile={isMobile}>
            {tag}
          </HashTag>
        ))}
      </div>  */}
          <CardConfirmModal cardInfoData={cardInfoData} />
        </S.Container>
      </BackDropModal>
    </div>
    // </PageLayout>
  );
}

export default Hj;
