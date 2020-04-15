import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import currency from 'currency.js';
import Colors from '../constants/Colors';
import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';

export default function HomeScreen({ navigation, route }) {
  const { budget } = route.params; // might need default value?
  const { total } = route.params;

  const [totalSpentPercentage, setTotalSpentPercentage] = useState(0);

  React.useEffect(() => {
    if (route.params?.total) {
      setTotalSpentPercentage(Number(total) / Number(budget));
    }
  }, [route.params?.total]);

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
      <View>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          color={Colors.tintColor}
          indeterminate={false}
          progress={Number(totalSpentPercentage.toFixed(2))}
        />
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
