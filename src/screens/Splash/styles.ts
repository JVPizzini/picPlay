import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;

  flex: 1;
  background-color: ${({ theme }) => theme.colors.bookplay_dark};

  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
