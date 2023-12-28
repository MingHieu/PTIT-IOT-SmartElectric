import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Colors, Text, View} from 'react-native-ui-lib';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/types';
import Header from '../../common/component/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LoadingView from '../../common/component/LoadingView';
import services from '../../apis';

const UpdateDevice = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'UpdateDevice'>>();
  const {id, name, priority, onRefresh} = route.params;
  const [form, setForm] = useState(() => ({
    name: name,
    priority: priority,
  }));
  const [loading, setLoading] = useState(false);

  const onChangeText = (key: string, text: string | number) => {
    setForm(prev => ({...prev, [key]: text}));
  };

  const validate = () => {
    if (form.name === null || form.priority === null) {
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
    const res = await services.updateDevice(id, form);
    if (res) {
      onRefresh()
      navigation.goBack();
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
              Cập nhật thiết bị
            </Text>
            <View marginB-20>
              <View row centerV marginB-10 style={{borderBottomWidth: 1}}>
                <TextInput
                  placeholder={'Tên'}
                  value={form.name}
                  onChangeText={text => onChangeText('name', text)}
                  maxLength={100}
                  style={{flex: 1, marginLeft: 6}}
                />
              </View>
              <View row centerV marginB-10 style={{borderBottomWidth: 1}}>
                <TextInput
                  placeholder={'Độ ưu tiên'}
                  value={String(form.priority)}
                  onChangeText={text => onChangeText('priority', +text)}
                  maxLength={100}
                  style={{flex: 1, marginLeft: 6}}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <Button
              label={'Lưu'}
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

export default UpdateDevice;

const styles = StyleSheet.create({});
