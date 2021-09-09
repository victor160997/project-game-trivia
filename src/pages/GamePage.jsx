import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getPoints } from '../actions';
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
      showNext: false,
    };

    this.saveQuestionsInTheState = this.saveQuestionsInTheState.bind(this);
    this.requestQuestions = this.requestQuestions.bind(this);
    this.trueOrFalse = this.trueOrFalse.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.getDificult = this.getDificult.bind(this);
    this.calculaPontos = this.calculaPontos.bind(this);
    this.delayer = this.delayer.bind(this);
  }

  componentDidMount() {
    this.requestQuestions();
    const { user } = this.props;
    const player = {
      player: {
        name: user.name,
        assertions: 0,
        score: 0,
        gravatarEmail: user.email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  shouldComponentUpdate(_, nextState) {
    const { timer } = this.state;
    nextState = 0;
    return (timer > nextState);
  }

  getDificult(dft) {
    if (dft === 'hard') {
      const hard = 3;
      return hard;
    } if (dft === 'medium') {
      const medium = 2;
      return medium;
    }
    return 1;
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

  calculaPontos(e) {
    const { enviaPlacar, placarAtual, user } = this.props;
    const { questions } = this.state;
    const timeSeconds = document.getElementById('timer').firstChild.innerText;
    const questionValue = document.querySelector('.correct')
      .parentElement.firstChild.nextSibling.innerText;
    const dificuldade = questions.find((q) => q.question === questionValue);
    const dificuldadeValue = this.getDificult(dificuldade.difficulty);
    let points = 0;
    if (e.target.value === document.querySelector('.correct').value) {
      const DEZ = 10;
      points = DEZ + (timeSeconds * dificuldadeValue);
    } else {
      points = 0;
    }
    const player = {
      player: {
        name: user.name,
        assertions: JSON.parse(localStorage.getItem('state')).player.assertions + 1,
        score: JSON.parse(localStorage.getItem('state')).player.score + points,
        gravatarEmail: user.email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
    return enviaPlacar(placarAtual + points);
  }

  trueOrFalse(e) {
    document.querySelectorAll('.wrong-answer')
      .forEach((value) => {
        value.className = 'wrong';
      });
    document.querySelector('.correct-answer').className = 'correct';
    this.setState({ showNext: true });
    this.calculaPontos(e);
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

  buttonNext() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          const NUMBER_FIVE = 5;
          const NUMBER_ONE = 1;
          this.setState((prevState) => ({
            index: prevState.index === NUMBER_FIVE ? NUMBER_FIVE
              : prevState.index + NUMBER_ONE,
            showNext: false,
            timer: 30,
          }));
        } }
      >
        Próxima
      </button>
    );
  }

  delayer() {
    const timerValue = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, timerValue);
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
    const { show, index, showNext, timer } = this.state;
    const NUMBER_FOUR = 4;
    return (
      <div>
        <HeaderProfile />
        {show ? this.showQuestions()[index] : <p>Loading...</p>}
        <Stopwatch
          contador={ this.handleTimer }
          delayer={ this.delayer }
          timer={ timer }
        />
        { showNext ? this.buttonNext() : false }
        { index > NUMBER_FOUR ? <Redirect to="/feedback" /> : false }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.userInfo.token,
  placarAtual: state.placar.placar,
  user: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  enviaPlacar: (payload) => dispatch(getPoints(payload)),
});

GamePage.propTypes = {
  enviaPlacar: PropTypes.func.isRequired,
  placarAtual: PropTypes.number.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
