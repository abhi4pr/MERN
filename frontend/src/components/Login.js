import Header from './Header';
import Footer from './Footer';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendLoginData } from '../actions/userAction';
import {Route, useNavigate} from 'react-router-dom';
import { useAlert } from 'react-alert';

function Login() {

    const alert = useAlert();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputField , setInputField] = useState({
        email: '',
        password: ''
    });
    const userData = useSelector((state) => state.getUsersReducer.userData);

    useEffect(() => {
        
    },[]);

    const inputHandler = (e) =>{
        setInputField({...inputField, [e.target.name]: e.target.value});
    }

    const handleLog = (event) => {
        event.preventDefault();

        dispatch(sendLoginData(inputField))
        .then((res) => {
            if(res.user.isAdmin == false){
                localStorage.setItem('userToken', JSON.stringify(res.token));
                window.location.href = "/profile";
                alert.show('Logged in success');
            }else if(res.user.isAdmin == true){
                localStorage.setItem('adminToken', JSON.stringify(res.token));
                alert.show('Logged in success');
                navigate('/admin/dashboard');
            }
        }).catch(err => { 
            alert.show('Please check your credentials');
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
                                    <h2>Login Page</h2>
                                </div>
                                <div className="page-bc">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#"> <i
                                                        className="fas fa-home "></i>Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a
                                                    href="#">Login Page</a></li>
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
                                <form method='POST' onSubmit={handleLog}>
                                    <div className="login-input">
                                        <input type="email" name="email" onChange={inputHandler} placeholder="Enter your email...."/>
                                        <input type="password" name="password" onChange={inputHandler} placeholder="Enter your Password"/>
                                    </div>
                                    
                                    <div className="login-button text-center pt-30">
                                    <button disabled={!inputField.email} type="submit" className="btn btn-success">Login</button>
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

export default Login;