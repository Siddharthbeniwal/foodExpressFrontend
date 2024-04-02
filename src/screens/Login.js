import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URLS } from '../appConstants';
import { setIsLoggedIn } from '../features/foodExpressSlice'
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await fetch(API_URLS.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userCredentials.email,
                password: userCredentials.password
            })
        })
        const userLoginResponse = await response.json()

        if (userLoginResponse.success) {
            localStorage.setItem('authToken', userLoginResponse.authToken)
            localStorage.setItem('userEmail', userLoginResponse.userData.email)
            localStorage.setItem('username', userLoginResponse.userData.username)
            dispatch(setIsLoggedIn({ type: 'LOGIN' }))
            navigate('/')

        } else {
            alert('Please enter valid credentials')
        }

    }

    const handleChange = (e) => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='form-container'>
            <form>
                <h1 className='heading'>Login</h1>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userCredentials.email}
                        onChange={(e) => handleChange(e)
                        } aria-describedby="emailHelp" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <div className='d-flex align-items-center'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            name="password"
                            value={userCredentials.password}
                            onChange={(e) => handleChange(e)}
                            placeholder="Password"
                        />

                        <span style={{ marginLeft: '-25px' }}>
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="eye-icon"
                                onClick={togglePasswordVisibility}
                            />
                        </span>
                    </div>

                </div>

                <button
                    type="submit"
                    className="btn btn-primary bg-success"
                    onClick={handleLogin}
                >Login
                </button>

                <Link
                    to="/signUp"
                    className="m-3 btn btn-primary"
                >New user?
                </Link>

            </form>
        </div>
    )
}

export default Login
