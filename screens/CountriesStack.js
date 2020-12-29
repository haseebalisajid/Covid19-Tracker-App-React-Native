import * as React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Countries from "../Components/Countries";
import Specific from '../Components/Specific'
const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              "https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png",
          }}
          style={{ width: 35, height: 25, marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function CountriesStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Countries"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#1565C0", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="Countries"
        component={Countries}
        options={{
          title: "Countries", //Set Header Title
        }}
      />
      <Stack.Screen
        name="Specific"
        component={Specific}
        options={{
          title: "Specific Country Stats" , //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}
