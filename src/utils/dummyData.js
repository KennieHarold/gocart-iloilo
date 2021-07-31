import React from 'react';
import {Icon} from 'native-base';
import {Colors} from '../styles';

export const DATA = [
  {
    id: 'shop-canned-foods',
    category: 'Fast Foods',
    icon: (
      <Icon
        type="MaterialCommunityIcons"
        name="food-fork-drink"
        style={{color: Colors.primary, fontSize: 30}}
      />
    ),
  },
  {
    id: 'shop-noodles',
    category: 'Meat',
    icon: (
      <Icon
        type="MaterialCommunityIcons"
        name="food-drumstick"
        style={{color: Colors.primary, fontSize: 30}}
      />
    ),
  },
  {
    id: 'shop-fruits',
    category: 'Fruits',
    icon: (
      <Icon
        type="MaterialCommunityIcons"
        name="food-apple"
        style={{color: Colors.primary, fontSize: 30}}
      />
    ),
  },
  {
    id: 'shop-liquor',
    category: 'Toiletrees',
    icon: (
      <Icon
        type="FontAwesome5"
        name="toilet-paper"
        style={{color: Colors.primary, fontSize: 23}}
      />
    ),
  },
  {
    id: 'shop-drinks',
    category: 'Drinks',
    icon: (
      <Icon
        type="Entypo"
        name="drink"
        style={{color: Colors.primary, fontSize: 25}}
      />
    ),
  },
];

export const DATA2 = [
  {
    id: 'product-card-1',
    image: 'http://assets.stickpng.com/images/58824b33e81acb96424ffab9.png',
    price: '30.00',
    name: 'Yumburger',
    bought: 23,
  },
  {
    id: 'product-card-2',
    image:
      'https://www.nicepng.com/png/detail/437-4378112_papa-sweet-sarap-banana-catsup-320g-papa-banana.png',
    price: '35.00',
    name: 'Papa Kechup',
    bought: 61,
  },
  {
    id: 'product-card-3',
    image: 'http://assets.stickpng.com/images/58824b33e81acb96424ffab9.png',
    price: '40.00',
    name: 'Yumburger3',
    bought: 55,
  },
];

export const stores = [
  {
    id: 'sm-supermarket',
    name: 'SM Supermarket',
    description: 'The supermarket of choice for fresh and healthy food',
    coverPhotoUri:
      'https://www.momandme.nestle.com.ph/sites/default/files/sm_supermarket_-_logo.jpg',
    address: 'Jaro, Iloilo City',
  },
  {
    id: 'ace-hardware',
    name: 'Ace hardware',
    description: 'Ace is the place with the helpful hardware folks.',
    coverPhotoUri:
      'https://www.sfgate.com/coupons/vfiles/16/merchant_image-merchant_open_graph.png',
    address: 'San Roque, Libertad, Antique',
  },
  {
    id: 'robinsons-supermarket',
    name: 'Robinsons Supermarket',
    description:
      'Robinsons Supermarket, the supermarket of choice for fresh and healthy food',
    coverPhotoUri:
      'https://cdn.shopify.com/s/files/1/0260/6877/9066/files/RSC_logo_2Liner_wBG_1.jpg?height=628&pad_color=fff&v=1619760800&width=1200',
    address: 'Iloilo City',
  },
  {
    id: 'puregold',
    name: 'Puregold',
    description: 'Sa Puregold, Always Panalo!',
    coverPhotoUri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXR-_EcieuQxSjum6vNhDhCzWRamEaNmnYcrwbhCjoqSdC43OwmfZqC61haPpz9Tv32GU&usqp=CAU',
    address: 'San Roque, Libertad, Antique',
  },
];
