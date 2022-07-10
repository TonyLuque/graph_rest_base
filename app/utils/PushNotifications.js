// const { initializeApp } = require("firebase-admin/app");

const admin = require("firebase-admin");
const ErrorHandler = require("./ErrorHandler");

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.push = async function ({ title, body, userDeviceId }) {
  try {
    const message = {
      notification: {
        title: title,
        body: body,
        image: "",
      },
      token: userDeviceId,
    };
    let pushSend = await admin.messaging().send(message);
    console.log(pushSend);
    return pushSend;
  } catch (error) {
    ErrorHandler.logError({
      error: error,
      message: "Push notification not send",
      functionName: "push",
      fileName: "PushNotifications.js",
      moduleName: "utils",
    });
  }
};
