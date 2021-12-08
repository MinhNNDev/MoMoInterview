import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES} from '../../common/Theme';
import {InputValue} from '../../components';
import {connect} from 'react-redux';
import {authAction} from '../../redux/actions/authActions';

const Login = props => {
  const navigation = useNavigation();
  const {login, auth, loading} = props;
  console.log(JSON.stringify(loading));
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [emailValidate, setValidateEmail] = useState('');

  const textInputChange = val => {
    if (validateEmail(val)) {
      setData({
        ...data,
        email: val,
      });
    } else {
      setData({
        ...data,
        email: val,
      });
    }
  };

  const validateEmail = data => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(data) === false) {
      console.log('Email không đúng định dạng !');
      setValidateEmail('Email không đúng định dạng !');
      return false;
    } else {
      console.log('Email đúng rồi đó !');
      setValidateEmail('Đúng định dạng !');
      return true;
    }
  };

  const loginHandle = async data => {
    login(data);
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('tokenAuth');
      if (token === auth) {
        navigation.navigate('List');
      } else {
        Alert.alert(
          'Đăng nhập thất bại',
          'Thông tin tài khoản hoặc mật khẩu không chính xác !',
        );
      }
    }, 500);
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.main}>
          <Image
            source={require('../../assets/img/MoMo.png')}
            style={styles.logo}
          />
          <View>
            <InputValue
              title="Email"
              icon="user"
              placeholder="Username"
              onChangeText={email => textInputChange(email)}
            />
            <Text>{emailValidate}</Text>
            <InputValue
              title="Password"
              icon="lock"
              isPassword
              placeholder="Password"
              onChangeText={password => setData({...data, ...{password}})}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => loginHandle(data)}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth.token,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => {
      dispatch(authAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  main: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    justifyContent: 'space-between',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 100,
    marginHorizontal: (Dimensions.get('window').width - 198) / 2,
  },
  button: {
    width: Dimensions.get('window').width - 48,
    height: 50,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
