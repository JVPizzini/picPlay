import React from 'react';
import { TextInputProps } from 'react-native';

//styled-components
import { Container } from './styles';

// Interfaces and types
export interface Props extends TextInputProps{};

export function Input({ ...rest }: Props) {
  return <Container {...rest} />;
}
