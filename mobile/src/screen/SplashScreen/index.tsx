import React, {useEffect} from 'react';
import services from '../../apis';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/types';
import AppData from '../../data';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors, Image, Text, View} from 'react-native-ui-lib';

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const authenticate = async () => {
    const res = await services.me();
    if (res) {
      AppData.user = res.data;
      navigation.replace('BottomTab');
    } else {
      navigation.replace('LoginScreen');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      authenticate();
    }, 1000);
  }, []);

  return (
    <View flex center backgroundColor={Colors.white}>
      <View
        style={{
          backgroundColor: Colors.white,
          padding: 20,
          borderRadius: 50,
          elevation: 4,
        }}>
        <Image
          source={require('../../assets/image/lightning.png')}
          width={50}
          height={50}
        />
      </View>
      <Text text60 black center marginT-20>
        Quản lý điện năng thông minh
      </Text>
    </View>
  );
};

export default SplashScreen;
