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
import {CommonActions, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/types';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../common/component/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LoadingView from '../../common/component/LoadingView';
import services from '../../apis';
import AppData from '../../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN_KEY} from '../../constants';

const SignupScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [form, setForm] = useState({
    username: '',
    password: '',
    rePassword: '',
    name: '',
    phoneNumber: '',
  });
  const [shownPassword, setShownPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeText = (key: string, text: string) => {
    setForm(prev => ({...prev, [key]: text}));
  };

  const validate = () => {
    if (
      !form.username ||
      !form.password ||
      !form.rePassword ||
      !form.name ||
      !form.phoneNumber
    ) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return false;
    }

    if (form.password !== form.rePassword) {
      Alert.alert('Mật khẩu nhập lại không khớp');
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);
    const res = await services.signup(form);
    if (res) {
      AppData.user = res.data;
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, res.data.token);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'BottomTab'}],
        }),
      );
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <LoadingView visible={loading} />
        <View flex backgroundColor={Colors.white}>
          <Header />
          <View flex paddingH-32>
            <Text center marginV-16 text50>
              Đăng ký tài khoản
            </Text>
            <View marginB-20>
              <View row centerV marginB-10 style={{borderBottomWidth: 1}}>
                <TextInput
                  placeholder={'Tài khoản'}
                  onChangeText={text => onChangeText('username', text)}
                  maxLength={100}
                  style={{flex: 1, marginLeft: 6}}
                />
              </View>
              <View row centerV marginB-10 style={{borderBottomWidth: 1}}>
                <TextInput
                  placeholder={'Mật khẩu'}
                  onChangeText={text => onChangeText('password', text)}
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
              <View row centerV marginB-10 style={{borderBottomWidth: 1}}>
                <TextInput
                  placeholder={'Nhập lại mật khẩu'}
                  onChangeText={text => onChangeText('rePassword', text)}
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
              <View row centerV marginB-10 style={{borderBottomWidth: 1}}>
                <TextInput
                  placeholder={'Họ và tên'}
                  onChangeText={text => onChangeText('name', text)}
                  maxLength={100}
                  style={{flex: 1, marginLeft: 6}}
                />
              </View>
              <View row centerV marginB-10 style={{borderBottomWidth: 1}}>
                <TextInput
                  placeholder={'Số điện thoại'}
                  onChangeText={text => onChangeText('phoneNumber', text)}
                  maxLength={100}
                  style={{flex: 1, marginLeft: 6}}
                />
              </View>
            </View>
            <Button
              label={'Đăng ký'}
              size={Button.sizes.medium}
              backgroundColor={Colors.red30}
              onPress={submit}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
