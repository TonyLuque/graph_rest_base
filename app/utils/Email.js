const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ErrorHandler = require("./ErrorHandler");

async function sendEmailWithDynamicTemplateData({
  toEmail,
  fromEmail,
  subject,
  templateId,
  dynamicTemplateData,
}) {
  try {
    const msg = {
      to: toEmail,
      from: fromEmail,
      dynamic_template_data: { subject: subject, ...dynamicTemplateData },
      template_id: templateId,
    };

    const email = await sgMail.send(msg);
    return email;
  } catch (error) {
    ErrorHandler.logError({
      error: error,
      message: "Error sending email",
      functionName: "sendEmailWithDynamicTemplateData",
      fileName: "Email.js",
      moduleName: "utils",
    });
  }
}

module.exports = { sendEmailWithDynamicTemplateData };
