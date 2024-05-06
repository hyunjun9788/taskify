import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { formatDate } from '@/utils/formatDate';
import useDeleteCommentsMutation from '@/hooks/query/comments/useDeleteCommentsMutation';
import useEditCommentsMutation from '@/hooks/query/comments/useEditCommentsMutation';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';
import { Comment } from '@/types/CardDetail';
import defaultImg from '@/public/image/defaultImg.jpeg';

const S = {
  CommentItemContainer: styled.ul`
    display: flex;
    align-items: center;
    padding: 1rem;
    height: 10rem;

    ${MEDIA_QUERIES.onMobile} {
      margin-top: 1rem;
      height: 7rem;
    }
  `,

  ProfileImage: styled(Image)`
    border-radius: 50%;

    ${MEDIA_QUERIES.onMobile} {
      width: 2.6rem;
      height: 2.6rem;
    }
  `,

  CommentInfoBox: styled.div`
    display: flex;
    gap: 0.8rem;
    flex-direction: column;
    margin-top: 1rem;
    margin-left: 1rem;

    ${MEDIA_QUERIES.onMobile} {
      gap: 0.6rem;
    }
  `,

  NameAndDateBox: styled.div`
    display: flex;
  `,

  ContentBox: styled.div``,
  CommentNickName: styled.li`
    margin: 0 1rem;
    font-weight: 600;

    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.2rem;
    }
  `,

  CommentContent: styled.li`
    flex: 1;
    margin: 0 1rem;

    cursor: pointer;

    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.2rem;
    }
  `,

  CommentDate: styled.li`
    margin-top: 0.3rem;
    font-size: 1.2rem;

    ${MEDIA_QUERIES.onMobile} {
      font-size: 1rem;
    }
  `,

  ButtonBox: styled.div`
    display: flex;
    gap: 0.5rem;
    margin-left: 1rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.gray};

    ${MEDIA_QUERIES.onMobile} {
      font-size: 1rem;
    }
  `,
  EditComment: styled.li`
    cursor: pointer;
    text-decoration: underline;
  `,
  DeleteComment: styled.li`
    cursor: pointer;
    text-decoration: underline;
  `,

  CommentInput: styled.input`
    flex: 1;
    width: 30rem;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.color.grayLight};
    border-radius: 0.5rem;
    margin: 0 1rem;
  `,
};

function CommentItem({ id, author, content, createdAt, updatedAt }: Comment) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: responseEditCommentMutate } = useEditCommentsMutation();
  const { mutate: responseDeleteCommentMutate } = useDeleteCommentsMutation();

  const handleEditComment = (e: React.MouseEvent<HTMLLIElement>) => {
    setEditContent(content);
    setIsEditing(true);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  };

  const handleSubmitCommentEdit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    responseEditCommentMutate({ content: editContent, commentId: id });
    setIsEditing(false);
  };

  const handleDeleteComment = async () => {
    responseDeleteCommentMutate({ commentId: id });
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <S.CommentItemContainer>
      {author.profileImageUrl ? (
        <S.ProfileImage
          width={34}
          height={34}
          src={author.profileImageUrl}
          alt="프로필 이미지"
        />
      ) : (
        <S.ProfileImage
          width={34}
          height={34}
          src={defaultImg}
          alt="프로필 이미지"
        />
      )}
      <S.CommentInfoBox>
        <S.NameAndDateBox>
          <S.CommentNickName>{author.nickname}</S.CommentNickName>
          <S.CommentDate>{formatDate(createdAt)}</S.CommentDate>
        </S.NameAndDateBox>

        <S.ContentBox>
          {isEditing ? (
            <form onSubmit={handleSubmitCommentEdit}>
              <S.CommentInput
                type="text"
                value={editContent}
                onChange={handleChangeContent}
                ref={inputRef}
              />
              <button type="submit" style={{ display: 'none' }}>
                제출
              </button>
            </form>
          ) : (
            <S.CommentContent>{content}</S.CommentContent>
          )}
        </S.ContentBox>

        <S.ButtonBox>
          <S.EditComment onClick={handleEditComment}>수정</S.EditComment>
          <S.DeleteComment onClick={handleDeleteComment}>삭제</S.DeleteComment>
        </S.ButtonBox>
      </S.CommentInfoBox>
    </S.CommentItemContainer>
  );
}

export default CommentItem;
