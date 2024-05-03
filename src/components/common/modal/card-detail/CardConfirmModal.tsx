import styled from 'styled-components';
import BackDropModal from '@/components/common/modal/BackDropModal';
import MainBox from '@/components/common/modal/card-detail/MainBox';
import ModalHeader from '@/components/common/modal/card-detail/ModalHeader';
import SideBox from '@/components/common/modal/card-detail/SideBox';
import useDetailCardQuery from '@/hooks/query/cards/useDetailCardQuery';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const S = {
  ModalLayout: styled.div`
    width: 73rem;
    max-height: 76rem;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.color.mainLight};
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.color.white};
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }

    ${MEDIA_QUERIES.onMobile} {
      max-width: 32rem;
      max-height: 60rem;
    }
  `,

  ModalBody: styled.div`
    display: flex;
    ${MEDIA_QUERIES.onMobile} {
      display: flex;
      flex-direction: column-reverse;
    }
  `,
};

interface ModalOpenAndCloseProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number;
  title: string;
  openToDoEditModal: () => void;
}
function CardConfirmModal({
  isOpen,
  onClose,
  cardId,
  title,
  openToDoEditModal,
}: ModalOpenAndCloseProps) {
  const { data: cardDetailData } = useDetailCardQuery({
    cardId,
  });

  return (
    <BackDropModal isOpen={isOpen} onClose={onClose}>
      <S.ModalLayout>
        <ModalHeader
          onClose={onClose}
          card_Id={cardId}
          openToDoEditModal={openToDoEditModal}
          cardDetailData={cardDetailData}
        />
        <S.ModalBody>
          <MainBox stateTag={title} cardDetailData={cardDetailData} />
          <SideBox card_Id={cardId} />
        </S.ModalBody>
      </S.ModalLayout>
    </BackDropModal>
  );
}

export default CardConfirmModal;
