import styled from 'styled-components/native';
import { RFValue} from 'react-native-responsive-fontsize';

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;

  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.shape};

  justify-content: space-between;
  align-items: center;

  padding: 13px 24px;

  border-left-width: ${RFValue(5)}px;
  border-left-color: ${({color}) => color};
  border-radius: 5px;

  margin-bottom: 8px;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;
export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;
