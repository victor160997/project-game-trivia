import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import userInfo from '../actions';
import Header from '../components/Header';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      // token: '',
      disable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.requestToken = this.requestToken.bind(this);
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
    const { userInfoProps } = this.props;
    const urlRequestToken = 'https://opentdb.com/api_token.php?command=request';
    const data = await fetch(urlRequestToken);
    const response = await data.json();
    localStorage.setItem('token', JSON.stringify(response.token));
    // this.setState({ token: response});
    const { email, name } = this.state;
    const hash = md5(email).toString();
    const gravatarImage = `https://www.gravatar.com/avatar/${hash}`;
    userInfoProps({ email, name, gravatarImage });
  }

  render() {
    const { email, name, disable } = this.state;
    return (
      <div>
        <Header />
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
          <Link to="/headerprofile">
            <button
              data-testid="btn-play"
              disabled={ disable }
              type="button"
              onClick={ this.requestToken }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  userInfoProps: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userInfoProps: (payload) => dispatch(userInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
