// import {Component} from 'react'
// import {Redirect} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import './index.css'

// class Login extends Component {
//   state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

//   onChangeUsername = event => {
//     this.setState({username: event.target.value})
//   }

//   onChangePassword = event => {
//     this.setState({password: event.target.value})
//   }

//   onSubmitSuccess = jwtToken => {
//     const {history} = this.props
//     Cookies.set('jwt_token', jwtToken, {
//       expires: 30,
//     })
//     history.replace('/')
//   }

//   onSubmitFailure = errorMsg => {
//     this.setState({errorMsg, showSubmitError: true})
//   }

//   submitForm = async event => {
//     event.preventDefault()
//     const {username, password} = this.state
//     const userDetails = {username, password}
//     const apiUrl = 'https://apis.ccbp.in/login'
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(userDetails),
//     }
//     const response = await fetch(apiUrl, options)
//     const data = await response.json()
//     if (response.ok === true) {
//       this.onSubmitSuccess(data.jwt_token)
//     } else {
//       this.onSubmitFailure(data.error_msg)
//     }
//   }

//   render() {
//     const {username, password, showSubmitError, errorMsg} = this.state
//     const token = Cookies.get('jwt_token')
//     if (token !== undefined) {
//       return <Redirect to="/" />
//     }
//     return (
//       <div className="login-container">
//         <form className="form-container" onSubmit={this.submitForm}>
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
//             className="login-website-logo"
//             alt="website logo"
//           />
//           <div className="input-container">
//             <label className="input-label" htmlFor="username">
//               USERNAME
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               className="username-input-field"
//               onChange={this.onChangeUsername}
//               placeholder="Username"
//             />
//           </div>
//           <div className="input-container">
//             <label className="input-label" htmlFor="password">
//               PASSWORD
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               className="password-input-field"
//               onChange={this.onChangePassword}
//               placeholder="Password"
//             />
//           </div>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//           {showSubmitError && <p className="error-message">*{errorMsg}</p>}
//         </form>
//       </div>
//     )
//   }
// }
// export default Login

/* eslint-disable consistent-return */
import {Component} from 'react'
// import { Redirect } from "react-router-dom";
import Cookies from 'js-cookie'
import './index.css'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onSubmitLogin = async event => {
    const {history} = this.props

    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({isError: true, errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="card-login" onSubmit={this.onSubmitLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            className="login-card-logo"
            alt="website logo"
          />

          <label htmlFor="username" className="label-username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="username"
            className="username"
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password" className="label-password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            className="password"
            value={password}
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {isError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
