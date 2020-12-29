import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
export default About=({navigation})=>  {
    return (
      <View style={{ flex: 1, alignItems: "center",marginTop:"16%" }}>
        <Image style={styles.avatar} source={require("../assets/about.jpg")} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Haseeb Ali Sajid</Text>
            <Text style={styles.info}>MERN Stack Developer</Text>
            <Text style={styles.info}>
              Web Dev. Lead at DSC Comsats Islamabad.
            </Text>
            <View style={{ alignItems: "center", paddingTop: "10%" }}>
              <Text
                style={{ fontSize: 22, color: "#474444", fontWeight: "600" }}
              >
                Contact me
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "70%",
                  marginVertical: 10,
                }}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name="gmail"
                  style={{ fontSize: 25 }}
                />
                <Text
                  style={{
                    color: "#00BFFF",
                    alignSelf: "center",
                    marginHorizontal: 6,
                    fontSize: 18,
                    fontStyle: "italic",
                  }}
                >
                  alihaseeb714@gmail.com
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "47%",
                  marginVertical: 10,
                }}
              >
                <Icon type="AntDesign" name="github" style={{ fontSize: 25 }} />
                <Text
                  style={{
                    color: "#00BFFF",
                    alignSelf: "center",
                    marginHorizontal: 6,
                    fontSize: 18,
                    fontStyle: "italic",
                  }}
                >
                  haseebalisajid
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "47%",
                  marginVertical: 10,
                }}
              >
                <Icon
                  type="AntDesign"
                  name="twitter"
                  style={{ fontSize: 25 }}
                />
                <Text
                  style={{
                    color: "#00BFFF",
                    alignSelf: "center",
                    marginHorizontal: 6,
                    fontSize: 18,
                    fontStyle: "italic",
                  }}
                >
                  iam_haseebali
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#277ad9",
    height: 130,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius:116,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center",

  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
//   body: {
//     marginTop: "30%",
//   },
  bodyContent: {
    alignItems: "center",
    padding: 10,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
});
