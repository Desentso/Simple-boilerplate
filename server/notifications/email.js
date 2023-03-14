const Bugsnag = require('@bugsnag/js')
const SendgridMail = require("@sendgrid/mail")

SendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async ({
  fromEmail = "noreply@example.com",
  fromName = "Example",
  templateId,
  emailsToSend,
  personalizations,
}) => {
  const emailPersonalizations = personalizations || emailsToSend.map(email => ({to: email}))

  try {
    await SendgridMail.send({
      from: {
        email: fromEmail,
        name: fromName
      },
      templateId,
      personalizations: emailPersonalizations
    })
  } catch(e) {
    console.log(e.response.body)
    Bugsnag.notify(e)
  }
}

module.exports = {
  sendEmail
}