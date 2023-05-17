import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Alert, TextInput, View } from "react-native";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import auth from "@react-native-firebase/auth";

const Contianer = styled.View`
  flex: 1;
  align-items: center;
`;
const InputTextView = styled.View`
  background-color: lightgray;
  width: 300px;
  height: 50px;
  border-radius: 30px;
  justify-content: center;
  padding-left: 20px;
  margin-bottom: 10px;
`;
const SubmitBtn = styled.TouchableOpacity`
  background-color: gray;
  width: 300px;
  height: 50px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;
const Join = () => {
  const passwordInput = useRef("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };
  const onSubmitPasswordEditing = async () => {
    if (email === "" || password === "") {
      return Alert.alert("Fill in the form.");
    }
    if (loading) {
      // 유저가 두번 누르는 것을 방지
      return;
    }
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);
    } catch (e) {
      console.log(e.message);
      switch (e.code) {
        case "auth/weak-password":
          {
            Alert.alert("Write a stronger password!");
          }
          setLoading(false);
      }
    }
    // 이메일과 패스워드가 인자로 들어가고 에러가 반환됨
    // 이메일 주소가 이미 존재, 이메일이 유효하지 않거나, 허용 안되거나, 패스워드가 너무 약하다거나
    // 에러코드로 알림을 보내기 유용함
    // createUserWithEmailAndPassword함수는 userCredential을 반환함
  };
  return (
    <Contianer>
      <View
        style={{
          height: 50,
        }}
      ></View>
      <InputTextView>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          returnKeyType="next"
          onChangeText={(text) => {
            setEmail(text);
          }}
          onSubmitEditing={onSubmitEmailEditing}
        />
      </InputTextView>
      <InputTextView>
        <TextInput
          ref={passwordInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          onSubmitEditing={onSubmitPasswordEditing}
        />
      </InputTextView>
      <SubmitBtn onPress={onSubmitPasswordEditing}>
        {loading ? "" : <Text>Create Account</Text>}
      </SubmitBtn>
    </Contianer>
  );
};

export default Join;
