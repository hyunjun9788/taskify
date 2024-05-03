import styled from 'styled-components';
import CommentForm from '@/components/common/modal/card-detail/CommentForm';
import CommentList from '@/components/common/modal/card-detail/CommentList';
import { CardInfoProps } from '@/types/CardDetail';

const S = {
  CommentContainer: styled.ul`
    list-style: none;
    padding: 0;
  `,
};

export interface CommentProps {
  cardDetailData: CardInfoProps;
}
function Comment({ cardDetailData }: CommentProps) {
  return (
    <S.CommentContainer>
      <CommentForm cardDetailData={cardDetailData} />
      <CommentList cardDetailData={cardDetailData} />
    </S.CommentContainer>
  );
}

export default Comment;
