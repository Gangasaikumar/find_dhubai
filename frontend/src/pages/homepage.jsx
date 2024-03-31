import { useEffect, useState } from "react";
import {ALLProducts_API} from "../../api_calls/allproducts_api";
import config from '../../common/config';  
import './homepage.css'; 


const Homepage =()=>{
    const [all_Products, setAllProducts] = useState([]);
    const allProducts=async()=>{
    const apiData=await ALLProducts_API();
    setAllProducts(apiData);
    }
    useEffect(()=>{
     allProducts();
    },[]);
    const addToCart=(item)=>{
        console.log("add to cart called.!"+item);
    }
    return <>
    {all_Products ? all_Products.map((eachProduct)=>{
        return <div key={eachProduct._id}>
              <img className="test" src={config.base_API+eachProduct.imageurl} alt=""/>
              <label>Model {eachProduct.model}</label>
              <label>brand {eachProduct.brand} </label>
              <label> price {eachProduct.price}</label>
              <button onClick={addToCart(eachProduct._id)}>add to cart</button>
        </div>
       }) :"loading....."
    }
    </>
}

export default Homepage;