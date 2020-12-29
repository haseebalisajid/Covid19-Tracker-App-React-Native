import React,{useState,useEffect} from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList
} from "react-native";
import { Icon } from "native-base";
import { code } from "country-emoji";

export default function Countries({navigation}) {
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(true);
  const [data,setData]=useState([]);
  const [tempData,setTempData]=useState([]);
  const [temp, setTemp] = useState([]);
  const [check, setCheck] = useState("Countries");
  useEffect(() => {
    fetch("https://world-population.p.rapidapi.com/allcountriesname", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "Your API Key",
        "x-rapidapi-host": "world-population.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.body.countries);
        setTempData(responseJson.body.countries);
        setTemp(responseJson.body.countries);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(()=>{
    if(search.length==0){
      setData(temp)
    }
  },[search])
  const clear=()=>{
    setSearch("")
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if(text){
      setSearch(text);
      const newData = tempData.filter((item) => {
        const itemData = `${item.toUpperCase()}`;
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    }
    else{
      setSearch("");
    }
  };
  const renderComponent = (item) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-between",
        }}
        
        onPress={() =>
          navigation.navigate("Specific", {
            check: check,
            country: item
          })
        }
      >
        {(code(item)) ? (
          <Image
            source={{
              uri: `https://www.countryflags.io/${code(item)}/shiny/64.png`,
            }}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
        ) : (
          <Icon
            type="MaterialCommunityIcons"
            name="flag-remove"
            style={{ fontSize: 40, marginRight: 10, marginLeft: 8, width: 50 }}
          />
        )}
        <View
          style={{
            justifyContent: "center",
            paddingHorizontal: 20,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 10,
          marginVertical: 4,
        }}
      >
        <Icon
          type="MaterialIcons"
          name="search"
          style={{
            fontSize: 30,
            // color: "#ffffff",
          }}
        />
        <TextInput
          placeholder="Type here"
          value={search}
          onChangeText={(text) => searchFilterFunction(text)}
          style={{ width: "80%", padding: 8 }}
        />
        <Icon
          type="Entypo"
          name="cross"
          onPress={() => setSearch("")}
          style={{
            fontSize: 30,
            // color: "#ffffff",
          }}
        />
      </View>
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={( {item} ) => renderComponent(item)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    padding:6,
    marginLeft:20
  },
});
