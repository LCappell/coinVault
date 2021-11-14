import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import moment from 'moment';
import TabIcon from '../../components/TabIcon';
import Icons from '../../constants/Icons';

const DetailsItem = ({ item, onDelete, apiData }) => {
  const filteredApiData = apiData.map((data) => {
    if (data.symbol == item.userCoin) {
      return parseInt(data.price);
    }
  });

  const filteredApiData2 = apiData.map((data) => {
    if (data.symbol == item.userCoin) {
      return data['1d'].price_change_pct;
    }
  });
  const dataNumber = apiData.map((data) => {
    if (data.symbol == item.userCoin) {
      return parseInt(data.price) * item.userAmount;
    }
  });

  const num = parseInt(dataNumber);

  const renderImage =
    item.userCoin === 'BTC'
      ? 'https://g.foolcdn.com/art/companylogos/square/btc.png'
      : item.userCoin === 'ETH'
      ? 'https://downloads.coindesk.com/arc-hosted-images/eth.png'
      : item.userCoin === 'ADA'
      ? 'https://s3.cointelegraph.com/storage/uploads/view/a7872fcc56858227ffa183256a5d55e1.png'
      : item.userCoin === 'SOL'
      ? 'https://s2.coinmarketcap.com/static/img/coins/200x200/5426.png'
      : null;

  const formatDate = moment(item.date).format('L');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.coinItem}>
        <View style={styles.row}>
          <View style={styles.coinHeaderArea}>
            <Text style={styles.coinHeader}>{item.userCoin}</Text>
          </View>

          <Image
            source={{
              uri: renderImage,
            }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              marginLeft: 40,
              marginBottom: 15,
            }}
          />
        </View>

        <Text style={styles.coinText}>
          <Text style={styles.textBlue}> Current Price: </Text> $
          {filteredApiData}
        </Text>
        <Text style={[styles.coinText, styles.marginLeft]}>
          <Text style={styles.textBlue}>Price Change: </Text>
          <Text style={filteredApiData2 > 0 ? styles.green : styles.red}>
            {filteredApiData2}%
          </Text>
        </Text>

        <Text style={styles.coinText}>
          <Text style={styles.textBlue}> Bought at price: </Text> $
          {item.boughtPrice}
        </Text>

        <Text style={styles.coinText}>
          <Text style={styles.textBlue}> Date of purchase: </Text> {formatDate}
        </Text>

        <Text style={styles.coinText}>
          <Text style={styles.textBlue}> Amount: </Text>
          {item.userAmount}
        </Text>

        <Text style={[styles.coinText, { marginRight: 3 }]}>
          <Text style={styles.textBlue}> Amount in $: </Text>
          {dataNumber}
        </Text>

        <TouchableOpacity
          style={styles.deleteItem}
          onPress={() => onDelete(item._id)}
        >
          <TabIcon icon={Icons.removeItem} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 4,
    borderBottomColor: '#89cff0',
    width: '100%',
    margin: 20,
  },

  textBlue: { color: '#89cff0' },

  coinHeader: {
    color: '#fff',
    width: '100%',
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 2.5,
    fontSize: 25,
  },

  row: { flexDirection: 'row' },

  deleteItem: { position: 'absolute', right: 20, bottom: 20 },

  coinType: {
    color: '#000',
    backgroundColor: '#fff',
    width: '40%',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 1.5,
    fontSize: 20,
  },

  marginLeft: { marginLeft: 5 },

  coinHeaderArea: {
    borderBottomColor: '#fff',
    borderBottomWidth: 4,
    height: 50,
  },

  coinText: {
    color: '#cdebf9',
    marginVertical: 5,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 1.5,
    fontSize: 17,
  },

  coinItem: {
    paddingVertical: 30,
  },

  red: { color: 'red' },
  green: { color: 'green' },
});
