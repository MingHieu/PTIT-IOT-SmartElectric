import React, {useEffect, useState} from 'react';
import AppData from '../../data';
import {Colors, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/types';
import services from '../../apis';
import {IDashboard} from '../../types/IDashboard';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {onDisplayNotification} from '../../notification';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user} = AppData;
  const [data, setData] = useState<IDashboard>();

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    const unsubscribe = messaging().onMessage(onDisplayNotification);

    return unsubscribe;
  }, []);

  useEffect(() => {
    const setFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      await services.setFcmToken({fcmToken});
    };

    setFcmToken();
    getDashboard();
  }, []);

  const getDashboard = async () => {
    const res = await services.dashboard();
    setData(res.data);
  };

  return (
    <View flex backgroundColor={Colors.white} padding-16>
      <Text text65 black marginB-16>
        Xin chào, {user?.name}
      </Text>
      <View
        backgroundColor={Colors.red30}
        style={{
          borderRadius: 10,
          justifyContent: 'space-between',
          elevation: 4,
        }}
        paddingV-16
        row>
        <View
          flex
          center
          style={{borderRightWidth: 1, borderRightColor: Colors.white}}
          paddingH-16>
          <Text text70 white marginB-10>
            Số ổ cắm
          </Text>
          <Text text70 white>
            {data?.outlets}
          </Text>
        </View>
        <View
          flex
          center
          style={{borderRightWidth: 1, borderRightColor: Colors.white}}
          paddingH-16>
          <Text text70 white marginB-10>
            Số thiết bị
          </Text>
          <Text text70 white>
            {data?.devices}
          </Text>
        </View>
        <View flex center paddingH-16>
          <Text center text70 white marginB-10>
            Công suất
          </Text>
          <Text text70 white>
            {data?.wattage}
          </Text>
        </View>
      </View>
      <View
        marginT-32
        padding-16
        backgroundColor={Colors.white}
        style={{borderRadius: 10, elevation: 4}}>
        <View row centerV>
          <Image
            source={require('../../assets/image/function.png')}
            width={20}
            height={20}
            marginR-4
          />
          <Text text65 black>
            Chức năng
          </Text>
        </View>
        <View row marginT-16>
          <TouchableOpacity
            onPress={() => navigation.navigate('OutletListScreen')}
            center
            padding-16
            style={{flex: 1 / 3}}>
            <Image
              source={require('../../assets/image/outlet.png')}
              width={50}
              height={50}
            />
            <Text black center>
              Quản lí ổ cắm
            </Text>
          </TouchableOpacity>
          <View center padding-16 style={{flex: 1 / 3}}>
            <Image
              source={require('../../assets/image/question.png')}
              width={50}
              height={50}
            />
            <Text black center>
              Coming soon
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
