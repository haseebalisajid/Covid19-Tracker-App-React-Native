import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "native-base";
import HomeStack from './screens/HomeStack'
import CountriesStack from './screens/CountriesStack'
import SavedStack from './screens/SavedStack'
import DrawerHeader from './Components/DrawerHeader';
import AboutStack from './screens/AboutStack'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerHeader {...props} />}>
        <Drawer.Screen
          name="World Stats"
          component={HomeStack}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                type="Fontisto"
                name="world-o"
                style={{
                  fontSize: size,
                  color: color,
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Countries"
          component={CountriesStack}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                type="Ionicons"
                name="flag-outline"
                style={{
                  fontSize: size,
                  color: color,
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Saved"
          component={SavedStack}
          options={{
            title: "Saved Countries",
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                type="FontAwesome"
                name="bookmark-o"
                style={{
                  fontSize: size,
                  color: color,
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About Me"
          component={AboutStack}
          options={{
            title: "About Me",
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                type="FontAwesome"
                name="user-o"
                style={{
                  fontSize: size,
                  color: color,
                }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  ); 
}