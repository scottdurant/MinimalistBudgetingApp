import * as React from 'react';
import { StyleSheet, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import currency from 'currency.js';

export default function PurchaseItem({ removePurchase, item }) {
    return (
      <TouchableOpacity>
        <Text style={styles.item}>{item.categoryName}</Text>   
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
