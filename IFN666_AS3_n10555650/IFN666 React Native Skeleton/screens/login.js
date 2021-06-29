import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,ImageBackground,
  Button,
  TouchableOpacity,
} from "react-native";
import photo from './stock.jpg'
import { Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
async function loginUser(credentials) {
  return fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
export default function Login({ navigation }) {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userValue, setuserValue] = useState("");

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  function register()
  {
    navigation.navigate('Signup')
  }

 
  const handleSubmit = async (e) => {
    console.log("came here");
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });

    if (token.message) {
      alert("Invalid Username and password combo");
    } else {
      if (token[0].username) {
        navigation.navigate("Stock");
      }
    }
  };

  return (
      <View style={styles.container}>
      <ImageBackground source={photo} style={styles.image}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email ID"
            placeholderTextColor="white"
            onChangeText={(username) => setEmail(username)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
        <Button
        onPress={handleSubmit}
        title="Sign In"
        />
        
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
        <Button
        onPress={register}
        title="Sign Up"
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
    marginTop:100,
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
    marginTop:40,
    color:"white"
  },
});