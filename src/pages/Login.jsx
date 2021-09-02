import React, { Component } from 'react';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      disable: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    const email = document.getElementById('email');
    const nome = document.getElementById('name');
    this.setState({ [name]: value });
    const ZERO = 0;
    if (email.checkValidity() && nome.value.length > ZERO && email.value.length > ZERO) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  async requestToken() {
    const urlRequestToken = 'https://opentdb.com/api_token.php?command=request';
    const data = await fetch(urlRequestToken);
    const response = await data.json();
    localStorage.setItem('token', JSON.stringify(response.token));
  }

  render() {
    const { email, name, disable } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            <input
              minLength="1"
              id="name"
              data-testid="input-player-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              id="email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            disabled={ disable }
            type="button"
            onClick={ this.requestToken }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
