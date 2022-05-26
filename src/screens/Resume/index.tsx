import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../Components/HistoryCard';
import { categories } from '../../utils/categories';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { addMonths, subMonths, format } from 'date-fns';
// import { ptBR } from 'date-fns/locale';

//Charts
import { VictoryPie } from 'victory-native';

//Components
import { TransactionCardProps } from '../../Components/TransactionCard';
import { BorderlessButton } from 'react-native-gesture-handler';

//Styled-components
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  // MonthSelectButton,
  MonthSelectIcon,
  Month,
  Loading,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

//Interfaces and types
interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const datakey = '@picPlay:transactions';
    const response = await AsyncStorage.getItem(datakey);
    const responseFormatted = response ? JSON.parse(response) : [];
    // console.log(responseFormatted);

    const expensives = responseFormatted.filter(
      (expensive: TransactionCardProps) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionCardProps) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCardProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(1)}%`;
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: totalFormatted,
          percent: percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );
  return (
    <Container>
      <Header>
        <Title>Resume by category</Title>
      </Header>
      {isLoading ? (
        <Loading>
          <ActivityIndicator color={theme.colors.bookplay_light} size="large" />
        </Loading>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <BorderlessButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </BorderlessButton>

            <Month>{format(selectedDate, 'MMMM,yyyy' /* , { locale: ptBR } */)}</Month>

            <BorderlessButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </BorderlessButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x="percent"
              y="total"
              colorScale={totalByCategories.map((item) => item.color)}
              style={{
                labels: { fontSize: RFValue(18), fontWeight: 'bold', fill: theme.colors.shape },
              }}
              labelRadius={70}
            />
          </ChartContainer>

          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
