import React from "react";
import styled from "styled-components/native";
import {} from "react-native";

const Contianer = styled.View``;
const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;
const Login = ({ navigation: { navigate } }) => {
  return (
    <Contianer>
      <Text>
        Don't have an account?{" "}
        <Btn>
          <BtnText
            onPress={() => {
              navigate("Join");
            }}
          >
            Join
          </BtnText>
        </Btn>
      </Text>
    </Contianer>
  );
};

export default Login;
