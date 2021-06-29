import React, { useState, useContext, useEffect } from "react";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);
  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};
export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);
  // can put more code here
  async function addToWatchlist(newSymbol) {
    var symbolsArray = await AsyncStorage.getItem("@Log");
    symbolsArray === undefined || symbolsArray === null
      ? (symbolsArray = [])
      : (symbolsArray = JSON.parse(symbolsArray));
    if (!symbolsArray.includes(newSymbol)) {
      symbolsArray.push(newSymbol);
      await AsyncStorage.setItem("@Log", JSON.stringify(symbolsArray));
    }
    setState(symbolsArray);
    
  }

  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    
    AsyncStorage.getItem("@Log")
      .then((response) => JSON.parse(response))
      .then((symbolList) => {
        setState(symbolList);
        console.log(state);
        
      });
  }, []);
  return {
    ServerURL:
      "https://financialmodelingprep.com/api/v3/actives?apikey=a8f49a5ac0093511da74ac2e66afe80c",
    watchList: state,
    addToWatchlist,
  };
};

let _retrieveData = async () => {
  try {
    
    var array = ([] = await AsyncStorage.getItem("@Log"));
    console.log(array);
    if (array !== null) {
      console.log("We have data!!");
      setState(JSON.parse(array));
    }
  } catch (error) {
    // Error retrieving data
  }
  }