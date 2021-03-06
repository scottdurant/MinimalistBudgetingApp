// this is a component that will display all the info for a purchase nicely
import * as React from 'react';
import { StyleSheet, Text} from 'react-native';
import currency from 'currency.js';
import { ListItem } from 'react-native-elements';

export default function PurchaseItem({ removePurchase, item }) {
    return (
      <ListItem
        title={item.description}
        rightTitle={currency(item.price, {formatWithSymbol: true}).format()}
        subtitle={item.category}
        rightSubtitle={item.date} 
        onPress={() => removePurchase(item.key)}
        topDivider
        bottomDivider
      />
   );
}