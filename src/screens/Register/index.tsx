import React, { useEffect, useState } from 'react';
import { Modal, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Ypositive from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

//Hooks
import { useForm } from 'react-hook-form';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

//Componentes
import { InputForm } from '../../Components/Form/InputForm';
import { Button } from '../../Components/Form/Button';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

//styled-componentss
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelectButton } from '../../Components/Form/CategorySelectButton';

//Interfaces and Types
interface FormData {
  [name: string]: string;
  //  amount: string;
}

//Variables

export function Register() {
  const dataKey = '@picPlay:transactions';

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
    icon: '',
  });

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const schema = Ypositive.object().shape({
    name: Ypositive.string().required('The name is required'),
    amount: Ypositive.number()
      .typeError('inform a numeric value')
      .positive('Only positive numbers')
      .required('The amount is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Select a transation type');
    }

    if (category.key === 'category') {
      return Alert.alert('Select a category type');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
        icon:'',
      });

      navigate('Listing');
    } catch (error) {
      console.log(error);
      Alert.alert('Could not save');
    }
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
      // console.log(JSON.parse(data!));
    }

    loadData();

    // async function removeAll() {
    //   await AsyncStorage.removeItem(dataKey);
    // }
    // removeAll();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Name"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                type="positive"
                title="Income"
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                type="negative"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionTypes>
            <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} icon={null} children={''} />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
