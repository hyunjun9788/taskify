import { useRef } from 'react';
import styled from 'styled-components';
import CommentItem from '@/components/common/modal/card-detail/CommentItem';
import CommentListLoader from '@/components/common/modal/card-detail/CommentListLoader';
import InvitedDashBoardListLoader from '@/components/dashboard/my-board/InvitedDashBoardListLoader';
import useCommentsListQuery from '@/hooks/query/comments/useCommentsListQuery';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';
import { CardInfoProps } from '@/types/CardDetail';

const S = {
  CommentListContainer: styled.div`
    overflow: auto;
    height: 11rem;
    margin-top: 3rem;

    border: 1px solid ${({ theme }) => theme.color.grayLight};
    border-radius: 0.5rem;

    ${MEDIA_QUERIES.onMobile} {
      height: 9rem;
    }

    &::-webkit-scrollbar {
      width: 1rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.color.grayLight};
      border-radius: 1rem;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.color.white};
      border-radius: 1rem;
      box-shadow: inset 0px 0px 5px white;
    }
  `,
};

interface CommentItemDataProps {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

interface CommentListProps {
  cardDetailData: CardInfoProps;
}

function CommentList({ cardDetailData }: CommentListProps) {
  const loaderRef: any = useRef();

  const { data, fetchNextPage }: any = useCommentsListQuery({
    cardId: cardDetailData?.id,
  });
  // console.log(data);
  const isLastPage = data?.pages?.at(-1)?.cursorId === null;

  const pages = data?.pages;
  // console.log('bbbb', pages && pages[0].comments.length);

  const commentsCount = pages && pages[0].comments.length;

  useIntersectionObserver(async () => {
    await fetchNextPage();
  }, loaderRef);

  return (
    commentsCount !== 0 && (
      <S.CommentListContainer>
        {data?.pages.map((page: any) =>
          page.comments.map((comment: CommentItemDataProps) => (
            <CommentItem
              key={comment.id}
              id={comment.id}
              cardId={comment.cardId}
              author={comment.author}
              content={comment.content}
              createdAt={comment.createdAt}
              updatedAt={comment.updatedAt}
            />
          )),
        )}
        <CommentListLoader
          loaderRef={loaderRef}
          style={isLastPage ? { display: 'none' } : { marginTop: '2rem' }}
        />
      </S.CommentListContainer>
    )
  );
}
export default CommentList;
