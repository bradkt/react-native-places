import { Navigation } from "react-native-navigation"
import AuthScreen from "./src/screens/Auth/Auth"
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import { Provider } from "react-redux"
import configureStore from './src/store/configureStore';
const store = configureStore();

//register screens
Navigation.registerComponent("rnPlay.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("rnPlay.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("rnPlay.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("rnPlay.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("rnPlay.SideDrawer", () => SideDrawer, store, Provider);


// start nav app
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "rnPlay.AuthScreen",
    title: "Login"
  }
});
