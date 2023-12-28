import React from 'react';
import {Colors, TouchableOpacity} from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Header = ({color = Colors.black}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={navigation.goBack} paddingV-32 paddingH-16>
      <Ionicons name="arrow-back" size={21} color={color} />
    </TouchableOpacity>
  );
};

export default Header;
