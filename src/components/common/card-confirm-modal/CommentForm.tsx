import { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/button/Button';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const S = {
  CommentFormBox: styled.div`
    margin-top: 2rem;
  `,

  Title: styled.h1`
    font-weight: 500;

    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.4rem;
    }
  `,

  Form: styled.form``,

  InputWrapper: styled.div`
    position: relative;
    display: flex;
    width: 100%;
  `,
  Input: styled.input`
    padding: 0 0 7rem 1rem;
    margin-top: 1rem;
    height: 12rem;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.color.grayLight};
    border-radius: 0.6rem;

    ${MEDIA_QUERIES.onMobile} {
      box-sizing: border-box;
      padding: 2rem 0 5rem 1rem;
      height: 7rem;
    }
  `,

  Button: styled(Button)`
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    ${MEDIA_QUERIES.onMobile} {
      width: 6rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
};

interface CommentFormProps {
  create: (inputValue: string) => void;
  length: number;
}

function CommentForm({ create, length }: CommentFormProps) {
  const [inputValue, setInputValue] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create(inputValue);
    setInputValue('');
  };

  return (
    <S.CommentFormBox>
      <S.Form onSubmit={submitHandler}>
        <S.Title>댓글 ({length})</S.Title>

        <S.InputWrapper>
          <S.Input
            onChange={changeHandler}
            value={inputValue}
            placeholder="댓글 작성하기"
          />

          <S.Button size="S">입력</S.Button>
        </S.InputWrapper>
      </S.Form>
    </S.CommentFormBox>
  );
}

export default CommentForm;
