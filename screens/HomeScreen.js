import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import currency from 'currency.js';

export default function HomeScreen({ route }) {
  const { budget } = route.params; // might need default value?
  const { total } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Total budgeted for this month: </Text>
          <Text style={styles.getStartedText}> {currency(budget, { formatWithSymbol: true }).format()}  </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.getStartedText}>Total spent this month:</Text>
          <Text style={styles.getStartedText}> {currency(total, { formatWithSymbol: true }).format()} </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.getStartedText}>You have {currency(currency(budget).subtract(total), { formatWithSymbol: true }).format()} remaining this month. </Text>
        </View>
      </ScrollView>
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
  },
  contentContainer: {
    paddingTop: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
