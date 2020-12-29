import React, { useState,useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import numeral from "numeral";
import { Icon } from "native-base";

export default function Home() {
  const [data,setData]=useState([]);
  const [loadingPop, setLoadingPop] = useState(true);
  const [population,setPopulation]=useState();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    fetch("https://covid-19-data.p.rapidapi.com/totals", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "Your API Key",
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  },[])
  useEffect(() => {
    fetch("https://world-population.p.rapidapi.com/worldpopulation", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "Your API Key",
        "x-rapidapi-host": "world-population.p.rapidapi.com",
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setPopulation(responseJson.body.world_population);
      setLoadingPop(false);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 10 }}>
      <View style={{ marginVertical: 10, padding: 10, borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 29, fontWeight: "bold" }}>
          Covid 19 Global Stats
        </Text>
      </View>
      {!loading && !loadingPop ? (
        <View style={{ width: "90%", alignItems: "center" }}>
          <View style={[styles.card, { backgroundColor: "#4169e1" }]}>
            <View>
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "white" }}
              >
                Confirmed Cases
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, paddingTop: 9, color: "white" }}>
                  {numeral(data[0].confirmed).format()}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 9,
                    color: "white",
                    marginLeft: 30,
                  }}
                >
                  {`${parseFloat(
                    (data[0].confirmed / population) * 100
                  ).toFixed(2)}%`}
                </Text>
              </View>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Icon
                type="MaterialIcons"
                name="coronavirus"
                style={{
                  fontSize: 55,
                  color: "#ffffff",
                }}
              />
            </View>
          </View>
          <View style={[styles.card, { backgroundColor: "#ff4500" }]}>
            <View>
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "#ffffff" }}
              >
                Critical Cases
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, paddingTop: 9, color: "#ffffff" }}>
                  {numeral(data[0].critical).format()}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 9,
                    color: "white",
                    marginLeft: 30,
                  }}
                >
                  {`${parseFloat((data[0].critical / population) * 100).toFixed(
                    3
                  )}%`}
                </Text>
              </View>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Icon
                type="MaterialCommunityIcons"
                name="emoticon-cry-outline"
                style={{
                  fontSize: 50,
                  color: "#ffffff",
                }}
              />
            </View>
          </View>
          <View style={[styles.card, { backgroundColor: "limegreen" }]}>
            <View>
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "#ffffff" }}
              >
                Recovered
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, paddingTop: 9, color: "#ffffff" }}>
                  {numeral(data[0].recovered).format()}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 9,
                    color: "white",
                    marginLeft: 30,
                  }}
                >
                  {`${parseFloat(
                    (data[0].recovered / population) * 100
                  ).toFixed(2)}%`}
                </Text>
              </View>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Icon
                type="FontAwesome5"
                name="running"
                style={{
                  fontSize: 50,
                  color: "#ffffff",
                }}
              />
            </View>
          </View>
          <View style={[styles.card, { backgroundColor: "red" }]}>
            <View>
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "#ffffff" }}
              >
                Deaths
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, paddingTop: 9, color: "#ffffff" }}>
                  {numeral(data[0].deaths).format()}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 9,
                    color: "white",
                    marginLeft: 30,
                  }}
                >
                  {`${parseFloat((data[0].deaths / population) * 100).toFixed(
                    2
                  )}%`}
                </Text>
              </View>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Icon
                type="FontAwesome"
                name="heartbeat"
                style={{
                  fontSize: 50,
                  color: "#ffffff",
                }}
              />
            </View>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 15, fontStyle: "italic" }}>
              Last Updated: {data[0].lastUpdate.substr(0, 10)}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ height: 80 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "80%",
    justifyContent:"space-between",
    height:90,
    padding:10,
    borderRadius:10,
    marginVertical:10,
    borderWidth:0,
    
  },
});
