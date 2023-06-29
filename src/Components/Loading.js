import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Animations } from "../Constants/Animations";

const screenDimensions = Dimensions.get("window").height;

const Loading = ({ simple = true, text }) => {
  if (simple) {
    return (
      <View style={styles.Loading}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  } else {
    return (
      <View style={styles.Loading}>
        <LottieView
          style={styles.animation}
          source={Animations.loading}
          autoPlay
          loop
        />
        <Text style={styles.textLoading}>{text}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Loading: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    minHeight: screenDimensions - 30,
  },
  animation: {
    margin: 0,
    width: "100%",
  },
  textLoading: {
    margin: 0,
    fontSize: 20,
  },
});

export default Loading;
{
  /* 
      // <View style={[StyleSheet.absoluteFillObject, styles.Loading]}>
      <Text style={styles.textLoading}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum animi excepturi perspiciatis atque veniam quisquam quas numquam. Nisi vel cupiditate reiciendis obcaecati et voluptatum ut debitis error? Numquam, praesentium nostrum!</Text> 
    // </View>*/
}
