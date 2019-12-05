import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

export const DECKS_STORAGE_KEY = 'Flashcards:decks'
export const NOTIFICATION_KEY = 'Flashcards:notifications'



export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => JSON.parse(results))
}


export function saveDeck (title) {
  getDecks()
    .then((decks) => {
      return {
        ...decks,
        [title]: {
          title,
          questions: [],
        }
      }
    })
    .then((newDecks) => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
    })
}


export function addCardToDeck (card, title) {
  getDecks()
    .then((decks) => {
      return {
        ...decks,
        [title]: {
          title,
          questions: decks[title].questions.concat([card])
        }
      }
    })
    .then((newDecks) => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
    })
}


export function clearAllDecks () {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
}


export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}


function createNotification () {
  return {
    title: 'Learn by Flashcards!',
    body: "👋 don't forget to review your flashcards today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: false,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}