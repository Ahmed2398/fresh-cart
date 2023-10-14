import React, {useState} from 'react';
import {QueryClient, useQuery} from "react-query";
import axios from "axios";
import Product from "../Product/Product";
import Pagination from "../Pagination/Pagination";

const Products = () => {

    const [page, setPage] = useState(1);
    const getAllProducts = async (page, limit) => {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };


    const { data, isError, isFetching, isLoading, isPreviousData } = useQuery(
        ['products', page], // Use page as part of the query key
        () => getAllProducts(page),
        {
            cacheTime: 5000,
            enabled: true,
            keepPreviousData : true
        }
    );


    // const itemsPerPage = 2;

    const nextPage = () => {
        if (data && data.metadata.nextPage) {
            setPage(data.metadata.nextPage);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <>
            <div className='row'>
                {data?.data.map((product) => {
                    return (
                        <div key={product._id} className={'col-md-3'}>
                            <Product product={product} />
                        </div>
                    );
                })}

            <Pagination
                page={page}
                onPageChange={(action) => {
                    if (action === 'prev') prevPage();
                    if (action === 'next') nextPage();
                }}
                hasPrevPage={page > 1}
                hasNextPage={data?.metadata?.nextPage}
            />
            </div>

        </>
    );
};

export default Products;
