import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import InNav from "./navigators/InNav";
import OutNav from "./navigators/OutNav";

export default function App() {
  // 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // EventListener를 넣어줄 것
    // Firebase에서는 상태가 변경될때만 Listener를 넣을 수 있기 때문

    // onAuthStateChanged 유저의 인증상태 변경을 감지함
    auth().onAuthStateChanged((user) => {
      console.log(user);
      // 아래 조건문이 로그인을 했었다는 것을 기억함
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <InNav /> : <OutNav />}
    </NavigationContainer>
  );
}
