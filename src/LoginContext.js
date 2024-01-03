import {useContext, useState, createContext, useEffect} from "react";
import { baseUrl } from './shared';
import axios, { Axios } from 'axios';

const LoginContext = createContext();
const AccountContext = createContext();

export function useLogin() {
    return useContext(LoginContext);
}
export function useAccount() {
    return useContext(AccountContext);
}

export function LoginProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.access ? true : false
      )
    const [account, setAccount] = useState(null)

    function changeLoggedIn(value) {
        setLoggedIn(value)
        if(value === false) {
          localStorage.clear();
        }
    }
    useEffect(() => {
        function refreshTokens() {
            if(localStorage.refresh) {
              const url = baseUrl + 'api/token/refresh/';
              axios.post(url, {
                refresh: localStorage.refresh,
              }).then((respone) => {
                localStorage.access = respone.data.access
                localStorage.refresh = respone.data.refresh
                setAccount(localStorage.account)
                setLoggedIn(true)
              }).catch((error) => {
                console.error('Error refreshing token:', error);
              });
            }
        }
        const minute = 1000 * 60 
        refreshTokens();
        setInterval(refreshTokens(), minute * 3);
    }, [])
    return (
        <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
            <AccountContext.Provider value={[account, setAccount]}>
                {children}
            </AccountContext.Provider>
        </LoginContext.Provider>
    )
}