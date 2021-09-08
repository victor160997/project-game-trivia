import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import HeaderProfile from '../components/HeaderProfile';
import './questions.css';
import Stopwatch from './Stopwatch';

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {},
      show: false,
      index: 0,
      token: '',
      timer: 30,
    };

    this.saveQuestionsInTheState = this.saveQuestionsInTheState.bind(this);
    this.requestQuestions = this.requestQuestions.bind(this);
    this.trueOrFalse = this.trueOrFalse.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  componentDidMount() {
    this.requestQuestions();
  }

  saveQuestionsInTheState(object) {
    this.setState({
      questions: object,
      show: true,
    });
  }

  handleTimer(count) {
    this.setState({ timer: count });
  }

  trueOrFalse() {
    document.querySelectorAll('.wrong-answer')
      .forEach((value) => {
        value.className = 'wrong';
      });
    document.querySelector('.correct-answer').className = 'correct';
  }

  showQuestions() {
    const { questions, timer } = this.state;
    return questions.map((question, index) => (
      <div key={ index }>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        { question.incorrect_answers.concat(question.correct_answer).sort()
          .map((oneQuestion, questionIndex) => (
            <button
              value={ oneQuestion }
              type="button"
              key={ questionIndex }
              className={ oneQuestion === question.correct_answer
                ? 'correct-answer' : 'wrong-answer' }
              data-testid={ oneQuestion === question.correct_answer
                ? 'correct-answer' : `wrong-answer-${questionIndex}` }
              onClick={ this.trueOrFalse }
              disabled={ timer !== 0 ? false : 'true' }
            >
              {oneQuestion}
            </button>
          )) }
      </div>
    ));
  }

  async requestQuestions() {
    const { token } = this.state;
    // const localStorageToken = JSON.parse(localStorage.getItem('token'));
    const questionsData = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseQuestions = await questionsData.json();
    this.saveQuestionsInTheState(responseQuestions.results);
    return token;
  }

  render() {
    const { show, index } = this.state;
    return (
      <div>
        <HeaderProfile />
        {show ? this.showQuestions()[index] : <p>Loading...</p>}
        <Stopwatch contador={ this.handleTimer } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.userInfo.token,
});

// GamePage.propTypes = {
//   token: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps)(GamePage);
