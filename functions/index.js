const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");

const gcconfig = {
  projectId: "fb-rnplay",
  keyFilename: "fb-rnplay-key.json"
};

const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
  gcconfig
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// https://us-central1-fb-rnplay.cloudfunctions.net/storeImage
exports.storeImage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
      console.log(err);
      return response.status(500).json({ error: err });
    });
    const bucket = gcs.bucket("fb-rnplay.appspot.com");
    const uuid = UUID();

    return bucket.upload(
      "/tmp/uploaded-image.jpg",
      {
        uploadType: "media",
        destination: "/places/" + uuid + ".jpg",
        metadata: {
          metadata: {
            contentType: "image/jpeg",
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, file) => {
        if (!err) {
          return response.status(201).json({
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/" +
              bucket.name +
              "/o/" +
              encodeURIComponent(file.name) +
              "?alt=media&token=" +
              uuid,
              imagePath: "/places/" + uuid + ".jpg"
          });
        } else {
          console.log(err);
          return response.status(500).json({ error: err });
        }
      }
    );
  });
});

exports.deleteImage = functions.database.ref("/places/{placeId}")
.onDelete((snap, context) => {
  let imagePath = snap.val().imagePath;
  //console.log("snapval: ", JSON.stringify(snapval));  imagePath
  const bucket = gcs.bucket("fb-rnplay.appspot.com");
  return bucket.file(imagePath).delete();
});
