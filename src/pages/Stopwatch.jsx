import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 30,
    };

    this.delayer = this.delayer.bind(this);
  }

  componentDidMount() {
    this.delayer();
  }

  shouldComponentUpdate(_, nextState) {
    const { timer } = this.state;
    nextState = 0;
    return (timer > nextState);
  }

  componentDidUpdate() {
    const { contador } = this.props;
    const { timer } = this.state;
    if (timer === 0) contador(timer);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  delayer() {
    const timerValue = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, timerValue);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <p>{ timer }</p>
      </div>
    );
  }
}

Stopwatch.propTypes = {
  contador: PropTypes.func.isRequired,
};

export default Stopwatch;
