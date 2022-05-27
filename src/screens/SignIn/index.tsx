import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

//hooks
import { useAuth } from '../../hooks/auth';

//Assets
import AppleSvg from '../../assets/Apple.svg';
import GoogleSvg from '../../assets/Google.svg';
import PicPlaySvg from '../../assets/Picplay.svg';

//styled-components
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

//components
import { SignInSocialButton } from '../../Components/SignInSocialButton';

export function SignIn() {
  const { handleSignIn } = useAuth();
  // console.log(user);
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <PicPlaySvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={() => handleSignIn(true)}
          />
          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={() => handleSignIn(true)}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
