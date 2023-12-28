export type RootStackParamList = {
  SplashScreen: undefined;
  SignupScreen: undefined;
  LoginScreen: undefined;
  BottomTab: undefined;
  OutletListScreen: undefined;
  DeviceListScreen: {
    code: string;
  };
  DeviceDetailScreen: {
    id: string;
    code: string;
    onRefreshList(): void;
  };
  AccountScreen: undefined;
  UpdateDevice: {
    id: string;
    name?: string;
    priority?: number;
    onRefresh(): void;
  };
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  SettingScreen: undefined;
};
