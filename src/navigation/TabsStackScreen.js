import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import BrowseStackScreen from './BrowseStackScreen';
import ProfileStackScreen from './ProfileStackScreen';
import OrdersStackScreen from './OrdersStackScreen';
import FavoritesStackScreen from './FavoritesStackScreen';
import {Icon, Text} from 'native-base';
import {Colors, Fonts} from '../styles';
import {
  CurrentUserAction,
  StoreAction,
  CartAction,
  AppAction,
  FavoritesAction,
} from '../actions';
import {LoadingScreen} from '../components/UIComponents';
import {RFValue} from 'react-native-responsive-fontsize';
import {errorHandler} from '../helpers';
const {getCurrentUserData} = CurrentUserAction;
const {getAvailableStoresData} = StoreAction;
const {getUserCartProducts} = CartAction;
const {loadBanners} = AppAction;
const {getFavorites} = FavoritesAction;

const Tabs = createBottomTabNavigator();

const tabItems = [
  {
    key: 'tab-item-home',
    name: 'Home',
    label: 'All Stores',
    screen: HomeStackScreen,
    iconActive: 'home',
    iconInactive: 'home-outline',
  },
  {
    key: 'tab-item-browse',
    name: 'Browse',
    label: 'Browse',
    screen: BrowseStackScreen,
    iconActive: 'search',
    iconInactive: 'search-outline',
  },
  {
    key: 'tab-item-orders',
    name: 'Orders',
    label: 'My Orders',
    screen: OrdersStackScreen,
    iconActive: 'file-tray',
    iconInactive: 'file-tray-outline',
  },
  {
    key: 'tab-item-favorites',
    name: 'Favorites',
    label: 'Favorites',
    screen: FavoritesStackScreen,
    iconActive: 'star',
    iconInactive: 'star-outline',
  },
  {
    key: 'tab-item-profile',
    name: 'Profile',
    label: 'My Profile',
    screen: ProfileStackScreen,
    iconActive: 'person',
    iconInactive: 'person-outline',
  },
];

const TabsStackScreen = () => {
  const [isStartupLoading, setIsStartupLoading] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function runStartups() {
      setIsStartupLoading(true);
      await Promise.all([
        dispatch(getCurrentUserData()),
        dispatch(getAvailableStoresData()),
        dispatch(getUserCartProducts()),
        dispatch(getFavorites()),
        dispatch(loadBanners()),
      ]).catch(error => {
        console.log(error);
        errorHandler(dispatch, 'gen/default');
      });
      setIsStartupLoading(false);
    }
    runStartups();
    return () => setIsStartupLoading(false);
  }, []);

  const isUserDataFetched = useSelector(
    state => state.currentUser.isUserDataFetched,
  );

  return isUserDataFetched && !isStartupLoading ? (
    <Tabs.Navigator
      headerMode="none"
      initialRouteName="Home"
      mode="card"
      tabBarOptions={{
        showLabel: false,
        style: styles.tabBarOptions,
      }}>
      {tabItems.map(tabItem => (
        <Tabs.Screen
          key={tabItem.key}
          name={tabItem.name}
          component={tabItem.screen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity
                activeOpacity={0.5}
                {...props}
                style={styles.tabBarButton}>
                <>
                  {props.accessibilityState.selected ? (
                    <Icon
                      type="Ionicons"
                      name={tabItem.iconActive}
                      style={styles.tabBarIconSelected}
                    />
                  ) : (
                    <Icon
                      type="Ionicons"
                      name={tabItem.iconInactive}
                      style={styles.tabBarIcon}
                    />
                  )}
                </>
                <Text
                  style={[
                    styles.tabBarLabel,
                    props.accessibilityState.selected
                      ? styles.tabBarLabelSelected
                      : null,
                  ]}>
                  {tabItem.label}
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      ))}
    </Tabs.Navigator>
  ) : (
    <LoadingScreen />
  );
};

const styles = StyleSheet.create({
  tabBarOptions: {
    position: 'absolute',
    backgroundColor: 'white',
    height: RFValue(50),
  },
  tabBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabBarIcon: {
    color: Colors.readableText,
    fontSize: Fonts.size.small,
  },
  tabBarIconSelected: {
    color: Colors.primary,
    fontSize: Fonts.size.small,
  },
  tabBarLabel: {
    fontSize: Fonts.size.min - RFValue(2),
    color: Colors.readableText,
  },
  tabBarLabelSelected: {
    fontSize: Fonts.size.min - RFValue(2),
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default TabsStackScreen;
