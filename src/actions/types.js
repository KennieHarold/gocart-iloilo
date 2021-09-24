//  Auth
export const AUTH_SUCCESS = 'auth_success';
export const AUTH_LOADING_CHANGE = 'auth_loading_change';
export const EMAIL_CHANGE = 'email_change';
export const PASSWORD_CHANGE = 'password_change';
export const AUTH_RESET_STATE = 'auth_reset_state';
export const CONFIRM_PASSWORD_CHANGE = 'confirm_password_change';
export const HAS_USER_DOCUMENT_CHANGE = 'has_user_document_change';
export const SETTINGS_PASS_CHANGE = 'settings_pass_change';
export const SETTINGS_CONFIRM_PASS_CHANGE = 'settings_confirm_pass_change';
export const SETTINGS_NEW_PASS_CHANGE = 'settings_new_pass_change';
export const RESET_EMAIL_CHANGE = 'reset_email';

//  ModalAlert
export const SHOW_LOADING_MODAL = 'show_modal_loading';
export const SHOW_ALERT = 'show_alert';
export const SHOW_SIMPLE_LOADING_MODAL = 'show_simple_loading_modal';

//  Profile
export const TEMP_USERNAME_CHANGE = 'temp_username_change';
export const TEMP_FIRSTNAME_CHANGE = 'temp_firstName_change';
export const TEMP_LASTNAME_CHANGE = 'temp_lastName_change';
export const PROFILE_RESET_STATE = 'profile_reset_state';

//  Current User
export const CURRENT_USER_RESET_STATE = 'current_user_reset_state';
export const SET_CURRENT_USER = 'set_current_user';

//  Store
export const STORE_RESET_STATE = 'store_reset_state';
export const ADD_AVAILABLE_STORE = 'add_available_store';
export const SELECT_STORE = 'select_store';
export const SELECT_TEMP_STORE = 'select_temp_store';
export const CHANGE_AVAILABLE_STORES_LOADING =
  'change_available_stores_loading';
export const ADD_SELECTED_STORE_CATEGORIES = 'add_selected_store_categories';
export const CHANGE_SELECTED_STORE_CATEGORIES_LOADING =
  'change_selected_store_categories_loading';
export const CLEAR_SELECTED_STORE_CATEGORIES =
  'clear_selected_store_categories';
export const ADD_SELECTED_STORE_CATEGORIZED_PRODUCTS =
  'add_selected_store_categorized_products';
export const CHANGE_CATEGORIZED_PRODUCTS_LOADING =
  'change_categorized_products_loading';
export const SELECT_CATEGORY = 'selected_category';
export const ADD_SINGLE_CATEGORY_PRODUCT = 'add_selected_category_product';
export const CLEAR_SINGLE_CATEGORY_PRODUCTS =
  'clear_selected_category_products';
export const CHANGE_SINGLE_CATEGORY_PRODUCTS_LOADING =
  'change_single_category_products_loading';
export const CHANGE_MORE_PRODUCTS_LOADING = 'change_more_products_loading';
export const CLEAR_SELECTED_STORE_CATEGORIZED_PRODUCTS =
  'clear_selected_store_categorized_products';

//  Cart
export const CART_RESET_STATE = 'cart_reset_state';
export const SELECT_PRESSED_PRODUCT = 'select_pressed_product';
export const INCERMENT_QTY_PRESSED_PRODUCT = 'increment_qty_pressed_product';
export const CLEAR_PRESSED_PRODUCT = 'clear_pressed_product';
export const ADD_PRODUCT_TO_LOCAL_CART = 'add_product_to_local_cart';
export const CHANGE_PRODUCT_TO_LOCAL_CART = 'change_product_to_local_cart';
export const REMOVE_PRODUCT_TO_LOCAL_CART = 'remove_product_to_local_cart';
export const CHANGE_IS_CART_LOADING = 'change_is_cart_loading';
export const SELECT_STORE_ID_IN_CART = 'select_store_id_in_cart';
export const SELECT_STORE_PRODUCTS = 'select_store_products';
export const CLEAR_STORE_PRODUCTS = 'clear_store_products';
export const CHANGE_CHECKOUT_DETAILS = 'change_checkout_details';
export const CLEAR_CHECKOUT_DETAILS = 'clear_checkout_details';

