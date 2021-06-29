import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button /* include other react-native components here as needed */,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { LineChart } from "react-native-chart-kit";
import { DataTable } from "react-native-paper";
import { render } from "react-dom";
const screenWidth = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)
export default function ChartScreen({ navigation, route }) {
    const [rowData, setRowData] = useState([]);
    const [data, setData] = useState([]);
    const symbol = route.params.route;
  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
    fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/` +symbol +`?from=2021-05-10&to=2021-06-10 &apikey=a8f49a5ac0093511da74ac2e66afe80c`)
      .then((response) => response.json())
      .then((datas1) =>
        datas1["historical"].map((company) => {
          return {
            date: company.date,
            open: company.open,
            close: company.close,
            high: company.high,
            low: company.low,
            volume: company.volume,
            //   name: company.name,
            //  sector: company.sector,
          };
        })
      )
      .then((companiesRow) => setRowData(companiesRow));
  }, [symbol]);
  console.log(rowData);
  let priceClose = [0];
  let dateClosed = [0];
  let priceOpen = [0];
  let priceHigh = [0];
  let priceLow = [0];
  let priceVol = [0];
  for (var i in rowData) {
    priceClose[i] = rowData[i].close;
    dateClosed[i] = rowData[i].date;
    priceOpen[i] = rowData[i].open;
    priceHigh[i] = rowData[i].high;
    priceLow[i] = rowData[i].low;
    priceVol[i] = rowData[i].volume;
  }
  return (
    <View style={styles.container}>
      {/* FixMe: add children here! */}
      <LineChart
        data={{
          label: dateClosed,
          datasets: [
            {
              label: dateClosed,
              data: priceClose,
              fill: false,
              //  backgroundColor: "rgba(75,162,403,1)",
              //    borderColor: "rgba(0,0,0,1)",
              // borderColor: "rgba(255,192,203, 0.8)",
              borderWidth: 2,
              lineTension: 0.5,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        //  yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title><Text>Stock:{symbol} </Text></DataTable.Title>
        </DataTable.Header>
        <DataTable.Row><Text>Date: {dateClosed[0]}</Text>
        </DataTable.Row>
        <DataTable.Row><Text>Volume: {priceVol[0]}</Text>
        </DataTable.Row>
        <DataTable.Row><Text>Open: {priceOpen[0]}</Text>
        </DataTable.Row>
        <DataTable.Row><Text>Close: {priceClose[0]}</Text>
        </DataTable.Row>
        <DataTable.Row><Text>High: {priceHigh[0]}</Text>
        </DataTable.Row>
        <DataTable.Row><Text>Low: {priceLow[0]}</Text>
        </DataTable.Row>
      </DataTable>
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  width: screenWidth,
};

//const Data
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0.1*height,
    backgroundColor: "white",
  },
});