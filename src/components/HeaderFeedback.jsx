// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// class HeaderFeedback extends Component {
//   render() {
//     const placar = 0; // Essa variável placar é hipotética, ela vai ser apagada quando o tivermos o placar real retornado.
//     const { nome, gravatarImage } = this.props;
//     return (
//       <header>
//         <img
//           src={ gravatarImage }
//           alt="avatar"
//           data-testid="header-profile-picture"
//         />
//         <span data-testid="header-player-name">{ nome }</span>
//         <span data-testid="header-score">{ placar }</span>
//       </header>
//     );
//   }
// }

// HeaderFeedback.propTypes = {
//   gravatarImage: PropTypes.string.isRequired,
//   nome: PropTypes.string.isRequired,
// };

// const mapStateToProps = (state) => ({
//   gravatarImage: state.user.userInfo.gravatarImage,
//   nome: state.user.userInfo.name,
// });

// export default connect(mapStateToProps)(HeaderFeedback);
