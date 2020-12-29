import React,{useState,useEffect} from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import numeral, { set } from "numeral";
import { Icon } from "native-base";
import { code } from "country-emoji";

export default function Specific({navigation,route}) {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [loadingPop, setLoadingPop] = useState(true);
    const [update,setUpdate]=useState(null);
    const [like,setLike]=useState(false)
    const [population,setPopulation]=useState([])
      React.useLayoutEffect(() => {
        const check = route.params.check
        
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                check === "Countries"
                  ? navigation.navigate("Countries")
                  : navigation.navigate("Saved");
              }}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="keyboard-backspace"
                style={{ fontSize: 40, color: "white", marginLeft:10 }}
              />
            </TouchableOpacity>
          ),
        });
      }, [navigation,route]);
    useEffect(()=>{
      async function getKeys(){
        let keys = await AsyncStorage.getAllKeys();
        if (keys.includes(route.params.country)) {
          setLike(true);
        } else {
          setLike(false);
        } 
      }
      getKeys();
    })
    useEffect(() => {
        
      fetch(
        `https://covid-19-data.p.rapidapi.com/country?name=${
          route.params.country=="United States"?"USA":route.params.country
        }`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "Your API Key",
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.length > 0) {
            setData(responseJson);
            setLoading(false);
            setUpdate(responseJson[0].lastUpdate);
          } else {
            setData(responseJson);
            setLoading(false);
            setUpdate(null);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    useEffect(() => {
      fetch(
        `https://world-population.p.rapidapi.com/population?country_name=${route.params.country}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "Your API Key",
            "x-rapidapi-host": "world-population.p.rapidapi.com",
          },
        }
      )
      .then((response) => response.json())
      .then((responseJson) => {
        setPopulation(responseJson.body.population);
        setLoadingPop(false);
      })
      .catch((error) => {
        console.error(error);
      });
    }, []);
    
    const liked=async ()=>{
      try{
        await AsyncStorage.setItem(route.params.country, route.params.country);
      } catch (e) {
        console.error(e);
      }
      setLike(true)
    }
    const disLike = async () => {
      try {
        await AsyncStorage.removeItem(route.params.country);
      } catch (e) {
        console.error(e)
      }
      setLike(false)

    };
      
  return (
    <View style={{ flex: 1, paddingTop: 2 }}>
      {!loading && !loadingPop ? (
        <View style={{ alignItems: "center" }}>
          <View style={{ marginVertical: 2, padding: 3, borderBottomWidth: 1 }}>
            <View style={{ alignItems: "center", flexDirection: "row",justifyContent:"center" }}>
              <Image
                source={{
                  uri: `https://www.countryflags.io/${code(
                    route.params.country
                  )}/flat/64.png`,
                }}
                style={{ width: 100, height: 100, marginRight: 10 }}
              />
              {like ? (
                <Icon
                  type="FontAwesome"
                  name="star"
                  onPress={disLike}
                  style={{ fontSize: 40, color: "black", marginLeft: 10 }}
                />
              ) : (
                <Icon
                  type="FontAwesome"
                  name="star-o"
                  onPress={liked}
                  style={{ fontSize: 40, color: "black", marginLeft: 10 }}
                />
              )}
            </View>
            <Text
              style={{ fontSize: 29, fontWeight: "bold", textAlign: "center" }}
            >
              {route.params.country == "Taiwan*"
                ? "Taiwan"
                : route.params.country}
            </Text>
          </View>
          <View style={{ width: "90%", alignItems: "center" }}>
            {update ? (
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={[styles.card, { backgroundColor: "#4169e1" }]}>
                  <View>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Confirmed Cases
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{ fontSize: 20, paddingTop: 9, color: "white" }}
                      >
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
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      Critical Cases
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{ fontSize: 20, paddingTop: 9, color: "white" }}
                      >
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
                        {`${parseFloat(
                          (data[0].critical / population) * 100
                        ).toFixed(4)}%`}
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
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      Recovered
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{ fontSize: 20, paddingTop: 9, color: "white" }}
                      >
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
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      Deaths
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{ fontSize: 20, paddingTop: 9, color: "white" }}
                      >
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
                        {`${parseFloat(
                          (data[0].deaths / population) * 100
                        ).toFixed(3)}%`}
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
              <View>
                <Image
                  source={require("../assets/not.png")}
                  style={{ width: 380, height: 300, marginTop: 10 }}
                />
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ height: 80, marginVertical: 20 }}
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
    justifyContent: "space-between",
    height: 98,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0,
  },
});
