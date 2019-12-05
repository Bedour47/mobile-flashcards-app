import React from 'react'
import { View } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/api'
import { createStore } from 'redux'
import middleware from './middleware'
import reducer from './reducers'
import { Provider } from 'react-redux'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import Decks from './components/Decks'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { white, lightBlue } from './utils/colors'

const store = createStore(reducer, middleware)

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='book-open-page-variant' size={20} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={20} color={tintColor} />
    }
  }
}, {
  initialRouteName: 'Decks',
  backBehavior: 'Decks',
},{
  tabBarOptions: {
    activeTintColor: lightBlue,
    style: {
      height: 56,
      backgroundColor: white,
    }
  }
})

const NavStack = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Flash Cards App',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      },
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      },
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      },
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      },
    }
  },
})

const MainNavigator = createAppContainer(NavStack);

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}