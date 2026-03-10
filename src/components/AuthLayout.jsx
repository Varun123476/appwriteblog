import React,{ useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function AuthLayout({ children,authentication = true }) {
    const navigate = useNavigate;
    const authStatus = useSelector((state) => state.auth.status);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate('/login')
        }
        else if (!authentication && authStatus) {
            navigate('/')
        }
        setChecking(false)
    }, [authStatus, authentication, navigate])

    if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
    
    return <>{children}</>
}

export default AuthLayout;