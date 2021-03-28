import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Explore: {
            screens: {
              ExploreScreen: 'explore',
            },
          },
          Subscriptions: {
            screens: {
              SubscriptionsScreen: 'subscriptions'
            }
          },
          Library: {
            screens: {
              LibraryScreen: 'library'
            }
          }
        },
      },
      NotFound: '*',
    },
  },
};
