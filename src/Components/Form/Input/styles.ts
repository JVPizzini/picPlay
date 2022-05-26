import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Props } from '.';
// .attrs(({ theme }) => ({placeholderTextColor: theme.colors.sucess,}))
export const Container = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.dark_2};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  margin-bottom: 8px;
`;
