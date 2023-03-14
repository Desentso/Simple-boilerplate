const axios = require('axios')

const isProduction = process.env.NODE_ENV === "production"
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

const sendToSlack = async ({text}) => {
  if (!isProduction) return null;

  try {
    await axios.post(
      SLACK_WEBHOOK_URL, 
      {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": text
            }
          }
        ]
      }
    )
  } catch(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
}

module.exports = sendToSlack