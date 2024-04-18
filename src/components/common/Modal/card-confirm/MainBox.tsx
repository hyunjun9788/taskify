import { CardConfirmModalProps } from './CardConfirmModal';
import Comment from './Comment';
import ContentAndImageBox from './ContentAndImageBox';
import TagBox from './TagBox';
import styled from 'styled-components';

const S = {
  MainAndSideBox: styled.div`
    display: flex;
  `,
  MainBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
  `,
};
function MainBox({ cardInfoData }: CardConfirmModalProps) {
  return (
    <S.MainBox>
      <TagBox cardInfoData={cardInfoData} />
      <ContentAndImageBox cardInfoData={cardInfoData} />
      <Comment />
    </S.MainBox>
  );
}
export default MainBox;