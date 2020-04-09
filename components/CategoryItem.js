import * as React from 'react';
import { StyleSheet, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import currency from 'currency.js';

export default function PurchaseItem({ removeSpendingCategory, item }) {
    return (
      <TouchableOpacity onPress={() => removeSpendingCategory(item.categoryName)}>
        <Text style={styles.item}>{item.categoryName}    |      {currency(item.categoryAmountSpent, {formatWithSymbol: true}).format()}  /  {currency(item.categoryAmountBudgeted, {formatWithSymbol: true}).format()}</Text>   
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    fontFamily: 'quicksand'
  },
});
