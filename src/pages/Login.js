import React, { useState } from 'react';
import { baseUrl } from '../shared';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    
    
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
            console.log(response)
        }).catch((e) => {

        })
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
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
    )
}