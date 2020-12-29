import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "native-base";
import {code} from 'country-emoji';

export default function Saved({ navigation}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [check, setCheck] = useState("Saved");
  useEffect(()=>{
        getKeys();
  },[data])
  
  const getKeys=async()=> {
    let keys = await AsyncStorage.getAllKeys();
    setData(keys);
    setLoading(false);
  }   
  const updateSearch = (search) => {
    setSearch(search);
  };

  const clearSearch = () => {
    setSearch("");
  };
  const disLike = async (name) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {data.length > 0 ? (
            <View style={{ justifyContent: "center" }}>
              {data.map((item, index) => (
                <View style={styles.card} key={index}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      width: "80%",
                      justifyContent: "space-between",
                    }}
                    onPress={() =>
                      navigation.navigate("Specific", {
                        check: check,
                        country: item,
                      })
                    }
                  >
                    <Image
                      source={{
                        uri: `https://www.countryflags.io/${code(
                          item
                        )}/shiny/64.png`,
                      }}
                      style={{ width: 50, height: 50, marginRight: 10 }}
                    />
                    <View
                      style={{
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        marginRight: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          textAlign:"center",
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      type="FontAwesome"
                      name="star"
                      onPress={() => disLike(item)}
                      style={{
                        fontSize: 36,
                        color: "black",
                        alignItems: "center",
                        marginTop: 6,
                        paddingLeft:40,
                        width:80
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                No Saved Country
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    width: "84%",
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
  },
});