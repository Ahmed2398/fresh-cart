import React, {useEffect, useState} from 'react';
import MainSlider from "../MainSlider/MainSlider";
import axios from "axios";
import Product from "../Product/Product";
import {useQuery} from "react-query";
import Categories from "../Categories/Categories";
import Pagination from "../Pagination/Pagination";
import {Link} from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Home = () => {
    const [allProducts, setAllProducts] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12); // Fetch 12 products



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
    const getAllProducts = async (page, limit) => {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    let { data, isError, isFetched, isFetching, isLoading, refetch } = useQuery(
        ['products', page], // Use page as part of the query key
        () => getAllProducts(page, limit),
        {
            cacheTime: 5000,
            enabled: true,
            keepPreviousData : true
        }
    )

    // END Second Way to Fetch Data with React Query
    return (
        <>
            <MainSlider/>
            <Categories/>
                <div className="row">
                <div className="col-md-12">
                <h2 className="text-center  mb-5 text-main">Hot Products</h2>
                </div>
            {data?.data.map((product) => {
                return <div key={product._id} className={"col-md-3"}>
                <Product product={product} />
                </div>
            })}
                <div className="col-md-12 text-center mt-5">
                <Link className="btn bg-main text-white  text-center my-3" to={'/products'}  >All Products</Link>
                </div>

                </div>

        </>
    );
};

export default Home;
