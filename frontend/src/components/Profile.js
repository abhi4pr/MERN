import Header from './Header';
import Footer from './Footer';
import { getSingleUser, profileUpdate } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';
import { useAlert } from 'react-alert';

function Profile() {
    
    const alert = useAlert();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.getUsersReducer.userData);

    const fetchData = async() => {
        dispatch(getSingleUser());
    }
    
    useEffect(() => {
        fetchData();
    },[]);

    const inputHandler = (e) =>{
        dispatch({
            type: 'USER_SINGLE_SUCCESS',
            payload: {...userData,[e.target.name]: e.target.value}
        })
    }

    const handleProfile = (event) => {
        event.preventDefault();
        dispatch(profileUpdate(userData))
        .then((res)=>{
            if (res) {
                alert.show('Profile updated success');
            }
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
                                    <h2>Profile Page</h2>
                                </div>
                                <div className="page-bc">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#"> <i
                                                        className="fas fa-home "></i>Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a
                                                    href="#">Profile Page</a></li>
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
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-9">
                            <form method="post" onSubmit={handleProfile}>
                                <div className="login-detalis pt-40 pr-40 pl-40 pb-40">
                                    <div className="login-input">
                                        <input type="text" value={userData.name} onChange={inputHandler} placeholder="Enter your name." name="name" />
                                        <input type="email" value={userData.email} onChange={inputHandler} placeholder="Enter your email...." name="email" />
                                        <input type="password" value={userData?.password} onChange={inputHandler} placeholder="Enter your Password" name="password"/>
                                        <input type="text" value={userData.address} onChange={inputHandler} placeholder="Enter your address" name="address" />
                                        <input type="text" value={userData.phone} onChange={inputHandler} placeholder="Enter your phone" name="phone" />
                                    </div>                 
                                    <div className="login-button text-center pt-30">
                                        <button type="submit" className="btn btn-success">Update</button>
                                    </div>
                                    <div className="login-information pt-25">
                                        <div className="remember-me">
                                            <input type="checkbox" id="checkbox-1"/><label htmlFor="checkbox-1">Remember Me</label>
                                            <span className="float-right">Forgot <span>password?</span></span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>           
        </div>
    );
}

export default Profile;