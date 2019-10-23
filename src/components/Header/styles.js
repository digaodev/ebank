import styled from 'styled-components';
import { MdLockOutline, MdExitToApp } from 'react-icons/md';

export const LogoIcon = styled(MdLockOutline)`
  color: ${props => props.theme.colors.primary};
`;

export const LogoutIcon = styled(MdExitToApp)`
  color: ${props => props.theme.colors.darkgray};
  margin-right: 2px;

  transition: all 0.2s;
`;

export const Container = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: ${props => props.theme.space[7]};
  margin: 0 auto;
  max-width: 650px;

  span {
    color: ${props => props.theme.colors.secondary};
    margin: 0 ${props => props.theme.space[2]};
  }

  nav {
    display: flex;
    align-items: center;

    h1 {
      color: ${props => props.theme.colors.primary};
      font-size: ${props => props.theme.fontSizes[1]};
      margin-right: ${props => props.theme.space[4]};
      text-transform: uppercase;
    }

    a {
      color: ${props => props.theme.colors.darkgray};
      padding: 0 ${props => props.theme.space[1]};

      &:hover {
        color: ${props => props.theme.colors.text};
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 0;
    background: none;
    color: ${props => props.theme.colors.darkgray};
    padding: 2px;
    text-align: right;

    transition: all 0.2s;

    &:hover,
    &:hover svg {
      color: ${props => props.theme.colors.text};
    }
  }

  div {
    img {
      border: 1px solid ${props => props.theme.colors.secondary};
      border-radius: 50%;
      height: ${props => props.theme.space[5]};
      width: ${props => props.theme.space[5]};
    }
  }
`;
