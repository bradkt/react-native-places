import { Navigation } from "react-native-navigation"
import AuthScreen from "./src/screens/Auth/Auth"
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";

//register screens
Navigation.registerComponent("rnPlay.AuthScreen", () => AuthScreen);
Navigation.registerComponent("rnPlay.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("rnPlay.FindPlaceScreen", () => FindPlaceScreen);

// start nav app
Navigation.startSingleScreenApp({
  screen: {
    screen: "rnPlay.AuthScreen",
    title: "Login"
  }
})
