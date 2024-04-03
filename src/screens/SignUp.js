import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URLS } from '../appConstants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault()
        const response = await fetch(API_URLS.SIGN_UP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userData.username,
                email: userData.email,
                password: userData.password
            })
        })
        const json = await response.json()
 
        try {

            if (json.success) {
                alert(json.successMsg + '. Please login to continue.')
                navigate('/login')
            }
            else {
                json && json.error[0] && json.error[0].msg ?
                    alert(json.error[0].msg) :
                    json.error ? alert(json.error) :
                        alert('Something went wrong')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='form-container'>
            <form>
                <h1 className='heading'>Sign Up</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={(e) => handleChange(e)}
                        aria-describedby="username"
                        placeholder="Enter Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
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
                            value={userData.password}
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
                    onClick={handleSignUp}
                >Sign Up
                </button>
                <Link
                    to="/login"
                    className="m-3 btn btn-primary"
                >Already a user?
                </Link>

            </form>
        </div>
    )
}

export default SignUp
