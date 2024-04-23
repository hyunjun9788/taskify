import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import AvatarImage from '@/components/common/AvatarImage';
import CardConfirmModal from '@/components/common/card-confirm-modal/CardConfirmModal';
import BackDropModal from '@/components/common/modal/BackDropModal';
import { CardInfoProps } from '@/components/common/modal/card-confirm/types';
import HashTag from '@/components/common/tag/HashTag';
import useWindowSize, { Size } from '@/hooks/useWindowSize';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';
import CalendarIconTablet from '@/public/icon/smallCalendarIcon.svg';

const S = {
  CardContainer: styled.button`
    width: 31.5rem;
    padding: 2rem;
    border: ${({ theme }) => theme.border.lightGray};
    border-radius: 0.6rem;
    background-color: ${({ theme }) => theme.color.white};
    ${MEDIA_QUERIES.onTablet} {
      display: flex;
      width: 100%;
    }
    ${MEDIA_QUERIES.onMobile} {
      width: 100%;
      padding: 1.2rem;
    }
  `,
  ImageWrapper: styled.div`
    position: relative;
    margin-bottom: 1.2rem;
    border-radius: 0.8rem;

    width: 27.4rem;
    height: 16rem;

    overflow: hidden;

    ${MEDIA_QUERIES.onTablet} {
      margin: 0rem 2rem 0rem 0rem;

      width: 9.1rem;
      height: 5.3rem;

      border-radius: 0.4rem;
    }
    ${MEDIA_QUERIES.onMobile} {
      margin-bottom: 1rem;

      width: 100%;
      height: 15.1rem;

      border-radius: 0.6rem;
    }
  `,
  Image: styled(Image)`
    object-fit: cover;
  `,
  Title: styled.div`
    display: flex;

    margin-bottom: 1rem;

    font-size: 1.6rem;
    font-weight: 500;
    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.4rem;
    }
  `,
  CardContentWrapper: styled.div`
    width: 100%;
  `,
  CardContent: styled.div`
    ${MEDIA_QUERIES.onTablet} {
      display: flex;
      justify-content: space-around;
    }
  `,
  HashTagContainer: styled.div`
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1rem;
    white-space: nowrap;
    ${MEDIA_QUERIES.onTablet} {
      margin: 0.3rem 1.6rem 0rem 0rem;
    }
    ${MEDIA_QUERIES.onMobile} {
      margin-bottom: 0.6rem;
      gap: 0.4rem;
    }
  `,
  DateAndProfileWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${MEDIA_QUERIES.onTablet} {
      width: 100%;
    }
  `,
  CalendarIconWrapper: styled.div`
    display: flex;
    align-items: center;
  `,
  CalendarIcon: styled(CalendarIconTablet)`
    ${MEDIA_QUERIES.onMobile} {
      scale: 0.8;
      margin-left: -0.2rem;
    }
  `,
  Date: styled.span`
    margin-left: 0.6rem;
    padding-top: 0.1rem;
    color: ${({ theme }) => theme.color.grayDark};
    font-size: 1.2rem;
    font-weight: 500;
    align-items: center;
    ${MEDIA_QUERIES.onMobile} {
      font-size: 1rem;
      margin: 0rem 0rem;
      padding-top: 0.3rem;
    }
  `,
  AvatarImage: styled(AvatarImage)`
    width: 2.4rem;
    height: 2.4rem;
    ${MEDIA_QUERIES.onMobile} {
      width: 2.2rem;
      height: 2.2rem;
    }
  `,
};

function Card({ cardInfoData }: CardInfoProps) {
  const { width }: Size = useWindowSize();
  const isTablet: boolean = width !== undefined && width <= 1200;
  const isMobile: boolean = width !== undefined && width < 768;

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <S.CardContainer
        id={cardInfoData.id}
        // columnId={cardInfoData.columnId}
        onClick={openModal}
      >
        {cardInfoData.imageUrl && (
          <S.ImageWrapper>
            <S.Image
              src={cardInfoData.imageUrl}
              layout="fill"
              alt="카드 이미지"
            />
          </S.ImageWrapper>
        )}
        <S.CardContentWrapper>
          <S.Title>{cardInfoData.title}</S.Title>
          <S.CardContent>
            <S.HashTagContainer>
              {cardInfoData.tags.map((tag, index) => (
                <HashTag key={index} index={index} isMobile={isTablet}>
                  {tag}
                </HashTag>
              ))}
            </S.HashTagContainer>
            <S.DateAndProfileWrapper>
              <S.CalendarIconWrapper>
                <S.CalendarIcon />
                <S.Date>{cardInfoData.dueDate}</S.Date>
              </S.CalendarIconWrapper>
              <div>
                <S.AvatarImage
                  src={cardInfoData.assignee.profileImageUrl}
                  width={isMobile ? '2.2rem' : '2.4rem'}
                  height={isMobile ? '2.2rem' : '2.4rem'}
                />
              </div>
            </S.DateAndProfileWrapper>
          </S.CardContent>
        </S.CardContentWrapper>
      </S.CardContainer>

      <BackDropModal isOpen={isModalOpen} onClose={closeModal}>
        <CardConfirmModal cardInfoData={cardInfoData} />
      </BackDropModal>
    </>
  );
}

export default Card;
