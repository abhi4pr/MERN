import Aheader from './Aheader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import * as Constants from '../../Constants';

function Orderdetail() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [getCategory, setCategory] = useState([]);
    
    const [inputField , setInputField] = useState({
        name: '',
        email:'',
        address: '',
        zip:'',
        city: '',
        country:'',
        phone: '',
        shippingAddress: '',
        status:'',
        dateOrdered: '',
        orderItems: [],
        totalPrice: ''
    });

    const fetchData = async() => {

        var data2 = await Constants.GetAPI(`getsingleorder/${id}`, null);
        setInputField({
            name:data2.user.name,
            email:data2.user.email,
            address:data2.user.address,
            zip:data2.zip,
            city:data2.city,
            country:data2.country,
            phone:data2.phone,
            shippingAddress:data2.shippingAddress,
            status:data2.status,
            dateOrdered:data2.dateOrdered,
            orderItems:data2.orderItems,
            totalPrice:data2.totalPrice
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

    const inputHandler = (e) =>{
        setInputField({...inputField, [e.target.name]: e.target.value});
    }

    const handleOrder = async(event) => {
        event.preventDefault();
        
        var data = await Constants.PutAPI(`editorder/${id}`, inputField.status)
        if (data) {
            navigate('/admin/orders');
        }
    }

    return (
      <div>  
        <Aheader />
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link to={`/admin/dashboard`} className="nav-link">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            <Link to={`/admin/orders`} className="nav-link">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Orders
                            </Link>
                            <Link to={`/admin/users`} className="nav-link">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Users
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsecategory" aria-expanded="false" aria-controls="collapsecategory">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Categories
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapsecategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link to={`/admin/addcategory`} className="nav-link">Add New</Link>
                                    <Link to={`/admin/categories`} className="nav-link">List</Link>
                                </nav>
                            </div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseproducts" aria-expanded="false" aria-controls="collapseproducts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Products
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseproducts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={`/admin/addproduct`} className="nav-link">Add New</Link>
                                <Link to={`/admin/products`} className="nav-link">List</Link>
                            </nav>
                            </div>
                                                                
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        Start Bootstrap
                    </div>
                </nav>
            </div>

            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Order Detail</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Order Detail</li>
                        </ol>
                        <div className="row">
                        
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                                Order Detail
                            </div>
                            <div className="card-body">
                                <form className="form-horizontal" encType="multipart/form-data" method="post" onSubmit={handleOrder}>
                                    
                                <div className="row">
                                    <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-2" htmlFor="email">Name:</label>
                                            <div className="col-sm-10">
                                                <input type="text" disabled value={inputField.name} className="form-control" id="email" placeholder="Enter name" required/>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-6" htmlFor="pwd">Email:</label>
                                            <div className="col-sm-10">          
                                                <input type="text" disabled value={inputField.email} className="form-control" id="pwd" placeholder="Enter description" />
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-2" htmlFor="email">Address:</label>
                                            <div className="col-sm-10">
                                                <input type="text" disabled value={inputField.address} className="form-control" id="email" placeholder="Enter name" name="name" required/>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-6" htmlFor="pwd">Zip code:</label>
                                            <div className="col-sm-10">          
                                                <input type="text" disabled value={inputField.zip} className="form-control" id="pwd" placeholder="Enter description" name="description"/>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-2" htmlFor="email">City:</label>
                                            <div className="col-sm-10">
                                                <input type="text" disabled value={inputField.city} className="form-control" id="email" placeholder="Enter name" name="name" required/>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-6" htmlFor="pwd">Country:</label>
                                            <div className="col-sm-10">          
                                                <input type="text" disabled value={inputField.country} className="form-control" id="pwd" placeholder="Enter description" name="description"/>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-2" htmlFor="email">Phone:</label>
                                            <div className="col-sm-10">
                                                <input type="text" disabled value={inputField.phone} className="form-control" id="email" placeholder="Enter name" name="name" required />
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-6" htmlFor="pwd">Shipping Address:</label>
                                            <div className="col-sm-10">          
                                                <input type="text" disabled value={inputField.shippingAddress} className="form-control" id="pwd" placeholder="Enter description" name="description"/>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-2" htmlFor="email">Status:</label>
                                            <div className="col-sm-10">
                                            <select className="form-select" required name="status" onChange={inputHandler}>
                                                <option selected={true} value={inputField.status}>{inputField.status}</option> 
                                                <option value="Pending">Pending</option>
                                                <option value="Cancalled">Cancelled</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="control-label col-sm-6" htmlFor="pwd">Order Date:</label>
                                            <div className="col-sm-10">          
                                                <input type="text" disabled value={inputField.dateOrdered} className="form-control" id="pwd" placeholder="Enter description" name="description"/>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{marginTop:"25px"}}>
                                    <div className="col-md-11" style={{margin:"0 0 0 10px"}}>
                                        <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Sub total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {inputField.orderItems?.length && inputField.orderItems.map(share =>{
                                          return(
                                            <tr key={share._id}>
                                                <td>{share.product?._id}</td>
                                                <td>{share.product?.name}</td>
                                                <td>{share.quantity}</td>
                                                <td>{share.product?.price}</td>
                                                <td>{share.quantity * share.product?.price}</td>
                                            </tr>
                                          )
                                        })}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Total:-</td>
                                            <td>{ inputField.totalPrice }</td>
                                        </tr>    
                                        </tbody>
                                        </table>
                                    </div>
                                    </div>    
                                    
                                    <div className="form-group" style={{marginTop:"25px"}}>        
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button type="submit" className="btn btn-success">Submit</button>
                                        <Link to={`/admin/orders`} style={{marginLeft:"25px"}}><button type="button" className="btn btn-warning">Cancel</button></Link>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>  
      </div>     
    );
}

export default Orderdetail;