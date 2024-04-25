/* eslint-disable max-len */
const ServiceRegistryClient = require('../utils/serviceRegistry');
const { CustomError } = require('../utils/error');
const axios = require('axios');

async function sendEmail(userId, subject, body) {
  try {
    const NotificationServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Notification');
    const url = new URL('/api/send-email-by-id', NotificationServiceUrl).toString()
    const response = await axios.post(url,
      {
        userId,
        subject,
        body,
      }
    );
    const url2 = new URL('/api/send-notification', NotificationServiceUrl).toString()
    await axios.post(url2,
      {
        userId,
        title: subject,
        info: body,
      }
    );
  } catch (e) {
    let error = null
    if (axios.isAxiosError(e) === true) {
      if (e.response) {
        error = new CustomError(e.response?.data?.message, e.response?.status, false)
      } else {
        error = new CustomError(`Axios Error: ${e.message}`, 500, true)
      }
    } else {
      error = new CustomError(e.message, 500, true)
    }
    throw error
  }
}

module.exports = { sendEmail };
