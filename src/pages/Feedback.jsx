import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderFeedback from '../components/HeaderFeedback';
// import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends Component {
  componentDidMount() {
    this.saveUserInRanking();
  }

  saveUserInRanking() {
    const { placar, userName, profileImage } = this.props;
    const localStorageRanking = JSON.parse(localStorage.getItem('ranking'));
    const userInfos = {
      name: userName,
      score: placar,
      picture: profileImage,
    };
    const ranking = [...localStorageRanking, userInfos];
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { placar, score } = this.props;
    const dois = 2;
    if (localStorage.getItem('ranking') === null) localStorage.setItem('ranking', '[]');
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
  userName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  placar: state.placar.assertions,
  score: state.placar.placar,
  userName: state.user.userInfo.name,
  profileImage: state.user.userInfo.gravatarImage,
});

export default connect(mapStateToProps)(Feedback);
