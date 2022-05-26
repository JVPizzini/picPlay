import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.bookplay_dark};
  width: 100%;
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 19px;
`;
// .attrs({contentContainerStyle: { flex: 1, padding: 24 },})
export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
  flex:1;
  
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;
// export const MonthSelectButton = styled.TouchableOpacity``;
export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;
export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const Loading = styled.View`
background-color: ${({theme}) => theme.colors.shape};
  flex: 1;
  justify-content: center;
  align-items: center;
`;
