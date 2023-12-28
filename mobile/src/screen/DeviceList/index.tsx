import React, {useEffect, useState} from 'react';

import {
  Colors,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import Header from '../../common/component/Header';
import {FlatList, RefreshControl, ScrollView} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SetWattageModal from './SetWattageModal';
import LoadingView from '../../common/component/LoadingView';
import services from '../../apis';
import {IOutlet} from '../../types/IOutlet';
import {IDevice} from '../../types/IDevice';
import {wsUrl} from '../../apis/constant';
import AppData from '../../data';

const DeviceListScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'DeviceListScreen'>>();
  const {code} = route.params;
  const [data, setData] = useState<IOutlet>();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wattageModalVisible, setWattageModalVisible] = useState(false);

  useEffect(() => {
    onRefresh();

    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'user',
          id: AppData.user?.id,
        }),
      );
    };

    ws.onmessage = message => {
      try {
        const res = JSON.parse(message.data);
        console.log(res);
        if (res.code === code) {
          setData(prev => {
            if (!prev) {
              return prev;
            }
            const i = prev.devices.findIndex(d => d.port === res.port);
            if (i !== -1) {
              prev.devices[i].state = res.state;
            }
            return {...prev};
          });
        }
      } catch (error) {}
    };
  }, []);

  const onRefresh = async () => {
    setRefresh(true);
    const res = await services.getOutlet(code);
    setData(res.data);
    setRefresh(false);
  };

  const renderItem = ({item, index}: {item: IDevice; index: number}) => {
    const {id, name, port, state} = item;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DeviceDetailScreen', {
            id,
            code,
            onRefreshList: onRefresh,
          })
        }
        padding-16
        backgroundColor={Colors.white}
        marginV-10
        marginH-4
        style={{elevation: 4, borderRadius: 10}}>
        <View row marginB-6 centerV>
          <Text flex>Trạng thái</Text>
          <Switch
            value={state}
            onValueChange={value => {
              if (value) {
                services.turnOnDevice(id, code);
              } else {
                services.turnOffDevice(id, code);
              }
              setData(prev => {
                if (!prev) {
                  return prev;
                }
                prev.devices[index].state = value;
                return {...prev};
              });
            }}
          />
        </View>
        <View row marginB-6 centerV>
          <Text flex>Tên</Text>
          <Text>{name}</Text>
        </View>
        <View row centerV>
          <Text flex>Cổng</Text>
          <Text>{port}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View flex backgroundColor={Colors.white}>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
        <View flex paddingH-16>
          <View
            flex
            marginB-10
            paddingB-10
            style={{borderBottomWidth: 1, borderBottomColor: Colors.grey40}}>
            <View row marginB-10 centerV>
              <Text flex text50>
                Thông tin chi tiết
              </Text>
              <TouchableOpacity onPress={() => setWattageModalVisible(true)}>
                <AntDesign name="edit" size={20} />
              </TouchableOpacity>
            </View>
            <View row marginB-10>
              <Text flex>ID</Text>
              <Text>{data?.code}</Text>
            </View>
            <View row marginB-10>
              <Text flex>Công suất tối đa</Text>
              <Text>{data?.maxWattage}W</Text>
            </View>
            <View row marginB-10>
              <Text flex>Số lượng thiết bị</Text>
              <Text>{data?.devices.length}</Text>
            </View>
            <View row>
              <Text flex>Trạng thái</Text>
              <Text green30>Đang hoạt động</Text>
            </View>
          </View>
          <View flex>
            <Text text50 marginB-10>
              Danh sách thiết bị
            </Text>
            <FlatList
              data={data?.devices}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${index}-${item}`}
              contentContainerStyle={{flexGrow: 1}}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
      <LoadingView visible={loading} />
      <SetWattageModal
        visible={wattageModalVisible}
        setVisible={setWattageModalVisible}
        outletCode={code}
        maxWattage={data?.maxWattage}
        setLoading={setLoading}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default DeviceListScreen;
