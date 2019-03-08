import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

// https://us-central1-fb-rnplay.cloudfunctions.net/storeImage
// https://fb-rnplay.firebaseio.com/places.json
// https://fb-rnplay.firebaseio.com/places.json?auth=
// https://fb-rnplay.firebaseio.com/places/" + key + ".json

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        authToken = token;
        return fetch("https://us-central1-fb-rnplay.cloudfunctions.net/storeImage", {
          method: "POST",
          body: JSON.stringify({
              image: image.base64
            })
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, could not with cloud function!");
        dispatch(uiStopLoading());
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl,
          imagePath: parsedRes.imagePath
        };
        return fetch(
          "https://fb-rnplay.firebaseio.com/places.json?auth=" +
            authToken,
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, could not get FB db data!");
        dispatch(uiStopLoading());
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          "https://fb-rnplay.firebaseio.com/places.json?auth=" +
            token
        );
      })
      .catch(() => {
        alert("No valid token found!");
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      })
      .catch(err => {
        alert("Something went wrong, could not get place :/");
        console.log(err);
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          "https://fb-rnplay.firebaseio.com/places/" +
            key +
            ".json?auth=" +
            token,
          {
            method: "DELETE"
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        alert("Something went wrong, could not delete place :/");
        console.log(err);
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};