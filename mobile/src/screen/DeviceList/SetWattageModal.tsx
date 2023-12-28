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
  outletCode: string;
  maxWattage?: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh(): void;
}

const SetWattageModal: FC<IProps> = props => {
  const {
    visible,
    setVisible,
    outletCode,
    maxWattage = 0,
    setLoading,
    onRefresh,
  } = props;
  const [maxW, setMaxW] = useState(9999);

  useEffect(() => {
    setMaxW(maxWattage);
  }, [maxWattage]);

  const setMaxWattage = async () => {
    setLoading(true);
    await services.setMaxWattage(outletCode, {maxWattage: maxW});
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
            Công suất tối đa
          </Text>
          <TextInput
            value={String(maxW)}
            onChangeText={text => setMaxW(Number(text))}
            keyboardType="number-pad"
            style={{
              borderColor: '#000',
              borderWidth: 1,
              borderRadius: 6,
              paddingVertical: 6,
            }}
            placeholder="0"
          />
        </View>
        <View row marginT-20>
          <Button
            flex
            label={'Áp dụng'}
            size={Button.sizes.medium}
            backgroundColor={Colors.red30}
            onPress={setMaxWattage}
          />
        </View>
      </View>
    </Dialog>
  );
};

export default SetWattageModal;
