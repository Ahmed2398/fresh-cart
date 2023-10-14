import React, {useState} from 'react';
import axios from "axios";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import PlaceHolderImage from "../PlaceHolderImage/PlaceHolderImage";

const Categories = () => {
    const [page, setPage] = useState(1);

    const [limit, setLimit] = useState(10 );


    const getAllCategories = async (page) =>{
        try{
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories?limit=${limit}&page=${page}`)
            return response.data;
        }catch (error){
            throw error
        }
    }

    const { data } = useQuery(
        ['categories', page],
        () => getAllCategories(page),
        {
            cacheTime: 5000,
            enabled: true,
            keepPreviousData: true
        }
    );

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
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center my-2 text-main">Categories</h2>
                </div>

                {data?.data.map((category)=>{
                    return(
                        <div className="col-md-3 col-sm-6">
                            <div className="category-shop">
                                <Link to={'/categoriesDetails/' + category._id}>
                                <PlaceHolderImage type="img" src={category.image} className="w-100"/>
                                </Link>
                            </div>
                        </div>
                    )
                })}

                {/*<nav aria-label="Page navigation example ">*/}
                {/*    <ul className="pagination justify-content-center my-5">*/}
                {/*        <li className="page-item ">*/}
                {/*            <button   className={`page-link ${page === 1 ? 'disabled' : ''}`} onClick={prevPage} disabled={page === 1}>*/}
                {/*                Previous Page*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*        <li className="page-item">*/}
                {/*            <a className="page-link page-number">page {page} </a>*/}
                {/*        </li>*/}
                {/*        <li className="page-item">*/}
                {/*            <button  className={`page-link ${!data?.metadata?.nextPage ? 'disabled' : ''}`} onClick={nextPage} disabled={!data?.metadata?.nextPage}>*/}
                {/*                Next Page*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}
            </div>
        </>
    );
};

export default Categories;
