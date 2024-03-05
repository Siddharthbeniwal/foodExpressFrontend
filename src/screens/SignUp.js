import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URLS } from '../appConstants';

const SignUp = () => {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

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
        console.log('json', json)

        try {

            if (json.success) {
                alert(json.successMsg + '. Please login to continue.')
                navigate('/login')
            }
            else {
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
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={(e) => handleChange(e)}
                        placeholder="Password" />
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
