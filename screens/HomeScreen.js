import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import currency from 'currency.js';

export default function HomeScreen({ route }) {
  const { budget } = route.params; // might need default value?
  const { total } = route.params;
  
  return (
    <View style={styles.container}>
      <View style={styles.getStartedContainer}>
        <Text style={styles.currencyTextSpent}>
          {currency(total, { formatWithSymbol: true }).format()}
        </Text>
        <Text style={styles.currencyTextBudgeted}>
          {currency(budget, { formatWithSymbol: true }).format()}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.getStartedText}>You have {currency(currency(budget).subtract(total), { formatWithSymbol: true }).format()} remaining this month. </Text>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  contentContainer: {
    paddingTop: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  currencyTextSpent: {
    fontFamily: 'quicksand',
    fontSize: 48,
    textAlign: 'center',
    paddingTop: 60,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    paddingBottom: 5
  },
  currencyTextBudgeted: {
    fontFamily: 'quicksand',
    fontSize: 48,
    textAlign: 'center',
  },
  getStartedText: {
    fontFamily: 'quicksand',
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20
  },
});
