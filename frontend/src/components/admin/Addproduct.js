import Aheader from './Aheader';
import { Link, useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import * as Constants from '../../Constants';
import { useAlert } from 'react-alert';

function Addproduct() {

    const alert = useAlert();
    const navigate = useNavigate();
    const [getCategory, setCategory] = useState([]);
    
    const [inputField , setInputField] = useState({
        name: '',
        description:'',
        price: '',
        brand:'',
        category: '',
        countInStock:'',
        image: ''
    });

    const fetchData = async() => {
        var data = await Constants.GetAPI('getallcategory', null);
        setCategory(data)
    }

    useEffect(()=>{
        fetchData();
    },[])

    const inputHandler = (e) =>{
        setInputField({...inputField, [e.target.name]: e.target.value});
    }

    const imageHandler = (e) =>{
        setInputField({...inputField.image, [e.target.name]: e.target.files[0]})
    }

    const handleProduct = async(event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", inputField.name);
        formData.append("description", inputField.description);
        formData.append("price", inputField.price);
        formData.append("brand", inputField.brand);
        formData.append("category", inputField.category);
        formData.append("countInStock", inputField.countInStock);
        formData.append("image", inputField.image);
        
        var data = await Constants.PostAPI('addproduct', formData)
        if (data) {
            navigate('/admin/products');
            alert.show('added product success');
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
                        <h1 className="mt-4">Add Product</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Add Product</li>
                        </ol>
                        <div className="row">
                        
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                                Add Product
                            </div>
                            <div className="card-body">
                                <form className="form-horizontal" encType="multipart/form-data" method="post" onSubmit={handleProduct}>
                                    <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="email">Name:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" onChange={inputHandler} placeholder="Enter name" name="name" required />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="pwd">Category:</label>
                                    <div className="col-sm-10">          
                                        <select className="form-select" required name="category" onChange={inputHandler}>
                                           <option selected="true" disabled="disabled">Choose Category</option> 
                                           {getCategory.map(share=>
                                                <option key={share._id} value={share._id}>{share.name}</option>
                                           )}
                                        </select>
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="pwd">Brand:</label>
                                    <div className="col-sm-10">          
                                    <input type="text" className="form-control" onChange={inputHandler} placeholder="Enter brand" name="brand" />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="pwd">Price:</label>
                                    <div className="col-sm-10">          
                                    <input type="number" className="form-control" onChange={inputHandler} placeholder="Enter Price" name="price" required/>
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="pwd">Description:</label>
                                    <div className="col-sm-10">          
                                    <input type="text" className="form-control" onChange={inputHandler} placeholder="Enter Description" name="description"/>
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="pwd">Stocks:</label>
                                    <div className="col-sm-10">          
                                    <input type="number" className="form-control" onChange={inputHandler} placeholder="Enter Stocks" name="countInStock" required/>
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="pwd">Image:</label>
                                    <div className="col-sm-10">          
                                    <input type="file" accept="image/*" className="form-control" onChange={imageHandler} placeholder="Select Image" name="image"/>
                                    </div>
                                    </div>
                                    <div className="form-group" style={{marginTop:"25px"}}>        
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button disabled={!inputField.name || !inputField.price} type="submit" className="btn btn-success">Submit</button>
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

export default Addproduct;