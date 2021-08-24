const hdifyPP = (photoUrl, provider) => {
  let newPhotoUrl = undefined;

  switch (provider) {
    case 'google.com':
      newPhotoUrl = photoUrl.replace('s96-c', 's720-c');
      return newPhotoUrl;

    case 'facebook.com':
      newPhotoUrl = photoUrl + '?width=864';
      return newPhotoUrl;

    default:
      return photoUrl;
  }
};

export default hdifyPP;
