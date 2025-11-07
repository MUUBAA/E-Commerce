import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { RootState } from "../redux/stores";
import { decrypt } from "./encryptionUtils";


interface JwtPayload {
    exp: number;
}

export const useAuth = (isRegistration: boolean = false) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {jwt} = useSelector((state: RootState) => state.loginUser);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        navigate('/login');
        localStorage.clear();
        localStorage.removeItem('jwtToken');
    }, [navigate]);

    useEffect(() => {
        const decryptedJwt = getDecryptedJwt();
        
        if (!decryptedJwt) {
            setIsAuthenticated(false);
            if(!isRegistration) {
                navigate('/login');
            }
            return;
        }

        try {
            const decoded: JwtPayload = jwtDecode(decryptedJwt);
            const isExpired = decoded.exp * 1000 < Date.now();
            
            if (isExpired) {
                toast.error("Token expired");
                handleLogout();
                setIsAuthenticated(false);
                return;
            }

            setIsAuthenticated(true);
        } catch (err) {
            console.error('Failed to decode JWT:', err);
            setIsAuthenticated(false);
            if (!isRegistration) {
                navigate('/login');
            }
        }
    }, [jwt, navigate, isRegistration, handleLogout]);

    return isAuthenticated;
}


export const getDecryptedJwt = () => {
  const encryptedJwt = localStorage.getItem('jwtToken');
  return encryptedJwt ? decrypt(encryptedJwt) : null;
};
