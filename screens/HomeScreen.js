import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import currency from 'currency.js';
import Colors from '../constants/Colors';
import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';

export default function HomeScreen({ navigation, route }) {
  const { budget } = route.params; 
  const { total } = route.params;
  const { budgetSet } = route.params;

  const [totalSpentPercentage, setTotalSpentPercentage] = useState(0);

  React.useEffect(() => {
    if (route.params?.total) {
      updateTotalSpentPercentage();
    }
  }, [route.params?.total]);

  React.useEffect(() => {
    if (route.params?.budget) {
      updateTotalSpentPercentage();
    }
  }, [route.params?.budget]);


  const updateTotalSpentPercentage = () => {
    if (budget != 0) {
      setTotalSpentPercentage(Number(total) / Number(budget));
    }
  }

  const getProgressAmount = () => {
    if (budgetSet) {
      return Number(totalSpentPercentage.toFixed(2));
    }
    return 0.00;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
          progress={getProgressAmount()}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>You have {currency(currency(budget).subtract(total), { formatWithSymbol: true }).format()} remaining this month. </Text>
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
  },
  contentContainer: {
    padding: 20,
  },
  content: {
    alignItems: 'center',
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
  text: {
    fontFamily: 'quicksand',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20
  },
});
