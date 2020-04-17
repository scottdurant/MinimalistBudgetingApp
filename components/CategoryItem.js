import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import currency from 'currency.js';
import Colors from '../constants/Colors';
import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';


export default function PurchaseItem({ removeSpendingCategory, item }) {

  const getCategoryPercentage = (spent, budgeted) => {
    debugger;
    if (budgeted != 0) {
      var categoryPercent = Number(spent) / Number(budgeted);
      return Number(categoryPercent.toFixed(2));
    }
    return 0.00;
  }

  return (
    <ListItem
      title={item.categoryName}
      subtitle={
        <View>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            color={Colors.tintColor}
            //indeterminate={false}
            progress={getCategoryPercentage(item.categoryAmountSpent, item.categoryAmountBudgeted)}
          />
        </View>
      }
      rightTitle={currency(item.categoryAmountSpent, { formatWithSymbol: true }).format()}
      rightSubtitle={currency(item.categoryAmountBudgeted, { formatWithSymbol: true }).format()}
      onPress={() => removeSpendingCategory(item.categoryName)}
      topDivider
      bottomDivider
    />
  );
}

const styles = StyleSheet.create({

});
