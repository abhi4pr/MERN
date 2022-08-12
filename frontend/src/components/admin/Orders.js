import Aheader from './Aheader';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import * as Constants from '../../Constants';

function Orders() {
    
    const [getOrderArray , setOrderArray] = useState([]);

    const fetchData = async() => {
        var data = await Constants.GetAPI('getallorder', null);
        setOrderArray(data)
    }
    
    useEffect(() => {
        fetchData();
    },[]);

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
                        <h1 className="mt-4">Orders</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Orders</li>
                        </ol>
                        <div className="row">
                        
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                                Orders List
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Detail</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {getOrderArray?.length && getOrderArray.map(share => {
                                      return(
                                        <tr key={share._id}>
                                            <td>{share._id}</td>
                                            <td>{share.user.name}</td>
                                            <td>{share.user.email}</td>
                                            <td>{share.phone}</td>
                                            <td>{share.dateOrdered}</td>
                                            <td>{share.status}</td>
                                            <td><Link to={`/admin/orderdetail/${share._id}`} className="nav-link">Detail</Link></td>
                                        </tr>
                                      )
                                    })}
                                    </tbody>
                                </table>                                    
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

export default Orders;