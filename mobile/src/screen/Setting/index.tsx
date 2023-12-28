import React, {useState} from 'react';
import {
  Button,
  Colors,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AppData from '../../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN_KEY} from '../../constants';

const SettingScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user} = AppData;
  const [isNotiEnabled, setIsNotiEnabled] = useState(false);

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    navigation.replace('LoginScreen');
  };

  return (
    <View flex backgroundColor={Colors.white}>
      <View center height={150} backgroundColor={Colors.red20}>
        <View style={{position: 'absolute', bottom: -80}}>
          <Image
            source={require('../../assets/image/default-user.jpeg')}
            width={120}
            height={120}
            borderRadius={60}
          />
          <Text center text40 marginT-10>
            {user?.name}
          </Text>
        </View>
      </View>
      <View flex marginT-100 paddingH-16>
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountScreen')}
          row
          marginV-10
          backgroundColor={Colors.white}
          style={{
            borderRadius: 10,
            padding: 20,
            elevation: 4,
          }}>
          <Text text65>Thông tin cá nhân </Text>
        </TouchableOpacity>
        <View
          row
          marginV-10
          backgroundColor={Colors.white}
          style={{
            borderRadius: 10,
            padding: 20,
            elevation: 4,
          }}>
          <Text flex text65>
            Thông báo
          </Text>
          <Switch
            value={isNotiEnabled}
            onValueChange={() => setIsNotiEnabled(prev => !prev)}
            onColor={Colors.red30}
          />
        </View>
      </View>
      <Button
        label={'Đăng xuất'}
        size={Button.sizes.medium}
        backgroundColor={Colors.red30}
        onPress={logout}
        margin-16
      />
    </View>
  );
};

export default SettingScreen;
