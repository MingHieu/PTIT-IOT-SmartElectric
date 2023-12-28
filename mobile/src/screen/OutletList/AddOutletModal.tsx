import {TextInput} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {
  Button,
  Colors,
  Dialog,
  PanningProvider,
  Text,
  View,
} from 'react-native-ui-lib';
import services from '../../apis';

interface IProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh(): void;
}

const AddOutletModal: FC<IProps> = props => {
  const {visible, setVisible, setLoading, onRefresh} = props;
  const [outletCode, setOutletCode] = useState('');

  useEffect(() => {
    setOutletCode('');
  }, [visible]);

  const submit = async () => {
    setLoading(true);
    await services.addOutletToUser(outletCode);
    onRefresh();
    setLoading(false);
    setVisible(false);
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={() => setVisible(false)}
      panDirection={PanningProvider.Directions.DOWN}>
      <View backgroundColor="#fff" br20 paddingH-10 paddingV-15>
        <View>
          <Text color="#000" text80 marginB-6>
            Mã ổ cắm
          </Text>
          <TextInput
            value={outletCode}
            onChangeText={setOutletCode}
            style={{
              borderColor: '#000',
              borderWidth: 1,
              borderRadius: 6,
              paddingVertical: 6,
            }}
            placeholder="VD: BSNL01"
          />
        </View>
        <View row marginT-20>
          <Button
            flex
            label={'Áp dụng'}
            size={Button.sizes.medium}
            backgroundColor={Colors.red30}
            onPress={submit}
          />
        </View>
      </View>
    </Dialog>
  );
};

export default AddOutletModal;
