import { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import MOCK_DATA from './MockData';
import styled from 'styled-components';

const S = {
  CommentContainer: styled.ul`
    list-style: none;
    padding: 0;
  `,
};

function Comment() {
  const [list, setList] = useState(MOCK_DATA);

  const create = (inputValue: string) => {
    const newComment = {
      id: Math.random(),
      content: inputValue,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cardId: Math.floor(Math.random() * 1000),
      author: {
        profileImageUrl: 'https://i.ibb.co/ysRQMyj/me.jpg',
        nickname: `user${Math.floor(Math.random() * 100)}`,
        id: Math.floor(Math.random() * 1000),
      },
    };
    setList([newComment, ...list]);
  };

  const edit = (content: string, id: number) => {
    const updatedList = list.map((comment) =>
      comment.id === id
        ? { ...comment, content, updatedAt: new Date().toISOString() }
        : comment,
    );
    setList(updatedList);
  };

  const remove = (id: number) => {
    const updatedList = list.filter((comment) => comment.id !== id);
    setList(updatedList);
  };

  return (
    <S.CommentContainer className="comment">
      <CommentForm create={create} length={list.length} />
      <CommentList edit={edit} remove={remove} list={list} />
    </S.CommentContainer>
  );
}

export default Comment;
