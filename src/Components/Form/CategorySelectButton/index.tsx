import React from 'react';
import { Container, Category, Icon, CategorySelected, IconFeather } from './styles';
import { RectButtonProps, RectButton } from 'react-native-gesture-handler';

interface Props extends RectButtonProps {
  title: string;
  icon: string | null;
  children: React.ReactChild;
}

export function CategorySelectButton({ title, icon, ...rest }: Props)/* : React.ReactElement */ {
  return (
    <Container {...rest}>
      <CategorySelected>
        {icon && <IconFeather name={icon} />}
        <Category>{title}</Category>
      </CategorySelected>
      <Icon name={'keyboard-arrow-down'} />
    </Container>
  );
}
