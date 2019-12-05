import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { blue, orange, white, lightBlue, yellow } from '../utils/colors'


class Quiz extends Component {
  state = {
    isQuestion: true,
    showAnswer: false,
    isLastCard: false,
    cardIndex: 0,
    score: 0
  }

  handleClickAnswer = () => {
    this.setState((preState) => ({
      isQuestion: !preState.isQuestion,
      showAnswer: true,
    }))
  }

  handleAnswer = (isCorrect) => {
    const { cardIndex } = this.state
    const { questions } = this.props.deck
    if ( cardIndex + 1 === questions.length ) {
      this.setState((preState) => ({
        isLastCard: true,
        showAnswer: false,
        score: isCorrect ? preState.score + 1 : preState.score,
      }))
    } else {
      this.setState((preState) => ({
        isQuestion: true,
        showAnswer: false,
        cardIndex: preState.cardIndex + 1,
        score: isCorrect ? preState.score + 1 : preState.score,
      }))
    }
  }

  handleRestart = () => {
    this.setState({
      isQuestion: true,
      isLastCard: false,
      cardIndex: 0,
      score: 0,
    })
  }

  render () {
    const { isQuestion, isLastCard, cardIndex, score, showAnswer } = this.state
    const { deck, navigation } = this.props
    const { questions } = deck
    return (
      <View>
        {!isLastCard
          ? (
              <View>
                <View style={styles.indexContainer}>
                  <Text style={{color: blue}}>{`${cardIndex + 1} / ${questions.length}`}</Text>
                </View>
                <View style={[styles.container, { height: 300 }]}>
                  <Text style={styles.content}>{questions[cardIndex].question}</Text>
                  {showAnswer ? 
                  <View style={[styles.container, styles.cardContainer]}>
                    <Text style={styles.cardText}>{questions[cardIndex].answer}</Text>
                  </View>
                  : <TouchableOpacity onPress={this.handleClickAnswer}>
                    <Text style={styles.link}>Show Answer</Text>
                  </TouchableOpacity>
                  }
                </View>
                <View style={[styles.container, {marginTop: 50}]}>
                  <TouchableOpacity style={[styles.button, styles.correctButton]} onPress={() => this.handleAnswer(true)}>
                    <Text style={styles.buttonText}>Correct</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.incorrectButton]} onPress={() => this.handleAnswer(false)}>
                    <Text style={styles.buttonText}>Incorrect</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          : (
              <View style={styles.container}>
                <Text style={styles.score}>{(score / questions.length * 100).toFixed(0)} %</Text>
                <Text style={styles.underScoreText}>Correct!</Text>
                <TouchableOpacity style={[styles.button, styles.correctButton]} onPress={this.handleRestart}>
                  <Text style={styles.buttonText}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.navigate('Deck') }>
                  <Text style={styles.backButtonText}>Back to Deck</Text>
                </TouchableOpacity>
              </View>
            )
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
  cardContainer: {
    width: 250,
    margin: 20,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: yellow,
    backgroundColor: yellow,
  },
  cardText: {
    textAlign: "center",
    fontWeight: '300',
    fontSize: 18,
  },
  content: {
    fontSize: 30,
    maxWidth: 300,
    marginTop: 30,
    marginBottom: 30,
    color: blue,
  },
  link: {
    fontSize: 20,
    color: orange,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  indexContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    borderRadius: 3,
    height: 50,
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  correctButton: {
    backgroundColor: lightBlue,
  },
  incorrectButton: {
    backgroundColor: orange,
  },
  buttonText: {
    color: white,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: white,
  },
  backButtonText: {
    color: blue,
    fontWeight: '500',
  },
  score: {
    marginTop: 60,
    fontSize: 60,
    fontWeight:'bold',
    marginBottom: 30,
    color: blue,
  },
  underScoreText: {
    fontSize: 20,
    color: blue,
    marginBottom: 40,
  }
})

function mapStateToProps ({ decks }, props) {
  const { deckKey } = props.navigation.state.params
  return {
    deck: decks[deckKey]
  }
}

export default connect(mapStateToProps)(Quiz)