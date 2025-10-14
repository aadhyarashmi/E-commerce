import React, {Fragment,useEffect} from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from '../layout/MetaData.js';
import {clearErrors, getProduct} from "../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';



const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading,error,products,productCount} = useSelector(state => state.products);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    },[dispatch,error,alert]);

  return (
    <Fragment>
        {loading ? (<Loader />) : <Fragment>
    <MetaData title="E-commerce"/>
    <div className="banner">
        <p>Welcome to E-commerce</p>
        <h1>FIND AMAZING PRODUCTS HERE</h1>

        <a href = "#container">
            <button>
                Scroll <CgMouse />
            </button>
        </a>
    </div>

    <h2 className="homeHeading">Featured Products</h2>

    <div className="container" id="container">
        {products && products.map(product => (
            <Product product={product} key={product._id} />
        ))}
    </div>
  </Fragment>
}
    </Fragment>
  );   
};

export default Home;