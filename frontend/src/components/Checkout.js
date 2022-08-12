import Header from './Header';
import Footer from './Footer';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../actions/cartAction';
import { placeOrder } from '../actions/orderAction';
import {val} from '../Reusable';

function Checkout() {

    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.getCartReducer.cartData);

    const [inputField , setInputField] = useState({
        shippingAddress: '',
        city: '',
        zip: '',
        country: '',
        phone: ''
    });

    const cartTotal = cartData?.products?.reduce((total, obj) => obj.price*obj.quantity + total,0);

    const fetchData = async() => {
        dispatch(getUserCart());
    }
    
    useEffect(() => {
        fetchData();
    },[]);

    const inputHandler = (e) =>{
        setInputField({...inputField, [e.target.name]: e.target.value});
    }

    const checkHandle = (event) => {
        event.preventDefault();
        
        var changeKey = cartData.products.map((item) => {
            return {
              product: item.productId,
              quantity: item.quantity
            };
          });
        var productData = {orderItems:changeKey};
        var userData = {user:val,...inputField};
        var finalData = {...productData,...userData};

        dispatch(placeOrder(finalData));
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
                                    <h2>Checkout Page</h2>
                                </div>
                                <div className="page-bc">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#"> <i
                                                        className="fas fa-home "></i>Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a
                                                    href="#">Checkout Page</a></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row" style={{marginTop: "50px"}}>
                
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                    <div className="login-page-area pt-50" style={{marginTop: "-50px"}}>
                        <form method="post" onSubmit={checkHandle}>
                        <div className="login-detalis pt-40 pr-40 pl-40 pb-40">
                            <div className="login-input">
                                <input type="text" onChange={inputHandler} placeholder="Enter your shipping addres" name="shippingAddress"/>
                                <input type="text" onChange={inputHandler} placeholder="Enter your city" name="city"/>
                                <input type="number" onChange={inputHandler} placeholder="Enter your zip code" name="zip"/>
                                <input type="text" onChange={inputHandler} placeholder="Enter your country" name="country"/>
                                <input type="number" onChange={inputHandler} placeholder="Enter your phone number" name="phone"/>
                            </div>                 
                            <div className="login-button text-center pt-30">
                                <button disabled={!inputField.phone || !inputField.shippingAddress} type="submit" className="btn btn-success">Place Order</button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4">
                        <div className="cart-table table-responsive">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cartData?.products?.length == 0 ? 'cart is empty' : ''}
                                 
                                 {cartData?.products?.map(post=>{
                                  return(
                                    <tr key={post._id}>
                                        <td>{post.name}</td>
                                        <td>{'image'}</td>
                                        <td>{post.quantity} </td>
                                        <td><span>{post.price}</span></td>
                                        <td><span>{post.price * post.quantity}</span></td>
                                    </tr>
                                  ); 
                                 })}     
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="7">
                                            <div className="table-button text-left">
                                                <button type="button" className="btn btn-success">TOTAL:-</button>
                                                <button type="button" className="btn btn-danger" style={{float: "right"}}>$ {cartTotal}</button>
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
                    </div>    
                </div>
            </div>

            <Footer/>           
        </div>
    );
}

export default Checkout;