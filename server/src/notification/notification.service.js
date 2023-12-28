const FCM = require('fcm-node');
const serverKey = process.env.FCM_SERVER_KEY; //put your server key here
const fcm = new FCM(serverKey);

const createMessage = ({ to, title, body, data = {} }) => {
  const message = {
    to,
    notification: {
      title,
      body,
    },
    data,
  };

  return message;
};

const sendMessage = (message) => {
  fcm.send(message, function (err, response) {
    if (err) {
      console.log('Something has gone wrong!');
    } else {
      console.log('Successfully sent with response: ', response);
    }
  });
};

module.exports = {
  createMessage,
  sendMessage,
};
