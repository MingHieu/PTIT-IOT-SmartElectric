import React from 'react';
import AppData from '../../data';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import Header from '../../common/component/Header';

const AccountScreen = () => {
  const {user} = AppData;

  return (
    <View flex backgroundColor={Colors.white}>
      <View height={150} backgroundColor={Colors.red20}>
        <Header color={Colors.white} />
        <View flex center>
          <View style={{position: 'absolute', bottom: -40}}>
            <Image
              source={require('../../assets/image/default-user.jpeg')}
              width={120}
              height={120}
              borderRadius={60}
            />
          </View>
        </View>
      </View>
      <View flex marginT-50>
        <View paddingH-16>
          <View
            row
            marginV-10
            style={{
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderBottomColor: Colors.grey50,
            }}>
            <Text text65 flex grey30>
              Họ và tên{' '}
            </Text>
            <Text text65 black>
              {user?.name}
            </Text>
          </View>
          <View
            row
            marginV-10
            style={{
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderBottomColor: Colors.grey50,
            }}>
            <Text text65 flex grey30>
              Tài khoản{' '}
            </Text>
            <Text text65 black>
              {user?.username}
            </Text>
          </View>
          <View
            row
            marginV-10
            style={{
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderBottomColor: Colors.grey50,
            }}>
            <Text text65 flex grey30>
              Số điện thoại{' '}
            </Text>
            <Text text65 black>
              {user?.phoneNumber}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;
