import {
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Colors,
  Text,
  View,
  TouchableOpacity,
} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/types';
import Entypo from 'react-native-vector-icons/Entypo';
import {SCREEN_WIDTH} from '../../common/utils/size';
import services from '../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN_KEY} from '../../constants';
import AppData from '../../data';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LoadingView from '../../common/component/LoadingView';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shownPassword, setShownPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPressSignUp = () => {
    navigation.navigate('SignupScreen');
  };

  const validate = () => {
    if (!username || !password) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);
    const res = await services.login({username, password});
    if (res) {
      AppData.user = res.data;
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, res.data.token);
      navigation.replace('BottomTab');
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <LoadingView visible={loading} />
        <View flex backgroundColor={Colors.white}>
          <Image
            source={require('../../assets/image/login.png')}
            style={{width: SCREEN_WIDTH, height: 300, resizeMode: 'cover'}}
          />
          <View flex paddingH-32>
            <Text center marginV-16 text50>
              Đăng nhập
            </Text>
            <View marginB-20>
              <View row centerV marginB-10 style={{borderBottomWidth: 1}}>
                <Entypo name="user" size={16} />
                <TextInput
                  placeholder={'Tài khoản'}
                  onChangeText={setUsername}
                  maxLength={100}
                  style={{flex: 1, marginLeft: 6}}
                />
              </View>
              <View row centerV marginB-10 style={{borderBottomWidth: 1}}>
                <Entypo name="lock" size={16} />
                <TextInput
                  placeholder={'Mật khẩu'}
                  onChangeText={setPassword}
                  maxLength={100}
                  style={{flex: 1, marginLeft: 6}}
                  secureTextEntry={!shownPassword}
                />
                <TouchableOpacity
                  onPress={() => setShownPassword(prev => !prev)}>
                  <Entypo
                    name={shownPassword ? 'eye-with-line' : 'eye'}
                    size={16}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Button
              label={'Đăng nhập'}
              size={Button.sizes.medium}
              backgroundColor={Colors.red30}
              onPress={submit}
            />
            <View flex bottom>
              <TouchableOpacity paddingB-10 onPress={onPressSignUp}>
                <Text center>
                  Không có tài khoản? <Text color={Colors.blue30}>Đăng ký</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
