import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import currency from 'currency.js';
import Colors from '../constants/Colors';
import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';


export default function CategoryItem({ removeSpendingCategory, item }) {

  return (
    <ListItem
      title={item.categoryName}
      subtitle={
        <View>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            color={Colors.tintColor}
            indeterminate={false}
            progress={item.categoryPercentSpent}
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
