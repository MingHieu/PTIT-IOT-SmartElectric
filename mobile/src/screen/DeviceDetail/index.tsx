import React, {useEffect, useState} from 'react';

import {
  Button,
  Colors,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import Header from '../../common/component/Header';
import {RefreshControl, ScrollView} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/types';
import {LineChart} from 'react-native-chart-kit';
import {SCREEN_WIDTH} from '../../common/utils/size';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import services from '../../apis';
import {IDevice} from '../../types/IDevice';
import LoadingView from '../../common/component/LoadingView';

const DeviceDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'DeviceDetailScreen'>>();
  const {id, code, onRefreshList} = route.params;
  const [data, setData] = useState<IDevice>();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = async () => {
    setRefresh(true);
    const res = await services.getDevice(id);
    setData(res.data);
    onRefreshList();
    setRefresh(false);
  };

  const setDate = async (event: DateTimePickerEvent, _?: Date) => {
    const {
      type,
      nativeEvent: {timestamp},
    } = event;
    if (type === 'set') {
      setLoading(true);
      await services.setDeviceOffTime(id, {
        offTime: timestamp / 1000,
        outletCode: code,
      });
      onRefresh();
      setLoading(false);
    }
  };

  const setAutoOffTime = () => {
    DateTimePickerAndroid.open({
      mode: 'time',
      value: new Date(),
      onChange: setDate,
    });
  };

  const groupDataByHour = () => {
    const reports = data?.wattageRecords || [];
    const groupedData = {};

    reports.forEach(item => {
      const hour = new Date(item.createAt).getHours();

      if (!groupedData[hour]) {
        groupedData[hour] = {
          count: 1,
          sum: item.value,
        };
      } else {
        groupedData[hour].count += 1;
        groupedData[hour].sum += item.value;
      }
    });

    // Calculate average values
    const averages = [];
    for (let hour = 0; hour < 24; hour++) {
      const average = groupedData[hour]
        ? groupedData[hour].sum / groupedData[hour].count
        : 0;
      averages.push(average);
    }

    return averages;
  };

  const renderChart = () => {
    const timestamps = Array.from({length: 24}, (_, i) => `${i}:00`);
    const values = groupDataByHour();

    const chartConfig = {
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
    };

    return (
      <View>
        <Text>Công suất tiêu thụ</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={{
              labels: timestamps.length ? timestamps : ['0'],
              datasets: [
                {
                  data: values.length ? values : [0],
                },
              ],
            }}
            width={1000}
            height={220}
            yAxisSuffix="W"
            chartConfig={chartConfig}
            bezier
          />
        </ScrollView>
      </View>
    );
  };

  return (
    <View flex backgroundColor={Colors.white}>
      <Header />
      <View flex paddingH-16>
        <View flex>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }>
            <View flex>
              <View row marginB-20 centerV>
                <Text flex>Trạng thái</Text>
                <Switch
                  value={data?.state}
                  onValueChange={async value => {
                    setLoading(true);
                    if (value) {
                      await services.turnOnDevice(id, code);
                    } else {
                      await services.turnOffDevice(id, code);
                    }
                    onRefresh();
                    setLoading(false);
                  }}
                />
              </View>
              <View row marginB-20 centerV>
                <Text flex>Tên</Text>
                <Text>{data?.name}</Text>
              </View>
              <View row marginB-20 centerV>
                <Text flex>Cổng</Text>
                <Text>{data?.port}</Text>
              </View>
              <View row marginB-20 centerV>
                <Text flex>Độ ưu tiên</Text>
                <Text>{data?.priority}</Text>
              </View>
              <View row marginB-20 centerV>
                <Text flex>Thời gian tắt</Text>
                {data?.offTime ? (
                  <Text red30>{new Date(data?.offTime).toLocaleString()}</Text>
                ) : (
                  <TouchableOpacity onPress={setAutoOffTime}>
                    <Text red30>Hẹn giờ</Text>
                  </TouchableOpacity>
                )}
              </View>
              {renderChart()}
            </View>
          </ScrollView>
        </View>
        <Button
          label={'Cập nhật'}
          size={Button.sizes.medium}
          backgroundColor={Colors.red30}
          onPress={() =>
            navigation.navigate('UpdateDevice', {
              id,
              name: data?.name,
              priority: data?.priority,
              onRefresh,
            })
          }
          marginB-16
        />
      </View>
      <LoadingView visible={loading} />
    </View>
  );
};

export default DeviceDetailScreen;
