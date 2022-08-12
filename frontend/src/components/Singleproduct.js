import Header from './Header';
import Footer from './Footer';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../actions/productAction';
import { addToCart } from '../actions/cartAction';
import { getProducts } from '../actions/productAction';
import {useParams, Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {val} from '../Reusable';

function Singleproduct() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {id} = useParams();
    const single = useSelector((state) => state.getProductsReducer.single);
    const products = useSelector((state) => state.getProductsReducer.products);

    const fetchData = async() => {
        dispatch(getProducts())
        dispatch(getProductDetail(id));
    }
    
    useEffect(() => {
        fetchData();
    },[id]);

    const addToCartForm = (event) => {
        event.preventDefault();
        dispatch(addToCart({
            productId:single._id,
            name:single.name,
            price:single.price,
            quantity:1,
            user: val
        }))
        .then((res) => {
            if(res){
                alert.show('Item added to cart');
            }else{
                alert.show('You are not logged in');    
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
                                    <h2>Product detail Page</h2>
                                </div>
                                <div className="page-bc">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#"> <i
                                                        className="fas fa-home "></i>Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a
                                                    href="#">Product detail Page</a></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-area product-shop-page  product-list-page product-detalis-page  pt-50 ">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8 col-11 col offset-xl-1 offset-lg-1">
                            <div className=" slider-nav-thumbnails product-list-active d-md-none">
                                <a className="active"><img src="assets/img/product/product-62.png" alt=""/></a>
                                <a><img src="assets/img/product/product-63.png" alt=""/></a>
                                <a><img src="assets/img/product/product-64.png" alt=""/></a>
                                <a><img src="assets/img/product/product-65.png" alt=""/></a>
                                <a><img src="assets/img/product/product-63.png" alt=""/></a>
                            </div>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-6 col-sm-12">
                            <div className="product-list-slider">
                                <div className="product-img">
                                    <img src={single.image} alt=""/>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                            <div className="product-wrapper product-wrapper-2 pt-60">
                                <div className="product-detalis">
                                    <h6>{single.name}</h6>
                                    <ul className="rating d-flex pl-0 pt-10 pb-10">
                                        <li><i className="far fa-star" aria-hidden="true"></i></li>
                                        <li><i className="far fa-star" aria-hidden="true"></i></li>
                                        <li><i className="far fa-star" aria-hidden="true"></i></li>
                                        <li><i className="far fa-star" aria-hidden="true"></i></li>
                                        <li><i className="far fa-star" aria-hidden="true"></i></li>
                                    </ul>
                                    <div className="product-interested pb-20">
                                        <span className="pr-10">Category:</span>
                                        <span>{single?.category?.name}</span>
                                    </div>
                                    <div className="price d-inline-block pb-25">
                                        <span>${single.price}</span>
                                        <del>$999</del>
                                    </div>
                                    <div className="product-number d-flex pb-30">
                                        <div className="quty">
                                            <span className="pr-10">QTY:</span>
                                            <input className="qty" type="number" value={1} />                                     
                                        </div>
                                        <div className="availabillity pl-20">
                                            <span>Availability : <span className="pl-5">IN STOCK</span> </span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="page-share-icon  d-flex pt-25 pb-20">
                                        <span>Share:</span>
                                        <ul className="icon pl-15  d-flex" >
                                        <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                                        <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fab fa-skype"></i></a></li>
                                        <li><a href="#"><i className="fas fa-rss"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="cart-view d-flex">
                                        <div className="cart ">
                                            <form method="POST" onSubmit={addToCartForm}>
                                                <input type="hidden" name="productId"/>
                                                <input type="hidden" name="name"/>
                                                <input type="hidden" name="price"/>                                            
                                                <button type="submit" className="btn btn-success">Add To Cart</button> 
                                            </form>
                                        </div>
                                    <ul className="social-icon d-flex align-items-center pl-20">
                                        <li><a tabIndex="0"><i className="fa fa-retweet" aria-hidden="true"></i></a></li>
                                        <li><a tabIndex="0"><i className="far fa-heart" aria-hidden="true"></i></a></li>
                                        <li><a className="popup-img" ><i className="fa fa-eye" aria-hidden="true"></i></a></li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="description-area pt-10">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="description-tab pt-50 pl-50 pr-50 pb-40">
                                <nav>
                                <div className="nav nav-tabs " id="approach-tabs" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-description-tab" data-toggle="tab" href="#nav-description" role="tab" aria-controls="nav-description" aria-selected="true">description</a>
                                    <a className="nav-item nav-link" id="nav-comment-tab" data-toggle="tab" href="#nav-comment" role="tab" aria-controls="nav-comment" aria-selected="false">COMMENTS</a>
                                    <a className="nav-item nav-link" id="nav-review-tab" data-toggle="tab" href="#nav-review" role="tab" aria-controls="nav-review" aria-selected="false">review</a>
                                </div>
                                </nav>
                                <div className="tab-content mt-25 " id="nav-tabContents">
                                <div className="tab-pane  active " id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">
                                    <p>{single.description}</p>
                                    
                                </div>
                                <div className="tab-pane " id="nav-comment" role="tabpanel" aria-labelledby="nav-comment-tab">
                                    <p>MOVIE STAR – Online Movie,Video & TV Show PSD Template is a the best design for 2017. any kinds of online video Template Based on Bootstrap, <br/>
                                        MOVIE STAR – Online Movie,Video & TV Show PSD Template is a the best design for 2017. any kinds of online video Template Based on Bootstrap,e.</p>
                                    
                                </div>
                                <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">
                                    <p>MOVIE STAR – Online Movie,Video & TV Show PSD Template is a the best design for 2017. any kinds of online video Template Based on Bootstrap, <br/>
                                        MOVIE STAR – Online Movie,Video & TV Show PSD Template is a the best design for 2017. any kinds of online video Template Based on Bootstrap, </p>
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-area pt-50 ">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-title">
                                <h3>
                                    Our Products
                                </h3>
                            </div>
                        </div>
                    </div>
                    <hr/>

                </div>
                <div className="container" style={{marginBottom:"50px"}}>
                    <div className="row custompar">
                        {products.length && products.map(post=>{
                          return(  
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 customchild" style={{marginTop: "35px"}}>
                                <div className="product-wrapper">
                                    <div className="product-img ">
                                        <img src={post.image} alt="product" height="150px"/>
                                        <ul className="social-icon">
                                            
                                        </ul>
                                    </div>
                                    <div className="flip-box">
                                        <div className="product-detalis pt-15 pl-20 pr-20 pb-25">
                                            <span>{post?.category?.name}</span>
                                            <h6><Link to={`/singleproduct/${post._id}`}>{post.name}</Link></h6>
                                            <div className="price-color ">
                                                <div className="price d-inline-block">
                                                    <span>${post.price}</span>
                                                    <del>$999</del>
                                                </div>
                                                <div className="color float-right d-flex">
                                                    <span>Color:</span>
                                                    <div className="color-set">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-detalis product-detalis-2 pt-15 pl-20 pr-20 pb-25">
                                            <div className="product-info">
                                                <span>{post?.category?.name}</span>
                                            <h6><Link to={`/singleproduct/${post._id}`}>{post.name}</Link></h6>
                                            <div className="buy-info ">
                                                <div className="cart float-left">
                                                    <form method="post">
                                                        <input type="hidden" name="productId"/>
                                                        <input type="hidden" name="name"/>
                                                        <input type="hidden" name="price"/>                                            
                                                        <button type="submit" className="btn btn-success">Add To Cart</button> 
                                                    </form>                                            
                                                </div>
                                                <ul className="rating d-flex">
                                                    <li><i className="far fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="far fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="far fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="far fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="far fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          );  
                        })}  
                    </div>
                </div>
                </div>
            <Footer/>           
        </div>
    );
}

export default Singleproduct;