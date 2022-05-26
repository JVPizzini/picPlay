import { Container, Header, Title, Icon, Footer, Amount, LastTransaction } from './styles';

interface HighLightCardProps {
  type: 'positive' | 'negative' | 'total';
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  positive: 'arrow-up-circle',
  negative: 'arrow-down-circle',
  total: 'dollar-sign',
};
export function HighLightCard({ type, title, amount, lastTransaction }: HighLightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type}></Icon>
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
