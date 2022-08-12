import Header from './Header';
import Footer from './Footer';
import { getOrders } from '../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';

function Myorders() {

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.getOrderReducer.orders);

    const fetchData = async() => {
        dispatch(getOrders());
    }
    
    useEffect(() => {
        fetchData();
    },[]);

    return (
      <div>
        <Header />
            <div className="page-title-area pt-130 pb-120 " style={{backgroundImage: "url(img/bg/chechout-page-bg.jpg)"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page-titel-detalis  ">
                                <div className="page-title position-relative">
                                    <h2>My orders Page</h2>
                                </div>
                                <div className="page-bc">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#"> <i
                                                        className="fas fa-home "></i>Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a
                                                    href="#">My orders Page</a></li>
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
                            {orders.map(share=>{
                              return(  
                                <div className="panel panel-info" key={share._id}>
                                    <div className="panel-heading">Date:- {share.dateOrdered}</div>
                                    <div className="panel-body">
                                        Total:- $ {share.totalPrice} <br/>
                                        Status:- {share.status} <br/>

                                        <table className="table table-bordered text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Unit Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               {share.orderItems.map(yash=>{
                                                  return( 
                                                    <tr key={yash._id}>
                                                        <td>{yash.product.name}</td>
                                                        <td><img src={yash.product.image} width="100" height="100"/></td>
                                                        <td>{yash.quantity} </td>
                                                        <td><span>{yash.product.price}</span></td>
                                                    </tr>
                                                  );
                                               })}                         
                                            </tbody>
                                        </table>
                                    </div>
                                    <hr/>
                                </div>
                              );
                            })}                            
                        </div>

                        {orders.length == 0 ? 'No orders yet' : ''}

                    </div>
                    <div className="product-cart pt-35">
                        <div className="row justify-content-center justify-content-lg-start">
                            <div className="col-xl-4 col-lg-4 col-md-8 col-sm-9 col-12">
                                
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-8 col-sm-9 col-12">
                                
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-8 col-sm-9 col-12">
                                
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
            
        <Footer />        
      </div>
    );
}

export default Myorders;