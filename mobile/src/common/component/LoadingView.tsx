import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Colors, Modal, View} from 'react-native-ui-lib';

const LoadingView = ({visible}: {visible: boolean}) => {
  return (
    <Modal visible={visible} transparent>
      <View flex center backgroundColor="rgba(0,0,0,.3)">
        <ActivityIndicator color={Colors.red30} size={'large'} />
      </View>
    </Modal>
  );
};

export default LoadingView;
