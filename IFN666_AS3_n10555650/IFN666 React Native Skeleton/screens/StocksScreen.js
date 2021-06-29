import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, /* include other react-native components here as needed */ 
  TouchableWithoutFeedback} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import { Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)
export default function StocksScreen({route}) {
  const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const [data,rowData]=useState([]);
  // can put more code here
  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state  
      fetch(ServerURL)
      .then(response=> response.json())
      .then(datas=> 
          datas.map(data=>{
          return{
              symbol:data.ticker,
              name:data.companyName,
              price:data.changesPercentage,
          };
      })
      ).then(datas1=>rowData(datas1))
      }, []);

      var symbol=[]
      for( var i in data)
      {
          symbol[i]=data[i]['symbol']
      }
      var values=[]
    for( var i in symbol)
      {
          for(var j in watchList)
          {
            if(symbol[i]==watchList[j])
            values.push(data[i])
          }
      }
      console.log(values)
  return (
    <TouchableWithoutFeedback>
    <View style={styles.container}>
    <FlatList
        data={values}
        keyExtractor={({ symbol }, index) => symbol}
        renderItem={({ item }) => {
          return (
            <View>
            <Text style={styles.item}>
            {item.symbol}{'  '}{item.name}
              {item.price}
            </Text>            
             </View>
          );
        }}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  // FixMe: add styles here ...
  // use scaleSize(x) to adjust sizes for small/large screens
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "orange",
    color: "red",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 30,
    color: "white",
  },
});