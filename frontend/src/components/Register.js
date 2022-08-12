import Header from './Header';
import Footer from './Footer';
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { sendRegisterData } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

function Register() {
    
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputField , setInputField] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    });

    const inputHandler = (e) =>{
        setInputField({...inputField, [e.target.name]: e.target.value});
    }

    const handleReg = (event) => {
        event.preventDefault();
        dispatch(sendRegisterData(inputField))
        .then((res) => {
            if(res.status == 200){
                alert.show('Registration success');
                navigate('/login');
            }
        }).catch(err=>{
            alert.show('Email allready taken');
        })
    }

    return (
        <div>
            <Header/>
            <div className="page-title-area pt-130 pb-120 " style={{backgroundImage: "url(img/bg/chechout-page-bg.jpg)"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page-titel-detalis  ">
                                <div className="page-title position-relative">
                                    <h2>Register Page</h2>
                                </div>
                                <div className="page-bc">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#"> <i
                                                        className="fas fa-home "></i>Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a
                                                    href="#">Register Page</a></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-page-area pt-50" style={{marginBottom:"50px"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                            <div className="login-detalis pt-40 pr-40 pl-40 pb-40">
                                <form method='POST' onSubmit={handleReg}>
                                    <div className="login-input">
                                        <input type="text" name="name" onChange={inputHandler} placeholder="Enter your NAME...."/>
                                        <input type="email" name="email" onChange={inputHandler} placeholder="Enter your email...."/>
                                        <input type="password" name="password" onChange={inputHandler} placeholder="Enter your Password"/>
                                        <input type="text" name="address" onChange={inputHandler} placeholder="Enter your address"/>
                                        <input type="number" name="phone" onChange={inputHandler} placeholder="Enter your phone"/>
                                    </div>
                                    
                                    <div className="login-button text-center pt-30">
                                    <button type="submit" disabled={!inputField.email} className="btn btn-success">Register</button>
                                    </div>
                                </form>
                                <div className="login-information pt-25">
                                    <div className="remember-me">
                                        <input type="checkbox" id="checkbox-1"/><label htmlFor="checkbox-1">Remember Me</label>
                                        <span className="float-right">Forgot <span>password?</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

            <Footer/>           
        </div>
    );
}

export default Register;