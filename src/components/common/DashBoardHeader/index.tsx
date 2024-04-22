import Image from 'next/image';
import Button from '../button/Button';
import styled from 'styled-components';
import useWindowSize, { Size } from '@/hooks/useWindowSize';
import { BUTTON_TYPE } from '@/constants/BUTTON_TYPE';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';
import CreateByMe from '@/public/icon/creatByMe.svg';
import InvitationIcon from '@/public/icon/plus.svg';
import SettingIcon from '@/public/icon/setting.svg';
import theme from '@/styles/theme';

const REST_PROFILE_IMG = 'https://i.ibb.co/YQwK6HF/Ellipse-43.png';
const S = {
  HeaderLayout: styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 98;

    width: 100%;
    height: 7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-top: none;
    border-bottom: 0.1rem solid ${theme.color.grayLight};

    background-color: ${theme.color.white};
    ${MEDIA_QUERIES.onPc} {
      padding-left: 30rem;
    }
    ${MEDIA_QUERIES.onTablet} {
      padding-left: 16rem;
    }
    ${MEDIA_QUERIES.onMobile} {
      padding-left: 6.7rem;
      height: 6rem;
    }
  `,

  MenuNameContainer: styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    padding-left: 3rem;

    font-weight: 700;
    font-size: 2rem;

    ${MEDIA_QUERIES.onTablet} {
      display: none;
    }
    ${MEDIA_QUERIES.onMobile} {
      display: none;
    }
  `,
  CreateByMe: styled(CreateByMe)`
    width: 2rem;
    height: 1.6rem;
  `,
  ButtonAndUserContainer: styled.div`
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
  `,
  ButtonContainer: styled.div<{ $myPage: boolean }>`
    display: ${({ $myPage }) => $myPage ? 'none' :'flex' };
     //추후 구현
    gap: 1rem;

    ${MEDIA_QUERIES.onMobile} {
      gap: 0.6rem;
    }
  `,
  SettingIcon: styled(SettingIcon)`
    ${MEDIA_QUERIES.onMobile} {
      display: none;
    }
  `,
  InvitationIcon: styled(InvitationIcon)`
    ${MEDIA_QUERIES.onMobile} {
      display: none;
    }
  `,


  Button: styled(Button)`
    display: flex;
    padding: 0.7rem 1.7rem;
    gap: 0.2rem;

    color: ${theme.color.grayDark};

    ${MEDIA_QUERIES.onMobile} {
      padding: 0.6rem 1.2rem;
    }
  `,




  InvitedUsersBox: styled.div<{ $myPage: boolean }>`
   position: relative;
    display: ${({ $myPage }) => ($myPage ? 'none' : 'flex')};
    align-items: center;
    margin: 0 2rem;

    ${MEDIA_QUERIES.onMobile} {
      margin: 0 1.2rem;
    }
  `,

  InvitedUserImage: styled(Image)`
    ${MEDIA_QUERIES.onMobile} {
      width: 3.4rem;
      height: 3.4rem;
    }
  `,


  RestUsers: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: -0.8rem;
  `,

  RestUserIcon: styled(Image)`
    ${MEDIA_QUERIES.onMobile} {
      width: 3.4rem;
      height: 3.4rem;
    }
  `,

  RestUserText: styled.span`
    position: absolute;
    left: 0.7rem;

    font-weight: 700;
    color: ${theme.color.pink};

    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.4rem;
    }
  `,



  ProfileBox: styled.div<{ $myPage: boolean }>`

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 4rem;
    border-left: ${({ $myPage }) =>
      $myPage ? 'none' : `1px solid ${theme.color.grayLight}`};
    gap: 1rem;

    ${MEDIA_QUERIES.onMobile} {
      padding: 0 1rem;
    }
  `,

  ProfileImg: styled(Image)`
    ${MEDIA_QUERIES.onMobile} {
      width: 3.4rem;
      height: 3.4rem;
    }
  `,

  ProfileName: styled.div`
    font-size: 1.6rem;
    font-weight: 500;

    ${MEDIA_QUERIES.onMobile} {
      display: none;
    }
  `,
};

interface HeaderProps {
  dashboardName: string;
  createdByMe: boolean;
  profileName: string;
  profileImgURL: string;
  invitedUsers: InvitedUsersProp[];
  openInviteModal?: () => void;
  myPage: boolean;
}
interface InvitedUsersProp {
  id: number;
  profileImageUrl: string;
}

function DashBoardHeader({
  dashboardName,
  createdByMe,
  profileName,
  profileImgURL,
  invitedUsers,
  openInviteModal,
  myPage,
}: HeaderProps) {
  const { width }: Size = useWindowSize();
  const isPc: boolean = width !== undefined && width >= 1200;
  return (

    <S.HeaderLayout>
      <S.MenuNameContainer>
        {dashboardName}
        {createdByMe && <S.CreateByMe />}
      </S.MenuNameContainer>

      <S.ButtonAndUserContainer>
        <S.ButtonContainer $myPage={myPage}>
          <S.Button styleType={BUTTON_TYPE.SECONDARY} size="S">
            <S.SettingIcon />
            관리
          </S.Button>
          <S.Button
            onClick={openInviteModal}
            styleType={BUTTON_TYPE.SECONDARY}
            size="S"
          >
            <S.InvitationIcon />
            초대하기
          </S.Button>
        </S.ButtonContainer>
        <S.InvitedUsersBox $myPage={myPage}>
          {invitedUsers &&
            isPc &&
            invitedUsers.slice(0, 4).map((invitedUser, index) => (
              <S.InvitedUserImage
                key={invitedUser.id}
                width={38}
                height={38}
                src={invitedUser.profileImageUrl}
                alt="초대된 유저"
                style={{
                  marginLeft: `${0 - 0.8}rem`,
                  zIndex: index - invitedUsers.length,
                }}
              />
            ))}
          {invitedUsers &&
            !isPc &&
            invitedUsers.slice(0, 2).map((invitedUser, index) => (
              <div>
                <S.InvitedUserImage
                  key={invitedUser.id}
                  width={34}
                  height={34}
                  src={invitedUser.profileImageUrl}
                  alt="초대된 유저"
                  style={{
                    marginLeft: `${0 - 0.88}rem`,
                    zIndex: index - invitedUsers.length,
                  }}
                />
              </div>
            ))}
          <S.RestUsers>
            <S.RestUserIcon 
              width={38}
              height={38}
              src={REST_PROFILE_IMG}
              alt="표시 제외된 나머지 유저 수"
            />

            {isPc ? (
              <S.RestUserText>+{invitedUsers.length - 4}</S.RestUserText>
            ) : (
              <S.RestUserText>+{invitedUsers.length - 2}</S.RestUserText>
            )}
            
       </S.RestUsers> 
      </S.InvitedUsersBox>
      <S.ProfileBox $myPage={myPage}>
        <S.ProfileImg
          src={profileImgURL}
          width={38}
          height={38}
          alt="profileImg"
        />
        <S.ProfileName>{profileName}</S.ProfileName>
      </S.ProfileBox>
     </S.ButtonAndUserContainer>
    </S.HeaderLayout>

  );
}

export default DashBoardHeader;
