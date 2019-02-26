import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  itemSelectedHandler = key => {
    
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });
    console.log("-----------------------------------------start------------------------------------------");
    this.props.places.map((el) => {
      console.log(el.key);
      console.log(el.name);
    })
    
    console.log("----------------------------------------3-----------------------------------------------");
    console.log("--------------------------------------end----------------------------------------------");
    this.props.navigator.push({
      screen: "rnPlay.PlaceDetailScreen",
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace
      }
    });
  };

  render() {
    return (
      <View>
        <PlaceList
          places={this.props.places}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
