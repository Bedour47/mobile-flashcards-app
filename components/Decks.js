import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { handleInitialData, clearDecks } from '../actions'
import { connect } from 'react-redux'
import { clearAllDecks } from '../utils/api'
import { blue, yellow } from '../utils/colors'


class Decks extends Component {
  componentDidMount () {
    const { decks, dispatch } = this.props
    dispatch(handleInitialData())
  }

  clear = () => {
    this.props.dispatch(clearDecks())
    clearAllDecks()
    this.props.dispatch(handleInitialData())
  }

  render () {

    const { decks, isInitialData, navigation } = this.props

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {decks && Object.keys(decks).map((key) => (
          <TouchableOpacity key={key} onPress={() => navigation.navigate(
            'Deck',
            { title: key }
          )}>
            <View style={[styles.container, styles.deckContainer]}>
              <Text style={styles.title}>{decks[key].title}</Text>
              <Text>{decks[key].questions ? decks[key].questions.length : 0} cards</Text>
            </View>
          </TouchableOpacity>
        ))}
        {!isInitialData
          ? (
              <TouchableOpacity onPress={this.clear}>
                <Text style={styles.clearTxt}>RESET</Text>
              </TouchableOpacity>
            )
          : null
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearTxt: {
    color: blue,
    fontSize: 12,
    marginTop: 20,
    marginBottom: 30,
    fontWeight: '300',
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: blue,
  }
})

function mapStateToProps ({ decks }) {
  return {
    decks,
    isInitialData: decks && Object.keys(decks).length === 2,
  }
}

export default connect(mapStateToProps)(Decks)
