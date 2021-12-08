import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS} from '../common/Theme';

const Header = ({title, backBtn}) => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={styles.headerContainer}>
        <View style={[styles.headerView, backBtn && styles.alignItems]}>
          {backBtn && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.postisionBack}>
              <AntDesign name="arrowleft" size={23} color={COLORS.white} />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {backgroundColor: COLORS.primary},
  headerView: {
    paddingVertical: 15,
    paddingTop: 25,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  postisionBack: {
    position: 'absolute',
    left: 16,
    top: 30,
  },
  title: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
  },
  alignItems: {
    alignItems: 'center',
  },
});
