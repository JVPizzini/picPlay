import React, { useEffect, useState, useCallback } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

//Components
import { HighLightCard } from '../../Components/HighLightCard';
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard';

// Components-styles
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetings,
  UserName,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  Loading,
} from './styles';

import moment from 'moment';
import { useAuth } from '../../hooks/auth';

// Interfaces and types
export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const theme = useTheme();
  const { handleSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighLightData] = useState<HighlightData>({} as HighlightData);

  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
    const todayDate = new Date().getFullYear();

    const dataArray = collection
      .filter((transaction) => transaction.type === type)
      .map((transaction) => new Date(transaction.date).getTime());

    const lastTransaction = new Date(Math.max.apply(Math, dataArray));

    return dataArray.length === 0
      ? ''
      : `${
          type === 'positive' ? 'Última entrada dia ' : 'Última saída dia '
        } ${lastTransaction.getDate()} de ${
          todayDate === lastTransaction.getFullYear()
            ? lastTransaction.toLocaleString('pt-BR', { month: 'long' })
            : lastTransaction.toLocaleString('pt-BR', { month: 'short' }) + ' de ' + todayDate
        }`;
  }

  async function loadTransactions() {
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const datakey = '@picPlay:transactions';
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      return {
        id: item.id,
        name: item.name,
        amount: amount,
        type: item.type,
        category: item.category,
        date: moment().format('DD/MM/YYYY'),
      };
    });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');

    const totalInterval = `01 a${
      lastTransactionEntries === ''
        ? lastTransactionExpensives.replace('Última saída dia ', '')
        : lastTransactionEntries.replace('Última entrada dia ', '')
    } `;

    // const totalInterval = `01  a${
    //   lastTransactionEntries ? lastTransactionExpensives : lastTransactionEntries
    // }`;

    const total = entriesTotal - expensiveTotal;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionEntries,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionExpensives,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval /* .replace('Última entrada dia', '') */,
      },
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  useEffect(() => {
    // AsyncStorage.removeItem('@picPlay:transactions');
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <Loading>
          <ActivityIndicator color={theme.colors.bookplay_light} size="large" />
        </Loading>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/51732393?v=4' }} />
                <User>
                  <UserGreetings>Olá,</UserGreetings>
                  <UserName>João Vitor</UserName>
                </User>
              </UserInfo>

              <BorderlessButton
                onPress={() => handleSignIn(false)}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Icon name="power" />
              </BorderlessButton>
              {/* 
          <LogoutButton onPress={() => {}}>
          <Icon name="power" />
          </LogoutButton> */}
            </UserWrapper>
          </Header>

          <HighLightCards>
            <HighLightCard
              type="positive"
              title="Entradas"
              amount={highlightData.entries.amount}
              // amount='123'
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighLightCard
              type="negative"
              title="Saídas"
              amount={highlightData.expensives.amount}
              // amount='123'
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighLightCard
              type="total"
              title="Total"
              // amount="R$ 16.141,00"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighLightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
