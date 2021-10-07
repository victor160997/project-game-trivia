import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: [],
      loading: false,
    };

    this.getRanking = this.getRanking.bind(this);
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const getLocal = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking: [...getLocal],
      loading: true,
    });
  }

  showRanking() {
    const { ranking } = this.state;
    return ranking.sort((a, b) => b.score - a.score)
      .map((user, index) => (
        <div key={ index }>
          <img src={ user.picture } alt="user_picture" />
          <p data-testid={ `player-name-${index}` }>{ user.name }</p>
          <p data-testid={ `player-score-${index}` }>
            Pontos:
            { user.score }
          </p>
        </div>
      ));
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <h3 data-testid="ranking-title">
          Ranking
        </h3>
        { loading ? this.showRanking() : false }
        <Link to="/" data-testid="btn-go-home">Início</Link>
      </div>
    );
  }
}

export default Ranking;
