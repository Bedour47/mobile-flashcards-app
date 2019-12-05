import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/api'
import { white, blue, lightBlue, yellow } from '../utils/colors'


class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Deck'),
    }
  }

  handleStartQuiz = () => {
    const { title, navigation } = this.props
    clearLocalNotification()
      .then(setLocalNotification)

    navigation.navigate(
      'Quiz',
      {deckKey: title}
    )
  }

  render() {
    const { title, questions, navigation } = this.props
    return (
      <View style={[styles.container, { flex: 0.7 }]}>
         <View style={[styles.container, styles.deckContainer]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cardNum}>{questions.length} cards</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(
          'AddCard',
          {deckKey: title}
        )}>
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableOpacity>
        {questions.length > 0
          ? (
              <TouchableOpacity style={styles.quizButton} onPress={this.handleStartQuiz}>
                <Text style={styles.quizButtonText}>Start Quiz</Text>
              </TouchableOpacity>
          )
          : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: blue,
  },
  deckContainer: {
    width: 250,
    margin: 20,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: yellow,
    backgroundColor: yellow,
  },
  cardNum: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20,
  },
  quizButton: {
    backgroundColor: lightBlue,
    borderRadius: 5,
    height: 50,
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  quizButtonText: {
    color: white,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: white,
    borderRadius: 5,
    height: 50,
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  addButtonText: {
    color: lightBlue,
    fontWeight: '500',
  },
})

function mapStateToProps ({ decks }, { navigation }) {
  const { title } = navigation.state.params
  return {
    title,
    questions: decks[title].questions
  }
}

export default connect(mapStateToProps)(Deck);
