const AUTH_SERVER = {
  DEV: '',
  QA: '',
  UAT: '',
  PROD: '',
};

const BSNS_SERVER = {
  DEV: '',
  QA: '',
  UAT: '',
  PROD: '',
};

/*CHANGE HERE */
const BSNSSERVICE = BSNS_SERVER.PROD;
const AUTHSERVICE = AUTH_SERVER.PROD;
/********** */

const CONTROLLERS = {
  AUTH: 'Auth/',
  COMMUNICATION: 'Communication/',
  PUSHNOTIFICATION: 'PushNotification/',
  USER: 'User/',
  LOOK_UP: 'LookUp/',
  NOTIFICATION_CONTROLLER: 'api/',
};

const AUTH_SERVICE = AUTHSERVICE + CONTROLLERS.AUTH;

export const AUTH_ENDPOINTS = {};
