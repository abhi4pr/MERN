import { Link, useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

function Alogout() {

    let navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    },[]);

    return (
      <div>  
        
      </div>     
    );
}

export default Alogout;