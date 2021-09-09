import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { placar } = this.props;
    const dois = 2;
    return (
      <div>
        <HeaderFeedback />
        { placar <= dois ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p> }
      </div>
    );
  }
}

// o código abaixo vai ser usado para pegar o placar do estado global.

Feedback.propTypes = {
  placar: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  placar: state.placar.assertions,
});

export default connect(mapStateToProps)(Feedback);
