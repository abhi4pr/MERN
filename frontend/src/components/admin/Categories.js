import Aheader from './Aheader';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import * as Constants from '../../Constants';
import { useAlert } from 'react-alert';

function Categories() {

    const alert = useAlert();
    const [getCatArray , setCatArray] = useState([]);

    const fetchData = async() => {
        var data = await Constants.GetAPI('getallcategory', null);
        setCatArray(data)
    }
    
    useEffect(() => {
        fetchData();
    },[]);

    const deleteCategory = async(_id) => {
        var data = await Constants.DeleteAPI(`deletecategory/${_id}`, null)
        if(data){
            fetchData();
            alert.show('category deleted success');
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
                        <h1 className="mt-4">Category</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Category</li>
                        </ol>
                        <div className="row">
                        
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                                Category List
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Icon</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {getCatArray?.length && getCatArray.map(share => {
                                      return(
                                        <tr key={share._id}>

                                        <div className="modal fade" id={'myModal-'+share._id} role="dialog">
                                            <div className="modal-dialog modal-sm">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                </div>
                                                <div className="modal-body">
                                                <p style={{textAlign:"center"}}>Are you sure to delete ?</p>
                                                <input type="hidden" value={share._id} />
                                                </div>
                                                <div className="modal-footer">
                                                <button onClick={()=>deleteCategory(share._id)} type="button" className="btn btn-success yess" data-dismiss="modal">Yes</button>
                                                <button type="button" className="btn btn-danger noo" data-dismiss="modal">No</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                            <td>{share._id}</td>
                                            <td>{share.name}</td>
                                            <td>{share.icon}</td>
                                            <td><Link to={`/admin/editcategory/${share._id}`} className="nav-link">Edit</Link></td>
                                            <td><button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target={'#myModal-'+share._id}>Delete</button></td>
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

export default Categories;