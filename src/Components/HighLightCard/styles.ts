import styled, { css } from 'styled-components/native';

//Libs
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface typeProps {
  type: 'positive' | 'negative' | 'total';
}
export const Container = styled.View<typeProps>`
  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.bookplay_dark : theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled.Text<typeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) => (type === 'total' ? theme.colors.shape : theme.colors.dark_2)};
`;
export const Icon = styled(Feather)<typeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) =>
    type === 'positive' &&
    css`
      color: ${({ theme }) => theme.colors.sucess};
    `};
  ${({ type }) =>
    type === 'negative' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `};
  ${({ type }) =>
    type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `};
`;
export const Footer = styled.View``;

export const Amount = styled.Text<typeProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) => (type === 'total' ? theme.colors.shape : theme.colors.dark_2)};
  margin-top: 38px;
`;
export const LastTransaction = styled.Text<typeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) => (type === 'total' ? theme.colors.shape : theme.colors.text)};
`;
