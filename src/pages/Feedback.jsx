import React, { Component } from 'react';
import HeaderFeedback from '../components/HeaderFeedback';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderFeedback = this.renderFeedback.bind();
  }

  renderFeedback(placar) {
    const tres = 3;
    if (placar < tres) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const placar = 0; // Essa variável placar é hipotética, ela vai ser apagada quando o tivermos o placar real retornado.
    return (
      <div>
        <HeaderFeedback />
        <span data-testid="feedback-text">
          { () => this.renderFeedback(placar) }
        </span>
      </div>
    );
  }
}

// o código abaixo vai ser usado para pegar o placar do estado global.

/* const mapStateToProps = (state) => ({
  placar: state.('valor de placar vindo do estado')
});

export default connect(mapStateToProps)(Feedback); */
