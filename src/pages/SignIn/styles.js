import styled from 'styled-components';
import { MdLockOutline } from 'react-icons/md';

export const Icon = styled(MdLockOutline)`
  color: ${props => props.theme.colors.primary};
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    -90deg,
    ${props => props.theme.colors.secondary},
    ${props => props.theme.colors.primary}
  );

  height: 100%;
`;

export const Content = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.space[1]};
  box-shadow: ${props => props.theme.shadows.card};
  max-width: 325px;
  padding: ${props => props.theme.space[4]};
  text-align: center;
  width: 100%;

  h1 {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fontSizes[2]};
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;

    margin-top: ${props => props.theme.space[5]};

    input {
      background: rgba(0, 0, 0, 0.05);
      border: 0;
      border-radius: ${props => props.theme.space[1]};
      color: ${props => props.theme.colors.text};
      height: ${props => props.theme.space[6]};
      margin: 0 0 8px;
      padding: 0 16px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }

    span {
      align-self: flex-start;
      color: ${props => props.theme.colors.error};
      margin-bottom: ${props => props.theme.space[2]};
    }

    button {
      background: ${props => props.theme.colors.primary};
      border: 0;
      border-radius: ${props => props.theme.space[1]};
      color: ${props => props.theme.colors.white};
      font-weight: ${props => props.theme.fontWeights.heading};
      height: ${props => props.theme.space[6]};
      margin: 8px 0 0;

      transition: all 0.3s;

      &:hover {
        background: ${props => props.theme.colors.cyan};
        box-shadow: ${props => props.theme.shadows.sm};
        transform: translateY(-1px);
      }
    }
  }
`;
