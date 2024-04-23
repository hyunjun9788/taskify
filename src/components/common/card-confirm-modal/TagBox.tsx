import styled from 'styled-components';
import { CardConfirmModalProps } from '@/components/common/Modal/card-confirm/types';
import HashTag from '@/components/common/tag/HashTag';
import StateTag from '@/components/common/tag/StateTag';
import useWindowSize, { Size } from '@/hooks/useWindowSize';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const S = {
  TagBox: styled.div`
    display: flex;
    margin-bottom: 2.5rem;

    ${MEDIA_QUERIES.onMobile} {
      margin: 1rem 0 2.3rem 0;
    }
  `,

  HeightLine: styled.div`
    border: 1px solid ${({ theme }) => theme.color.grayLight};
    margin: 0 2rem 0.2rem 2rem;
  `,
};
function TagBox({ cardInfoData }: CardConfirmModalProps) {
  const { width }: Size = useWindowSize();
  const isMobile: boolean = width !== undefined && width <= 768;
  return (
    <S.TagBox>
      <StateTag isMobile={isMobile}>{cardInfoData.tags}</StateTag>
      <S.HeightLine />
      <HashTag isMobile={isMobile} index={0}>
        프로젝트
      </HashTag>
      <HashTag isMobile={isMobile} index={1}>
        프론트엔드
      </HashTag>
    </S.TagBox>
  );
}
export default TagBox;
