const hdifyPP = (photoUrl, provider) => {
  switch (provider) {
    case 'google.com':
      newPhotoUrl = photoUrl.replace('s96-c', 's720-c');
      return newPhotoUrl;

    default:
      return photUrl;
  }
};

export default hdifyPP;
