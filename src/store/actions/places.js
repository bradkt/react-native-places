import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
// https://us-central1-fb-rnplay.cloudfunctions.net/storeImage

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-fb-rnplay.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch("https://fb-rnplay.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })  
        .catch(err => {
            console.log(err);
            alert("something went wrong while sharing place")
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        });
    };
};

export const getPlaces = () => {
    return dispatch => {
        fetch("https://fb-rnplay.firebaseio.com/places.json")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
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
        });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(removePlace(key));
        fetch("https://fb-rnplay.firebaseio.com/places/" + key + ".json", {
                method: "DELETE"
            })
            .catch(err => {
                alert("Unable to delete place");
                console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("Done");
            })
    }
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};