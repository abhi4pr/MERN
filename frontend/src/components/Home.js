import Header from './Header';
import Footer from './Footer';
import { getProducts } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Home() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.getProductsReducer.products);

    const fetchData = async() => {
        dispatch(getProducts());
    }
    
    useEffect(() => {
        fetchData();
    },[]);

    return (
      <div>
        <Header />
            <div className="product-collection-area product-collection-area-2 product-collection-4 pt-50 pb-50 pr-65 pl-65">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="collection-wrapper second-collection pl-50 pt-50 " style={{backgroundImage: "url(img/product/product-bg-14.png)"}}>
                                <span>15</span>
                                <div className="parcent-off d-inline-block">
                                    <span>% <span>OFF</span> </span>
                                </div>
                                <h6>Cheap Shirts</h6>
                                <a href="shop-detalis-page.html" >when you buy 3 or more.</a>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="collection-wrapper first-collection  pt-55 " style={{backgroundImage: "url(img/product/product-bg-14.png)"}}>
                                <span>Up To 75%</span>
                                <p className="pr-40">Get Discount Info
                                    Men's T-shirt Summer
                                    Fashion - 2019
                                </p>
                                <a href="shop-detalis-page.html" >Buy Now <i className="fa fa-angle-right" aria-hidden="true"></i> </a>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="collection-wrapper third-collection  pt-40 pl-30" style={{backgroundImage: "url(img/product/product-bg-14.png)"}}>
                                
                                <h4>Summer Style
                                    The Fashionisto</h4>
                            <ul>
                                <li>New in Store</li>
                            </ul>
                                
                                <a href="shop-detalis-page.html">Buy Now <i className="fa fa-angle-right" aria-hidden="true"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="product-area product-area-2  product-area-8 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-12">
                            <div className="section-title">
                                <h3>
                                    Our Products
                                </h3>
                            </div>
                        </div>
                                
                    </div>
                    <hr/>
                </div>
                <div className="container">
                <div className="row">
                  {products.slice(0, 4).map(share => {
                    return(
                    <div key={share._id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                        <div className="product-wrapper mb-30">
                            <div className="product-img ">
                                <img src={share.image} alt="product" height="150px" width="250px"/>
                                <ul className="social-icon">
                                </ul>
                            </div>
                            <div className="flip-box">
                                <div className="product-detalis pt-15 pl-20 pr-20 pb-25">
                                    <span>{share.category.name}</span>
                                    <h6><Link to={`/singleproduct/${share._id}`}>{share.name}</Link></h6>
                                    <div className="price-color ">
                                        <div className="price d-inline-block">
                                            <span>${share.price}</span>
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
                                    <span>{share.category.name}</span>
                                    <h6><Link to={`/singleproduct/${share._id}`}>{share.name}</Link></h6>
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
                    )
                  })}
                </div>
            </div>
            </div>
    
            <div className="artical-area pt-125  pb-120" style={{marginTop:"25px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-11 offset-xl-1 offset-md-1 offset-sm-1">
                            <div className="artical-img pb-20">
                                <img src="img/icon/quotation-mark.png" alt="quot"/>
                            </div>
                            <div className="artical-text">
                                <p>Pellentesque vel dolor consectetur, vulputate eros vitae, molestie felis. Vivamus ornare
                                    augue lorem at vulputate dolor consectetur vulputate leo.</p>
                            </div>
                            <hr/>
                            <div className="author-detalis d-flex pt-25">
                                <div className="author-img">
                                    <img src="img/team/team-member-1.png" alt=""/>
                                </div>
                                <div className="author-info ml-15 pt-15">
                                    <h5>Masum Billa Munna</h5>
                                    <span>Exclusive at UX/UI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="blog-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-title ">
                                <h3>
                                    Letest Blog
                                </h3>
                                <hr/>
                            </div>
                        </div>
                    </div>
            
                </div>
                <div className="container pl-0 pr-0">
                    <div className="custom-row">
                        <div className="blog-active pt-30" style={{display:"flex"}}>
                            <div className="col-xl-3">
                                <div className="blog-wrapper">
                                    <div className="blog-img">
                                        <img src="img/blog/blog-3.png" alt="product"/>
                                    </div>
                                    <div className="blog-detalis">
                                        <span>Admin By <span>- Alamgir Joy</span></span>
                                        <a href="shop-detalis-page.html">Nulla in consectetur ligula. In in cursus sapien.</a>
                                        <p>In vitae convallis diam. Nulla pellentesqu nulla sed tellus maximus molestie. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="blog-wrapper">
                                    <div className="blog-img">
                                        <img src="img/blog/blog-4.png" alt="product"/>
                                    </div>
                                    <div className="blog-detalis">
                                        <span>Admin By <span>- Alamgir Joy</span></span>
                                        <a href="shop-detalis-page.html">Nulla in consectetur ligula. In in cursus sapien.</a>
                                        <p>In vitae convallis diam. Nulla pellentesqu nulla sed tellus maximus molestie. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="blog-wrapper">
                                    <div className="blog-img">
                                        <img src="img/blog/blog-5.png" alt="product"/>
                                    </div>
                                    <div className="blog-detalis">
                                        <span>Admin By <span>- Alamgir Joy</span></span>
                                        <a href="shop-detalis-page.html">Nulla in consectetur ligula. In in cursus sapien.</a>
                                        <p>In vitae convallis diam. Nulla pellentesqu nulla sed tellus maximus molestie. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="blog-wrapper">
                                    <div className="blog-img">
                                        <img src="img/blog/blog-6.png" alt="product"/>
                                    </div>
                                    <div className="blog-detalis">
                                        <span>Admin By <span>- Alamgir Joy</span></span>
                                        <a href="shop-detalis-page.html">Nulla in consectetur ligula. In in cursus sapien.</a>
                                        <p>In vitae convallis diam. Nulla pellentesqu nulla sed tellus maximus molestie. </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="brand-area">
                <div className="container">
                    <div className="brand-active" style={{display: "flex",margin:"90px 0px 30px 0px"}}>
                        <div className="single-brand" style={{marginRight: "30px"}}>
                            <div className="brand-img">
                                <img src="img/brand/brand1.png" alt="brand"/>
                            </div>
                        </div>
                        <div className="single-brand" style={{marginRight: "30px"}}>
                            <div className="brand-img">
                                <img src="img/brand/brand2.png" alt="brand"/>
                            </div>
                        </div>
                        <div className="single-brand" style={{marginRight: "30px"}}>
                            <div className="brand-img">
                                <img src="img/brand/brand3.png" alt="brand"/>
                            </div>
                        </div>
                        <div className="single-brand" style={{marginRight: "30px"}}>
                            <div className="brand-img">
                                <img src="img/brand/brand4.png" alt="brand"/>
                            </div>
                        </div>
                        <div className="single-brand" style={{marginRight: "30px"}}>
                            <div className="brand-img">
                                <img src="img/brand/brand1.png" alt="brand"/>
                            </div>
                        </div>
                        <div className="single-brand" style={{marginRight: "30px"}}>
                            <div className="brand-img">
                                <img src="img/brand/brand2.png" alt="brand"/>
                            </div>
                        </div>
                        <div className="single-brand" style={{marginRight: "30px"}}>
                            <div className="brand-img">
                                <img src="img/brand/brand3.png" alt="brand"/>
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>
    
            <div className="subscribe-area subscribe-area-2 subscribe-area-8 pt-20 pb-30 ">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-12">
                            <div className="discount-text ">
                                <p>Get Discount 30% Off !</p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-12">
                            <form action="#">
                                <input type="email" placeholder="Enter Your Email..."/>
                                <button>Subscribe</button>
                            </form>
                
                        </div>
                    </div>
                </div>
            </div>
            
        <Footer />        
      </div>
    );
}

export default Home;