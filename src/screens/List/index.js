import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {Header} from '../../components';
import {COLORS, SIZES} from '../../common/Theme';
import {getAssets} from '../../redux/actions/assetsActions';

const List = props => {
  const {assets, getAssets} = props;
  // console.log('List:', assets);
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  useEffect(() => {
    if (assets) {
      setFilteredData(assets);
      setMasterData(assets);
    }
  }, [assets]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Thoát ứng dụng !', 'Bạn có muốn thoát ứng dụng ?', [
        {
          text: 'Hủy',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Ok', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const renderItemAssets = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.containerAssets,
                  {
                    backgroundColor:
                      index % 2 === 0 ? COLORS.transparentBlack1 : COLORS.white,
                  },
                ]}
                onPress={() => navigation.navigate('Detail', {item})}>
                <Image
                  resizeMode="cover"
                  source={{
                    uri: item.thumbnailUrl,
                  }}
                  style={styles.imgAssets}
                />
                <Text style={styles.title}>{item.title}ahihi</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  };

  //Test
  // const logout = async () => {
  //   await AsyncStorage.clear();
  //   navigation.goBack();
  //   console.log('Clear token !!!');
  // };

  if (!assets) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Danh sách hình ảnh" />
      <View style={styles.containerSearch}>
        <TextInput
          placeholder="Tìm kiếm ..."
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          style={styles.searchInput}
        />
      </View>
      {renderItemAssets()}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    assets: state.asset.assets,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAssets: () => {
      return dispatch(getAssets());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSearch: {
    paddingHorizontal: SIZES.padding,
  },
  searchInput: {
    margin: 10,
    fontSize: 16,
    borderWidth: 1,
  },
  title: {
    flex: 1,
    paddingHorizontal: SIZES.padding / 2,
  },
  containerAssets: {
    padding: SIZES.padding / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  imgAssets: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
