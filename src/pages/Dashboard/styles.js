import styled, { keyframes } from 'styled-components';
import { MdSearch, MdArrowUpward, MdArrowDownward } from 'react-icons/md';

export const SearchIcon = styled(MdSearch)`
  color: ${props => props.theme.colors.white};
`;
export const UpArrowIcon = styled(MdArrowUpward)`
  color: ${props => props.theme.colors.success};
`;
export const DownArrowIcon = styled(MdArrowDownward)`
  color: ${props => props.theme.colors.error};
`;

export const Container = styled.div`
  display: flex;

  background: ${props => props.theme.colors.background};
  min-height: 100vh;
  padding: 16px;

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    flex-direction: column;
  }
`;

const balanceloadingAnimation = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 16px;
  }
  40% {
    box-shadow: 0 -2em;
    height: 20px;
  }
`;

export const BalanceLoading = styled.div`
  &,
  &:before,
  &:after {
    background: ${props => props.theme.colors.primary};
    animation: ${balanceloadingAnimation} 1s infinite ease-in-out;
    width: 12px;
    height: 12px;
  }
  & {
    color: ${props => props.theme.colors.secondary};
    text-indent: -9999em;
    margin: 20px auto;
    position: relative;
    font-size: 11px;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }
  &:before,
  &:after {
    position: absolute;
    top: 0;
    content: '';
  }
  &:before {
    left: -1.5em;
    animation-delay: -0.32s;
  }
  &:after {
    left: 1.5em;
  }
`;

export const Aside = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 100px 32px 0 32px;

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    margin: 80px auto 0 auto;
  }

  aside {
    position: fixed;

    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      position: static;
    }

    h3 {
      color: ${props => props.theme.colors.darkgray};
    }

    span {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: ${props => props.theme.fontSizes[4]};
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  margin: 100px auto;
  max-width: 800px;

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    margin: 32px auto;
    width: 100%;
  }

  > p {
    margin-bottom: ${props => props.theme.space[2]};
  }
`;

export const SearchCard = styled.section`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.space[1]};
  box-shadow: ${props => props.theme.shadows.card};
  margin-bottom: ${props => props.theme.space[5]};
  padding: ${props => props.theme.space[4]};

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      flex-direction: column;

      > * {
        margin: 8px 0;
      }

      > *:last-child {
        margin-top: 16px;
      }
    }

    > p {
      color: ${props => props.theme.colors.text};
      font-size: ${props => props.theme.fontSizes[2]};
    }

    .react-date-picker {
      padding: 0 ${props => props.theme.space[3]};
    }
  }
`;
export const SearchButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${props => props.theme.colors.primary};
  border-radius: 3px;
  padding: 4px 8px;

  transition: all 0.3s;

  &:hover {
    background: ${props => props.theme.colors.cyan};
    box-shadow: ${props => props.theme.shadows.sm};
    transform: translateY(-1px);
  }

  > p {
    color: ${props => props.theme.colors.white};
    padding: 0 12px;
  }
`;
