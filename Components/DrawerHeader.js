import React from 'react';
import { View, } from 'react-native';
import { DrawerContentScrollView,DrawerItemList,DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import {
  Icon,
  Container,
  Header,
  Footer,
  Content,
  ListItem,
  Left,
  Right,
  Thumbnail,
  Button,
  Body,
  H3,
  Text,
} from "native-base";
import Animated from 'react-native-reanimated';
import Home from './Home';


export default DrawerHeader =({progress,...props})=>{
    const translateX = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });
    return (
      <Container>
        <Content>
          <Header style={{ backgroundColor: "#ffffff", borderBottomWidth: 0 }}>
            <Right>
              <Button
                transparent
                onPress={() =>
                  props.navigation.dispatch(DrawerActions.closeDrawer())
                }
              >
                <Icon
                  type="Entypo"
                  name="circle-with-cross"
                  style={{ fontSize: 40, color: "#4254bd", marginLeft: 10 }}
                />
              </Button>
            </Right>
          </Header>
          <ListItem thumbnail>
            <Left>
              <Thumbnail
                style={{ width: 50, height: 55, margin: 5 }}
                source={{
                  uri:
                    "https://github.com/m-hamzashakeel/Covid19-Tracker-App/blob/master/images/covidBlue.png?raw=true",
                }}
              />
            </Left>
            <Body>
              <H3>Covid-19 Tracker</H3>
              <Text note>Stay Home,Stay Safe</Text>
            </Body>
          </ListItem>
          <DrawerContentScrollView {...props}>
            <Animated.View style={{ transform: [{ translateX }] }}>
              <DrawerItemList {...props} />

            </Animated.View>
          </DrawerContentScrollView>
        </Content>
        <Footer style={{ backgroundColor: "#ffffff", borderTopWidth: 0 }}>
          <Body style={{ justifyContent: "center" }}>
            <Text note>© Haseeb Ali Sajid</Text>
          </Body>
        </Footer>
      </Container>
    );
}