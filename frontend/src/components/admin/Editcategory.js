import Aheader from './Aheader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import * as Constants from '../../Constants';

function Editcategory() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [inputField , setInputField] = useState({
        name: '',
        icon: ''
    });

    const fetchData = async() => {
        var data = await Constants.GetAPI(`getsinglecategory/${id}`, null);
        setInputField({
            name:data.name,
            icon:data.icon
        })
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const inputHandler = (e) =>{
        setInputField({...inputField, [e.target.name]: e.target.value});
    }

    const handleCategory = async(event) => {
        event.preventDefault();
        const result = await Constants.PutAPI(`editcategory/${id}`, inputField);
        if(result){
            navigate('/admin/categories');   
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
                        <h1 className="mt-4">Edit Category</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Edit Category</li>
                        </ol>
                        <div className="row">
                        
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                                Edit Category
                            </div>
                            <div className="card-body">
                                <form className="form-horizontal" method="post" onSubmit={handleCategory}>
                                    <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="email">Name:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={inputField.name} onChange={inputHandler} placeholder="Enter name" name="name" required />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="pwd">Icon:</label>
                                    <div className="col-sm-10">          
                                        <input type="text" className="form-control" value={inputField.icon} onChange={inputHandler} placeholder="Enter icon code" name="icon" required />
                                    </div>
                                    </div>
                                    <div className="form-group">        
                                    
                                    </div>
                                    <div className="form-group" style={{marginTop:"25px"}}>        
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button disabled={!inputField.name} type="submit" className="btn btn-success">Submit</button>
                                        <Link to={`/admin/categories`} style={{marginLeft:"25px"}}><button type="button" className="btn btn-warning">Cancel</button></Link>
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

export default Editcategory;