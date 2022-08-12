import Header from './Header';
import Footer from './Footer';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryData } from '../actions/categoryAction';
import {Link, useSearchParams, useParams} from 'react-router-dom';

function Category() {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("categories")
    const catProducts = useSelector((state) => state.getCategoryReducer.catProducts);

    const fetchData = async() => {
        dispatch(getCategoryData(query))
    }
    
    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div>
            <Header/>
            <div className="page-title-area pt-130 pb-120 " style={{backgroundImage: "url(img/bg/chechout-page-bg.jpg)"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page-titel-detalis  ">
                                <div className="page-title position-relative">
                                    <h2>Category Page</h2>
                                </div>
                                <div className="page-bc">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#"> <i
                                                        className="fas fa-home "></i>Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><a
                                                    href="#">Category Page</a></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-area  product-shop-page pt-50 ">
                <div className="container">
                    <div className="row">
                    <div className="col-xl-12 pb-50">
                        <div className="toolbar-navi d-inline-block ">
                            <div className="toolbar d-flex">
                                <div className="view-as d-flex mr-30">
                                    <span>View as:</span>
                                    <div className="view-as-button ml-10">
                                        <a href="#"><i className="fab fa-microsoft"></i></a>
                                        <a href="#"><i className="fas fa-list-ul"></i></a>
                                        
                                    </div>
                                    
                                </div>
                                <div className="sort-by d-flex mr-30">
                                    <span className="mr-10">Sort by:</span>
                                    <div className="sort-by-option position-relative">
                                        <button id="sort-option" className="sort-option">Most Recent <i className="fas fa-caret-down"></i></button>

                                        <div id="sub-sort-option" className="sub-sort-option  position-absolute " >
                                        
                                        </div>
                                    </div>

                                </div>
                                <div className="show-option d-flex">
                                    <span className="mr-10">Show:</span>
                                    <div className="show-option-list position-relative">
                                        <button id="show-option-numbe" className="show-option-number">11 <i className="fas fa-caret-down"></i></button>
                                        <div id="sub-show-option" className="sub-show-option">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav className="construction-pagination float-right" aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" href="#"><i className="fas fa-chevron-left"></i></a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">2</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">3</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#"><i className="fas fa-chevron-right"></i></a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    </div>
                    
                    <div className="row">
                      {catProducts.map(post=>{
                       return(     
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12" key={post._id}>
                            <div className="product-wrapper mb-30">
                                <div className="product-img ">
                                    <img src={post.image} alt="product" height="150px"/>
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
                      );  
                     })}  
                    </div>    

                    {catProducts.length == 0 ? 'No products from this category' : ''} 

                </div>
            </div>

            <Footer/>           
        </div>
    );
}

export default Category;