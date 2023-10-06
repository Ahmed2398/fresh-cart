import React, {useEffect, useState} from 'react';
import MainSlider from "../MainSlider/MainSlider";
import axios from "axios";
import Product from "../Product/Product";
import {useQuery} from "react-query";

const Home = () => {
    let [products, setProducts] = useState([]);

    // Start The First Way to Fetch Data
    // useEffect(() => {
    //     getAllProducts()
    // }, [])
    //
    // async  function getAllProducts(){
    //     let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //         console.log(data.data);
    //         setProducts(data.data)
    // }
    // END The First Way to Fetch Data
    // Start Second Way to Fetch Data with React Query
    function getAllProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }
    let { data, isError, isFetched, isFetching, isLoading, refetch } = useQuery('products', getAllProducts, {
        cacheTime: 5000,
        // staleTime: 10000,
        // refetchInterval: 15000,
        // refetchOnMount: false,
        enabled: true
    })

    console.log(isFetching);
    // END Second Way to Fetch Data with React Query
    return (
        <>
       <MainSlider/>
        {/* Start The First Way to Fetch Data */}
        {/*<div className="row">*/}
        {/*    {products.map((product, index) => {*/}
        {/*        return <div key={index} className={"col-md-3"}>*/}
        {/*            <Product product={product} />*/}
        {/*        </div>*/}
        {/*    })}*/}
        {/*</div>*/}
        {/*End The First Way to Fetch Data */}
        {/*------------------------------------------------------------------------------*/}
        {/*Start Second Way to Fetch Data with React Query*/}
    <button onClick={refetch} className='btn bg-main text-white w-100 text-center'>Get All Products</button>
    <div className="row">
        {data?.data.data.map((product) => {
            return <div key={product._id} className={"col-md-3"}>
                <Product product={product} />
            </div>
        })}
    </div>
            {/*// End Second Way to Fetch Data with React Query*/}
        </>
    );
};

export default Home;