//  App
export const ADD_BANNER = 'add_banner';
export const APP_RESET_STATE = 'app_reset_state';

// Shared
export const DETAILED_ADDRESS_CHANGE = 'detailed_address_change';
export const NOTE_TO_RIDER_CHANGE = 'note_to_rider_change';
export const ADDRESS_CHANGE = 'address_change';
export const CHANGE_FORMATTED_ADDRESS = 'change_formatted_address';
export const CHANGE_PHONE_NUMBER = 'change_phone_number';
export const CHANGE_PHONE_NUMBER_VERIFIED = 'change_phone_number_verified';
export const CHANGE_PHONE_VERIFY_NEXT_ACTION =
  'change_phone_verify_next_action';
export const CHANGE_MAP_NEXT_ACTION = 'change_map_next_action';
export const ADDRESS_RESET_STATE = 'address_reset_state';
export const PHONE_RESET_STATE = 'phone_reset_state';
export const SHARED_RESET_STATE = 'shared_reset_state';
export const CHANGE_ALLOW_RESEND = 'change_allow_resend';
export const CHANGE_RESEND_SECONDS = 'change_resend_seconds';

//  Orders
export const ADD_PROCESSING_ORDER = 'add_processing_order';
export const ADD_CANCELLED_ORDER = 'add_cancelled_order';
export const ADD_DELIVERED_ORDER = 'add_delivered_order';
export const REMOVE_PROCESSING_ORDER = 'remove_processing_order';
export const REMOVE_CANCELLED_ORDER = 'remove_cancelled_order';
export const REMOVE_DELIVERED_ORDER = 'remove_delivered_order';
export const CHANGE_PROCESSING_ORDERS_LOADING =
  'change_processing_orders_loading';
export const CHANGE_CANCELLED_ORDERS_LOADING =
  'change_cancelled_orders_loading';
export const CHANGE_DELIVERED_ORDERS_LOADING =
  'change_delivered_orders_loading';
export const CHANGE_MORE_PROCESSING_ORDERS_LOADING =
  'change_more_processing_orders_loading';
export const CHANGE_MORE_CANCELLED_ORDERS_LOADING =
  'change_more_cancelled_orders_loading';
export const CHANGE_MORE_DELIVERED_ORDERS_LOADING =
  'change_more_delivered_orders_loading';
export const CLEAR_PROCESSING_ORDERS = 'clear_processing_orders';
export const CLEAR_CANCELLED_ORDERS = 'clear_cancelled_orders';
export const CLEAR_DELIVERED_ORDERS = 'clear_delivered_orders';
export const SELECT_ORDER = 'select_order';
export const SELECT_ORDER_ITEMS = 'select_order_items';
export const CLEAR_ORDER_ITEMS = 'clear_order_items';
export const CLEAR_ORDER = 'clear_order';
export const ORDER_RESET_STATE = 'order_reset_state';

//  Search
export const ADD_SEARCH_RESULT_PRODUCT = 'add_search_result_product';
export const CHANGE_SEARCH_QUERY = 'change_search_query';
export const CHANGE_SEARCH_RESULT_PRODUCTS_LOADING =
  'change_search_result_products_loading';
export const CLEAR_SEARCH_RESULT_PRODUCTS = 'clear_search_result_products';
export const SEARCH_RESET_STATE = 'search_reset_state';
export const CHANGE_SEARCH_RESULT_STORE_PRODUCTS_LOADING =
  'change_search_result_store_products_loading';
export const ADD_SEARCH_RESULT_STORE_PRODUCT =
  'add_search_result_store_product';
export const CLEAR_SEARCH_RESULT_STORE_PRODUCTS =
  'clear_search_result_store_products';
export const CHANGE_SEARCH_STORE_QUERY = 'change_search_store_query';

//  Favorites
export const ADD_FAVORITE = 'add_favorites';
export const REMOVE_FAVORITE = 'remove_favorite';
export const CLEAR_FAVORITES = 'clear_favorites';
export const FAVORITES_RESET_STATE = 'favorites_reset_state';
