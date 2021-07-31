import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ModalAlertReducer from './ModalAlertReducer';
import ProfileReducer from './ProfileReducer';
import CurrentUserReducer from './CurrentUserReducer';
import StoreReducer from './StoreReducer';
import CartReducer from './CartReducer';
import AppReducer from './AppReducer';
import SharedReducer from './SharedReducer';
import OrderReducer from './OrderReducer';

export default combineReducers({
  auth: AuthReducer,
  modalAlert: ModalAlertReducer,
  profile: ProfileReducer,
  currentUser: CurrentUserReducer,
  store: StoreReducer,
  cart: CartReducer,
  app: AppReducer,
  shared: SharedReducer,
  order: OrderReducer,
});
