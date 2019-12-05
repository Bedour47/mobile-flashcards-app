import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveDeck } from '../utils/api'
import { addDeck } from '../actions'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native'
import { white, gray, red, blue, lightBlue } from '../utils/colors'


class NewDeck extends Component {
  state = {
    inputValue: '',
    showValidation: false,
  }
  
  addDeck = () => {
    const { inputValue } = this.state
    const { decks } = this.props
    const deck = {
      title: inputValue,
      questions: [],
    }

    if (inputValue !== '') {
      this.props.dispatch(addDeck(deck))
      saveDeck(inputValue)

      this.setState({
        inputValue: ''
      })

      this.props.navigation.navigate('Deck', {title: inputValue})
    } else {
      this.setState({
        showValidation: true
      })
    }
  }


  handleInputValueChange = (inputValue) => {
    this.setState({
      inputValue,
      showValidation: false,
    })
  }


  render () {
    const { inputValue, showValidation } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={[styles.container, { flex: 0.7 }]}>
        <Text style={styles.header}>What is the title of your new deck?</Text>
        <View style={{ flexDirection: 'row', height: 40}}>
          <TextInput
            value={inputValue}
            style={styles.inputValue}
            placeholder="Title here"
            onChangeText={this.handleInputValueChange}
          />
        </View>
        {showValidation
          ? <Text style={styles.validationText}>Title can't be empty!</Text>
          : null
        }
        <TouchableOpacity style={styles.addButton} onPress={this.addDeck}>
          <Text style={styles.addButtonText}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 35,
    padding: 30,
    color: blue,
  },
  inputValue: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: gray,
    paddingLeft: 5,
  },
  addButton: {
    backgroundColor: lightBlue,
    borderRadius: 5,
    height: 50,
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  addButtonText: {
    color: white,
    fontWeight: '500',
  },
  validationText: {
    color: red
  }
})

function mapStateToProps ({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(NewDeck);
