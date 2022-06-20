const ErrorHandler = require("./ErrorHandler");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);

async function sendSMS({
  fromPhoneNumber = "",
  toPhoneNumber,
  countryCode,
  body,
}) {
  try {
    const message = await client.messages.create({
      from: fromPhoneNumber,
      body: body,
      messagingServiceSid: messagingServiceSid,
      to: `+${countryCode}${toPhoneNumber}`,
    });
    return message;
  } catch (error) {
    ErrorHandler.logError({
      error: error,
      message: "Error to send SMS",
      functionName: "sendSMS",
      fileName: "SMS.js",
      moduleName: "utils",
    });
  }
}

module.exports = { sendSMS };
