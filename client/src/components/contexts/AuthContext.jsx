import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Login from '../Navbar/Login';
import SignUp from '../Navbar/SignUp';
const AuthContext = createContext();
import host from "../../host.js"
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [accessToken, setToken] = useState(() => localStorage.getItem('jwtAccessToken') || "");
    const [refreshToken, setRefToken] = useState(() => localStorage.getItem('jwtRefreshToken') || "");
    const [userDataResponse, setData] = useState(null);

    useEffect(() => {
        localStorage.setItem('jwtAccessToken', accessToken);
    }, [accessToken]);

    useEffect(() => {
        localStorage.setItem('jwtRefreshToken', refreshToken);
    }, [refreshToken]);

    const setAccessToken = (token) => {
        setToken(token);
    };

    const setRefreshToken = (token) => {
        setRefToken(token);
    };

    const handleCloseModal = () => {
        setShowLogin(false);
        setShowSignUp(false);
    };

    const switchToLogin = () => {
        setShowLogin(true);
        setShowSignUp(false);
    };

    const switchToSignUp = () => {
        setShowLogin(false);
        setShowSignUp(true);
    };

    const handleLogout = async () => {
        try {
            await axios.delete(`${host.apiUrl}/user/logout/${refreshToken}`);
            setAccessToken("");
            setRefreshToken("");
            localStorage.removeItem('jwtRefreshToken');
            localStorage.removeItem('jwtAccessToken');
            setData(null);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUserData = async () => {
        if (accessToken && refreshToken) {
            try {
                const response = await axios.get(`${host.apiUrl}/user/user-data`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Refresh-token': refreshToken
                    }
                });
                if (response.data.message !== "Invalid token or user not logged in") {
                    if (response.data.accessToken) {
                        setAccessToken(response.data.accessToken);
                    }
                    setData(response.data.user);
                }
                return response;
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [accessToken, refreshToken]);

    return (
        <AuthContext.Provider value={{ showLogin, showSignUp, switchToLogin, switchToSignUp, handleCloseModal, userDataResponse, handleLogout,accessToken ,refreshToken}}>
            {children}
            {showLogin && <Login switchToSignUp={switchToSignUp} onClose={handleCloseModal} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} />}
            {showSignUp && <SignUp switchToLogin={switchToLogin} onClose={handleCloseModal} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} />}
        </AuthContext.Provider>
    );
};
