import * as React from 'react';
import { StyleSheet, Text} from 'react-native';
import { ListItem } from 'react-native-elements';
import currency from 'currency.js';

export default function PurchaseItem({ removeSpendingCategory, item }) {
    return (
      <ListItem
        title={item.categoryName}
        rightTitle={currency(item.categoryAmountSpent, {formatWithSymbol: true}).format()}
        rightContentContainerStyle={styles.rightContentContainerStyle}
        contentContainerStyle={styles.contentContainerStyle}
        rightSubtitle={currency(item.categoryAmountBudgeted, {formatWithSymbol: true}).format()}
        onPress={() => removeSpendingCategory(item.categoryName)}
        topDivider
        bottomDivider
      />
   );
}

const styles = StyleSheet.create({
  
});
