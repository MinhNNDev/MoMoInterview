import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Header} from '../../components';

const Detail = ({route}) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <Header backBtn title={item.title} />
      <Image
        resizeMode="contain"
        source={{
          uri: item.url,
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default Detail;
