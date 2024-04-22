import { useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PageLayout from '@/components/common/PageLayout';
import Button from '@/components/common/button/Button';
import TeamMemberInviteModal from '@/components/common/modal/TeamMemberInviteModal';
import InviteHistoryList from '@/components/edit-page/InviteHistoryListBox';
import MemberList from '@/components/edit-page/MemberListBox';
import NameAndColorChangeBox from '@/components/edit-page/NameAndColorChangeBox';
import BackButton from '@/components/my-page/BackButton';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const S = {
  MainContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  `,
  Button: styled(Button)`
    width: 62rem;
    margin-top: 3rem;
    ${MEDIA_QUERIES.onMobile} {
      width: calc(100% - 10px);
    }
  `,
};
function Edit() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  return (
    <PageLayout openInviteModal={openInviteModal}>
      <S.MainContainer>
        <BackButton />
        <NameAndColorChangeBox />
        <MemberList />
        <InviteHistoryList openInviteModal={openInviteModal} />
        <TeamMemberInviteModal
          isOpen={isInviteModalOpen}
          onClose={closeInviteModal}
          onCreate={() => {
            console.log(`api`);
          }}
        />
        <S.Button>대시보드 삭제하기</S.Button>
      </S.MainContainer>
    </PageLayout>
  );
}

export default Edit;
