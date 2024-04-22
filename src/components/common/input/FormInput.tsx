import React, { ReactNode } from 'react';
import { InputHTMLAttributes } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import {
  EditPassword,
  EditPasswordType,
  EditProfile,
  EditProfileType,
  SignIn,
  SignInType,
  SignUp,
  SignUpType,
} from '@/constants/SCHEMA';

const S = {
  Form: styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.8rem;
    width: 100%;
  `,
  Container: styled.div`
    position: relative;
    margin-top: 0.4rem;
    width: 100%;
  `,
  Label: styled.label`
    color: ${({ theme }) => theme.color.body};
    font-size: 1.6rem;
  `,
  Input: styled.input<{ error?: boolean }>`
    display: flex;
    align-items: center;
    position: relative;
    margin: 0.8rem 0;
    gap: 1rem;

    width: 100%;
    padding: 1.5rem 1.6rem;
    border-radius: 0.8rem;
    border: 1px solid
      ${({ error, theme }) => (error ? theme.color.red : theme.color.grayLight)};
    background: ${({ theme }) => theme.color.white};

    &::placeholder {
      color: ${({ theme }) => theme.color.gray};
      font-size: 1.6rem;
    }

    &:focus {
      border: 1px solid ${({ theme }) => theme.color.purple};
    }
  `,
  Error: styled.p`
    position: absolute;

    color: ${({ theme }) => theme.color.red};
  `,
  Button: styled(Button)`
    width: ${(props) => (props.size === 'S' ? '8.4rem' : '100%')};
    margin-top: 1rem;
    padding: ${(props) => (props.size === 'S' ? '0.8rem' : '1.4rem')};
    font-size: ${(props) => (props.size === 'S' ? '1.4rem' : null)};
  `,
};

const formFields = {
  signIn: [
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력해주세요',
    },
    {
      id: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요',
    },
  ],
  signUp: [
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력해주세요',
    },
    {
      id: 'name',
      label: '닉네임',
      type: 'text',
      placeholder: '닉네임을 입력해주세요',
    },
    {
      id: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요',
    },
    {
      id: 'passwordCheck',
      label: '비밀번호 확인',
      type: 'password',
      placeholder: '비밀번호를 한번 더 입력해주세요',
    },
  ],
  editProfile: [
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력해주세요',
    },
    {
      id: 'name',
      label: '닉네임',
      type: 'text',
      placeholder: '닉네임을 입력해주세요',
    },
  ],
  editPassword: [
    {
      id: 'nowPassword',
      label: '현재 비밀번호',
      type: 'password',
      placeholder: '현재 비밀번호 입력',
    },
    {
      id: 'newPassword',
      label: '새 비밀번호',
      type: 'password',
      placeholder: '새 비밀번호 입력',
    },
    {
      id: 'newPasswordCheck',
      label: '새 비밀번호 확인',
      type: 'password',
      placeholder: '새 비밀번호 입력',
    },
  ],
};

const buttonText = {
  signIn: '로그인',
  signUp: '회원가입',
  editProfile: '저장',
  editPassword: '변경',
};

type FormType = 'signIn' | 'signUp' | 'editProfile' | 'editPassword';

type FormValues = SignInType | SignUpType | EditProfileType | EditPasswordType;

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  formType: FormType;
  btnSize?: 'S' | 'M' | 'L';
}

/**
 * @param formType: 'signIn' | 'signUp' | 'editProfile' | 'editPassword' 사용하는 용도에 맞게 입력
 */

const FormInput = ({
  formType,
  btnSize = 'L',
  ...htmlInputProps
}: FormInputProps) => {
  const getSchemaForFormType = (formType: FormType) => {
    switch (formType) {
      case 'signIn':
        return SignIn;
      case 'signUp':
        return SignUp;
      case 'editProfile':
        return EditProfile;
      case 'editPassword':
        return EditPassword;
      default:
        return undefined;
    }
  };

  const schema = getSchemaForFormType(formType);
  const formOptions = { resolver: schema ? zodResolver(schema) : undefined };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>(formOptions);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const fieldsToRender = formFields[formType] || [];
  //TODO 에러 처리에서 any 없애보기!
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      {fieldsToRender.map((field) => (
        <S.Container key={field.id}>
          <S.Label htmlFor={field.id}>{field.label}</S.Label>
          <S.Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            {...htmlInputProps}
            {...register(field.id as keyof FormValues)}
            onBlur={() => {
              if (field.id === 'password' || field.id === 'passwordCheck') {
                trigger(['password', 'passwordCheck']);
              } else {
                trigger(field.id as keyof FormValues);
              }
            }}
            error={!!errors[field.id as keyof FormValues]}
          />
          {errors[field.id as keyof FormValues] && (
            <S.Error>
              {(errors[field.id as keyof FormValues] as any)?.message}
            </S.Error>
          )}
        </S.Container>
      ))}
      <S.Button type="submit" size={btnSize}>
        {buttonText[formType]}
      </S.Button>
    </S.Form>
  );
};

export default FormInput;
