import React from 'react'
import PropTypes from 'prop-types'

function LoginForm(props) {
    return (
        <form onSubmit= {props.handleLogin}>
            <div>
                username 
                    <input
                        id="username"
                        type="text"
                        value={props.username}
                        name="Username"
                        onChange={({ target }) => props.setUsername(target.value)}
                    />
            </div>
            <div>
                password
                    <input 
                        id="password"
                        type="password"
                        value={props.password}
                        name="Password"
                        onChange={({ target }) => props.setPassword(target.value)}   
                    />

                    
            </div>
            <button id="login-button" type="submit"> Login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default LoginForm