import React, {useEffect, useState} from 'react';

import {Colors, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import Header from '../../common/component/Header';
import {FlatList} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/types';
import AddOutletModal from './AddOutletModal';
import LoadingView from '../../common/component/LoadingView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import services from '../../apis';
import {IOutlet} from '../../types/IOutlet';

const OutletListScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [data, setData] = useState<IOutlet[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addOutletModalVisible, setAddOutletModalVisible] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = async () => {
    setRefresh(true);
    const res = await services.getAllOutlet();
    setData(res.data);
    setRefresh(false);
  };

  const renderItem = ({item}: {item: IOutlet}) => {
    const {code, maxWattage} = item;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DeviceListScreen', {code})}
        padding-16
        backgroundColor={Colors.white}
        marginV-10
        marginH-4
        style={{elevation: 4, borderRadius: 10}}>
        <Text>ID: {code}</Text>
        <Text>Công suất tối đa: {maxWattage}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View flex backgroundColor={Colors.white}>
      <Header />
      <View flex paddingH-16>
        <View row centerV>
          <Text flex text50>
            Danh sách ổ cắm
          </Text>
          <TouchableOpacity onPress={() => setAddOutletModalVisible(true)}>
            <Ionicons name="add" size={24} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item}`}
          refreshing={refresh}
          onRefresh={onRefresh}
          contentContainerStyle={{flexGrow: 1}}
        />
      </View>
      <LoadingView visible={loading} />
      <AddOutletModal
        visible={addOutletModalVisible}
        setVisible={setAddOutletModalVisible}
        setLoading={setLoading}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default OutletListScreen;
