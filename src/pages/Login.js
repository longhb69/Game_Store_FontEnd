import React, { useContext, useState } from 'react';
import { baseUrl } from '../shared';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import { useAccount, useLogin } from '../LoginContext';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [incorrent, setIncorrent] = useState(false);
    const [loggedIn, setLoggedIn] = useLogin()
    const [account, setAccount] = useAccount()

    const navigate = useNavigate()
    
    const location = useLocation();
    
    function login(e) {
        e.preventDefault();
        const url = baseUrl + 'api/token/';
        axios.post(url, {
            username: username,
            password: password,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
          localStorage.setItem('access', response.data.access);
          localStorage.setItem('refresh',response.data.refresh);
          setLoggedIn(true)
          const url2 = baseUrl + 'api/account/'
          axios.get(url2, {
            headers: {
              Authorization: 'Bearer ' + response.data.access, 
            }
          })
          .then((respone) => {
            console.log("Username")
            console.log(respone.data.username)
            setAccount(respone.data.username);
            localStorage.setItem('account', respone.data.username)
          })
          location.state.previousUrl ? navigate(location.state.previousUrl) : navigate('/')
        }).catch((e) => {
          if(e.response && (e.response.status === 401 || e.response.status === 400)) {
            setIncorrent(true)
            console.log('Incorrect username or password');
          }
        });
    };
    return (
        <div className='text-white mx-auto'>
      <form onSubmit={login}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            className='bg-black'
            value={username}
            onChange={(e) => {
                setUsername(e.target.value)
            }}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className='bg-black'
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
          />
        </label>
        {incorrent ? <p className='text-red'>Incorrect username or password</p> : null}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
    )
}