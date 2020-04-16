// this is a component that will display all the info for a purchase nicely
import * as React from 'react';
import { StyleSheet, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import currency from 'currency.js';
import { ListItem } from 'react-native-elements';

export default function PurchaseItem({ removePurchase, item }) {
    return (
      <ListItem
        title={item.description}
        rightTitle={currency(item.price, {formatWithSymbol: true}).format()}
        subtitle={item.category}
        rightSubtitle={item.date} // put the date here!
        onPress={() => removePurchase(item.key)}
        topDivider
        bottomDivider
      />


      // <TouchableOpacity onPress={() => removePurchase(item.key)}>
      //   <Text style={styles.item}>{item.description}  |  {currency(item.price, {formatWithSymbol: true}).format()}  |  {item.date}  |  {item.category}</Text>   
      // </TouchableOpacity>
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
