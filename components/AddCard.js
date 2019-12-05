import React, { Component } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, gray, blue } from '../utils/colors'
import { addCardToDeck } from '../utils/api'


class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  handleSubmit = () => {
    const { dispatch, navigation } = this.props
    const { question, answer } = this.state
    const { deckKey } = navigation.state.params
    const card = {
      question,
      answer
    }

    dispatch(addCard(card, deckKey))

    addCardToDeck(card, deckKey)

    navigation.navigate('Deck')
  }

  render () {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.label}>Question</Text>
        </View>
        <View style={{ flexDirection: 'row', height: 40}}>
          <TextInput
            style={styles.input}
            value={question}
            onChangeText={(input) => this.setState({ question: input})}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.label}>Answer</Text>
        </View>
        <View style={{ flexDirection: 'row', height: 40}}>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={(input) => this.setState({ answer: input})}
          />
        </View>
        {question === '' || answer === ''
          ? (
            <Text style={styles.validationText}>Please Enter Question and Answer please...</Text>
          )
          : (
            <TouchableOpacity style={[styles.button, ]} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 0.8,
    fontSize: 20,
    fontWeight: '500',
    color: blue,
    marginTop: 40,
    marginBottom: 10,
    alignItems: 'flex-start'
  },
  input: {
    flex: 0.8,
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: gray,
    paddingLeft: 5,
  },
  validationText: {
    marginTop: 30,
  },
  button: {
    backgroundColor: blue,
    borderRadius: 5,
    height: 50,
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: white,
    fontWeight: '500',
  }
})

function mapStateToProps ({ decks }, props) {
  const { deckKey } = props.navigation.state.params
  return {
    title: deckKey
  }
}

export default connect(mapStateToProps)(AddCard)