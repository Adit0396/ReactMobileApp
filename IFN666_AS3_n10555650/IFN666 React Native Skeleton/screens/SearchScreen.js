import React, { useState, useEffect,Component } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
  TextInput,
  VirtualizedList,
  SafeAreaView,
  StatusBar,
  Button,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text } from "react-native";
import ChartScreen from "./chat";
import { Dimensions} from 'react-native';
// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)
const { width, height } = Dimensions.get('window');

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const [state, setState] = useState(
    []
    /* FixMe: initial state here */
  );
async function registerUser(credentials) {
    return fetch("http://localhost:3001/savesymbol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  // can put more code here
  const [value, onChangeText] = useState("");
  const searchSymbol = (txt) => {var output = data.filter((item) => {
      return item.ticker
        .toLowerCase()
        .includes(txt.nativeEvent.text.toLowerCase());
    });
    setState(output);
  };
  useEffect(() => {
    // FixMe: fetch symbol names from the server and save in local SearchScreen state
    fetch(ServerURL)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setState(json);
      })
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);

 var idCounter=0;
  const getItem = (data, index) => {
    idCounter++;
    var dataObj = (data[index]);
    return {
      name: `${dataObj.companyName}`,
      symbol: `${dataObj.ticker}`
    }
  }
  const getItemCount = (data) => {
    return (state === null) ? 0 : state.length;
  }
    
function listOnPress(e)
{
  alert('You clicked'+ e)
  addToWatchlist(e);
}
function chart(e)
{
 console.log(e);
 navigation.navigate('ChartScreen',{route:e})
 
}
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  // </TouchableWithoutFeedback>
    return (
      <TouchableWithoutFeedback onPress={Keyboard}>
        <View style={styles.container}>
      <Text>Enter a symbol or name of the company</Text>
      <TextInput
        style={{
          height: 54,
          borderColor: "blue",
          borderWidth: 1,
          backgroundColor: "white",
          borderRadius: 14,
          paddingLeft: 9,
        }}
        onChangeText={(text) => onChangeText(text)}
        onChange={(txt) => {
          searchSymbol(txt);
        }}
        value={value}
        placeholder="Enter stock symbol"
      />
        <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={state}
        initialNumToRender={4}
        renderItem={({ item }) => {
          return (
            <View>
            <Text style={styles.item} onPress={()=>chart(item.symbol)}>
              {item.symbol} {item.name}
              <Button style={styles.button}
                onPress={()=>listOnPress(item.symbol)}
                title="Add to Watchlist"
              />
            </Text>

            </View>
          );
        }}
        keyExtractor={({ symbol }, index) => symbol}
        getItemCount={getItemCount}
        getItem={getItem}
        //CellRendererComponent
        />
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  width:width,
  height:height,
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingTop:0.05*height

  },
  item: {
    backgroundColor: '#FFFFFF',
    height: 0.1*height,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 0.01*height,
    fontSize:0.04*width,
    width:0.95*width
  },
  title: {
    fontSize:12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
});