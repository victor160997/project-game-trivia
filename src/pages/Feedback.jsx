import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderFeedback from '../components/HeaderFeedback';
// import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends Component {
  // renderFeedback(placar) {
  //   const tres = 3;
  //   if (Number(placar) < tres) {
  //     return <p>Podia ser melhor...</p>;
  //   }
  //   return <p>Mandou bem!</p>;
  // }

  render() {
    const { placar, score } = this.props;
    const dois = 2;
    return (
      <div>
        <HeaderFeedback />
        { placar <= dois ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p> }
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ placar }</p>
        <Link
          to="/"
          data-testid="btn-play-again"
        >
          Jogar novamente
        </Link>
        <br />
        <Link
          to="/ranking"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </Link>
      </div>
    );
  }
}

// o código abaixo vai ser usado para pegar o placar do estado global.

Feedback.propTypes = {
  placar: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  placar: state.placar.assertions,
  score: state.placar.placar,
});

export default connect(mapStateToProps)(Feedback);
