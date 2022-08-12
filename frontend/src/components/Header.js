import { Link } from 'react-router-dom';
import {val} from '../Reusable';
import { getCategories } from '../actions/categoryAction';
import { getCartCount } from '../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';

function Header() {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.getCategoryReducer.categories);
    const count = useSelector((state) => state.getCartReducer.count);
    
    const fetchData = async() => {
        dispatch(getCategories());
        dispatch(getCartCount());
    }
    
    useEffect(() => {
        fetchData();
    },[count]);

    return (
      <div>
        <header>
            <div className="header-area header-2 header-5 header-8 pb-5  pl-65 pr-65 pt-30">
                <div className="header-top">
                    <div className="container-fluid">
                        <div className="header-top">
                            <div className="row">
                                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                                    <div className="logo d-none pb-15 mt-15">
                                        <h5><a href="#">Moly </a></h5>
                                    </div>
                                    <ul className="user-info d-flex ">
                                        <li><Link to={`/profile`}> My Account</Link></li>
                                        
                                        <li><Link to={`/cart`}> Cart</Link></li>

                                    </ul>
                                </div>
                                <div className="col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12">
                                    <div className="discount-mess text-left">
                                        <span> <img src="img/icon/parcent.png" alt=""/> Discount off 25% only for <span>Winter Collection !</span> </span>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-4 col-12">
                                    <div className="header-top-right d-flex justify-content-end">
                                        <ul className="language">
                                            {val ? 
                                            <li><a href="#"><img src="img/icon/flag.png" alt="flag"/>Hi! User</a>
                                                <ul className="sub-language">
                                                    <li><Link to={`/profile`}> <img src="img/icon/china.png" alt=""/> Profile</Link></li>     
                                                    <li><Link to={`/myorders`}> <img src="img/icon/china.png" alt=""/> My orders</Link></li>
                                                    <li><Link to={`/logout`}> <img src="img/icon/china.png" alt=""/> Logout</Link></li>
                                                </ul>
                                            </li>
                                            : ''}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="mt-20"/>
                        <div className="header-menu bg-transparent pt-25">
                            <div className="row">
                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-12 offset-xl-0 offset-lg-0 offset-md-5 offset-sm-4 ">
                                    <div className="logo ">
                                      <Link to={`/`}><img src="img/logo/logo.png" alt="moly-logo"/></Link>
                                    </div>
                                </div>
                                <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                                    <div className="main-menu">
                                        <nav id="mobile-menu">
                                            <ul>
                                                <li><Link to={`/`}> Home</Link></li>
                                                <li><a href="#">Categories</a>
                                                    <ul className="sub-menu">
                                                        {categories.map(share=>{
                                                          return(
                                                            <li value={share._id} key={share._id}>
                                                                <form method='GET' action='/category'>
                                                                    <input type="hidden" name="categories" value={share._id} />
                                                                    <input type="submit" value={share.name} />
                                                                </form>
                                                                {/* <Link to={`/category/${share._id}`}>{share.name}</Link> */}
                                                            </li>
                                                          );
                                                        })}
                                                    </ul>
                                                </li>
                                                <li><Link to={`/shop`}> Shop</Link></li>
                                                <li><Link to={`/contact`}> Contact</Link></li>
                                                {val ? '': <li><Link to={`/login`}> Login</Link></li> }
                                                {val ? '': <li><Link to={`/register`}> Register</Link></li> }
                                                <li>
                                                    <form className="navbar-form" role="search" method="GET" action='/search'>
                                                        <div className="input-group">
                                                            <input type="text" name="name" placeholder="Search Products Here....."/>
                                                            <div className="input-group-btn">
                                                                <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-5 col-sm-5 col-12">
                                    <div className="site-info  d-flex justify-content-end">
                                        <div className="search mt-10 position-relative  ">
                                            
                                        </div>
                                        
                                        <div className="cart pt-10 position-relative mr-10">
                                            <Link to={`/cart`}><img src="img/icon/bag.png" alt=""/></Link>
                                            <div className="badge">{count?.items}</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="mobile-menu"></div>
                    </div>
                </div>

            </div>
        </header>
      </div>
    );
}

export default Header;