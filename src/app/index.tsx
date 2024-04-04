import { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Redirect } from 'expo-router';

import { Input } from '@/components/input';
import { colors } from '@/styles/colors';
import { Button } from '@/components/button';
import { api } from '@/server/api';
import { useBadgeStore } from '@/store/badge-store';

export default function Home() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleAccessCredential() {
    if (!code.trim()) {
      return Alert.alert('Credencial', 'Informe o código do ingresso.');
    } else {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/attendees/${code}/badge`);
        badgeStore.save(data.badge);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        Alert.alert('Credencial', 'Ticket não encontrado.');
      }
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href='/ticket'/>;
  }

  return (
    <View className='flex-1 bg-green-500 items-center justify-center p-5'>
      <Image
        source={require('@/assets/logo.png')}
        className='h-16'
        resizeMode='contain' 
      />

      <View className='w-full mt-12 gap-3'>
        <Input>
          <MaterialCommunityIcons
            name='ticket-confirmation-outline'
            size={20}
            color={colors.green[200]} 
          />
          <Input.Field placeholder='Código do ingresso' onChangeText={setCode} />
        </Input>

        <Button title='Acessar credencial' onPress={handleAccessCredential} isLoading={isLoading} />

        <Link
          href='/register'
          className='text-gray-100 text-base font-bold text-center mt-8'>
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  );
}