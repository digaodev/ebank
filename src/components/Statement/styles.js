import styled from 'styled-components';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

export const DropDownIcon = styled(MdArrowDropDown)`
  color: ${props => props.theme.colors.primary};
`;
export const DropUpIcon = styled(MdArrowDropUp)`
  color: ${props => props.theme.colors.cyan};
`;

export const Container = styled.div`
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.sm};
  margin: ${props => props.theme.space[1]} 0;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > p {
    color: ${props => props.theme.colors.text};
    text-align: center;
  }
  > p:first-of-type {
    color: ${props => props.theme.colors.darkgray};
    font-size: 14px;
    padding: 0 ${props => props.theme.space[3]};
    text-align: left;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${props => props.theme.colors.white};
  cursor: pointer;
  margin: ${props => props.theme.space[1]} 0;
  padding: 0 ${props => props.theme.space[2]};
  padding-left: ${props => props.theme.space[3]};
  width: 100%;
`;

export const ExpansionPanel = styled.div`
  display: flex;
  justify-content: space-between;

  background: ${props => props.theme.colors.offwhite};
  margin: ${props => props.theme.space[2]} 0;
  padding: 0 ${props => props.theme.space[1]};

  width: 100%;
`;

export const Details = styled.div`
  flex: 1;

  margin: 0 ${props => props.theme.space[1]};

  .sender {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSizes[2]};
    font-weight: ${props => props.theme.fontWeights.heading};
    margin: ${props => props.theme.space[3]} 0;
    text-align: left;
  }

  .description {
    color: ${props => props.theme.colors.darkgray};
    font-size: 14px;
    margin-bottom: ${props => props.theme.space[7]};
    text-align: left;
  }

  .amount {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSizes[3]};
    text-align: left;
  }
`;
export const Location = styled.div`
  flex: 1;

  margin: 0 ${props => props.theme.space[1]};

  img {
    height: 100%;
    width: 100%;
  }
`;
