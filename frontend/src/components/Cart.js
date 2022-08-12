import Header from './Header';
import Footer from './Footer';
import { getUserCart, removeCartItem, deleteCart } from '../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {val} from '../Reusable';

function Cart() {

    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.getCartReducer.cartData);

    const fetchData = async() => {
        dispatch(getUserCart());
    }

    const cartTotal = cartData?.products?.reduce((total, obj) => obj.price*obj.quantity + total,0);
    
    useEffect(() => {
        fetchData();
    },[cartData]);

    const removeOne = (cid,pid) => {
        const final = {user:val,productId:pid}
        dispatch(removeCartItem(cid,final));
    }

    const removeAll = (id) => {
        dispatch(deleteCart(id));
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
                                    <h2>Cart Page</h2>
                                </div>
                                <div className="page-bc">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#"> <i
                                                        className="fas fa-home "></i>Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a
                                                    href="#">Cart Page</a></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-area product-detalis-page cart-page-area  pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="cart-table table-responsive">
                                <table className="table table-bordered text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Unit Price</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {cartData?.products?.length == 0 ? <tr>No product in the cart</tr> : ''}  
                                      {cartData?.products?.map(post=>{  
                                       return(   
                                        <tr key={post._id}>
                                            <td>{post.productId}</td>
                                            <td>{post.name}</td>
                                            <td>{'image'}</td>
                                            <td><input className="qty" value={post.quantity} type="number" min="1" name="quantity" /> </td>
                                            <td><span>{post.price}</span></td>
                                            <td><span>{post.price * post.quantity}</span></td>
                                            <td>
                                                <button onClick={()=>{removeOne(cartData._id,post.productId)}} type="button" className="btn btn-danger">Remove</button>
                                            </td>
                                        </tr>  
                                       );
                                      })} 
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="7">
                                                <div className="table-button text-left">
                                                    <button type="button" className="btn btn-success"><Link to={`/checkout`}>CHECKOUT</Link></button>
                                                    <button onClick={()=>{removeAll(cartData._id)}} type="button" className="btn btn-danger" style={{float: "right"}}>DELETE CART</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div className="product-cart pt-35">
                        <div className="row justify-content-center justify-content-lg-start">
                            <div className="col-xl-4 col-lg-4 col-md-8 col-sm-9 col-12">
                                
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-8 col-sm-9 col-12">
                                <div className="cart-wrapper pl-20 pt-30 pr-20 pb-30 mt-50 mb-50 mt-lg-0 mb-lg-0">
                                    <div className="section-title">
                                        <h6>
                                            Discount Code
                                        </h6>
                                    </div>
                                    <div className="country pt-15 pb-20">
                                        <span className="pb-10">Enter your coupon code if you have one.</span>
                                        <input type="text" />
                                    </div>
                                    <div className="table-button d-flex justify-content-end ">
                                        <a href="#" className="b-btn  pt-15 pb-15 pr-30 pl-30 ">APPLY</a>
                                    </div>

                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-8 col-sm-9 col-12">
                                <div className="cart-wrapper pl-20 pt-30 pr-20 pb-50">
                                    <div className="cart-price-area text-right">
                                        <p>Subtotal <span className="d-inline-block">$ {cartTotal}</span></p>
                                        <p>Grand Total  <span className="d-inline-block">$ {cartTotal}</span></p>
                                    </div>

                                    <div className="table-button d-flex justify-content-end pt-20">
                                        <a href="#" className="b-btn  pt-20 pb-20 pr-50 pl-50 ">PROCED TO CHECKOUT</a>
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

export default Cart;