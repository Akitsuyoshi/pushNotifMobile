import { Permissions, Notifications } from 'expo';

const PUT_ENDPOINT = 'https://notification-server-by-node.herokuapp.com/api/user';
const PUT_NOTIF_ENDPOINT = 'https://notification-server-by-node.herokuapp.com/api/notification';

// It puts the device's data and device's token for push notification
const subscribe = async (deviceName, os) => {
  try {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') return;

    const token = await Notifications.getExpoPushTokenAsync();

    fetch(PUT_ENDPOINT, {
      method: 'PUT',
      body: JSON.stringify({ deviceName, os, token, isSubscribed: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  } catch (error) {
    console.log(error);
  }
};

const unSubscribe = (deviceName, os) =>
  fetch(PUT_ENDPOINT, {
    method: 'PUT',
    body: JSON.stringify({ deviceName, os, isSubscribed: false }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

const openByNotification = (deviceName, isOpened) => {
  fetch(PUT_NOTIF_ENDPOINT, {
    method: 'PUT',
    body: JSON.stringify({ deviceName, isOpened }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
};
export { subscribe, unSubscribe, openByNotification };
