import React from 'react';
import { SafeAreaView, View } from 'react-native';
import FormInput from '../../components/FormInput';
import styles from './styles';

const Home: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FormInput label="Nome" error helperText="Nome é obrigatório" />
        <FormInput label="Serial" helperText="Nome é obrigatório" />
        <FormInput label="Mac address" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
