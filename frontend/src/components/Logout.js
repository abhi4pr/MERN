import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

function Logout() {
    
    let navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem("userToken");
        navigate("/login");
    },[]);

    return (
        <div>
            <Header/>
            
            <Footer/>           
        </div>
    );
}

export default Logout;