import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import photo from './stock.jpg'
async function registerUser(credentials) {
  return fetch("http://localhost:3001/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Register({ navigation }) {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const registration = async (e) => {
    console.log("Registration works successfully");
    e.preventDefault();
    const token = await registerUser({
      username,
      password,
      name,
    });
    navigation.navigate("Login");
  };
  function login()
  {
    navigation.navigate('Login')
  }

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground source={photo} style={styles.image}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="black"
            secureTextEntry={false}
            onChangeText={(name) => setName(name)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Email"
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setEmail(username)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
        <Button
        onPress={registration}
        title="Sign Up"
        />
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
        <Button
        onPress={login}
        title="Sign In"
        />
        </TouchableOpacity>
        </ImageBackground>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height:height,
    width:width,
    flexDirection:"column"
  },
  image: {
    width:width,
    height:height
  },
title:{
  width: 0.5*width,
  height: 0.1*height,
  color:"white",
  fontSize:26
},
  inputView: {
    backgroundColor: "orange",
    borderRadius: 30,
    width: 0.6*width,
    height: 0.1*height,
    marginStart: 20,
    marginTop:50,
    alignItems: "center",
    color:"cyan"
  },
  TextInput: {
    height: 26,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color:"cyan",
  },
  forgot_button: {
    height: 0.1*height,
    marginBottom: 30,
    color:"white",
    width: 0.6*width,
    fontSize:26,
    marginStart: 20,
  },
  loginBtn: {
    backgroundColor: "orange",
    width: 0.5*width,
    height: 0.1*height,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginStart: 20,
    marginTop:20,
    color:"white"
  },
});