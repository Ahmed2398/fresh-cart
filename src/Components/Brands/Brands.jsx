import React, {useState} from 'react';
import axios from "axios";
import {useQuery} from "react-query";
import './Brand.module.css'
import PlaceHolderImage from "../PlaceHolderImage/PlaceHolderImage";
const Brands = () => {
    // const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);


    const getAllBrands = async ( limit) => {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands?limit=${limit}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const {data} = useQuery(
        // 'brands', getAllBrands,
        ['brands' , limit], // Use page as part of the query key
        () => getAllBrands(limit),
        {
            cacheTime: 5000,
            enabled: true,
            keepPreviousData : true
        }
    )

    const nextPage = () => {
        setLimit(limit + 10); // Increase the limit by 10 for the next page
    };

    const prevPage = () => {
        if (limit > 10) {
            setLimit(limit - 10); // Decrease the limit by 10 for the previous page, assuming a minimum limit of 10
        }
    };

    return (
        <>
            <div className="row">

                    {data?.data.map((brand)=>{
                        return(
                            <div className="col-md-3 col-sm-6">
                            <div className="card brands-shop ">
                                <div className="card-img">
                                    <PlaceHolderImage type="img" className="img-fluid" src={brand.image}/>
                                </div>
                                <div className="card-body">
                                    <p className="text-center text-main">{brand.name}</p>
                                </div>

                            </div>
                    </div>
                        )
                    })}

                <nav aria-label="Page navigation example ">
                    <ul className="pagination justify-content-center my-5">
                        <li className="page-item ">
                            <button   className={`page-link ${limit === 1 ? 'disabled' : ''}`} onClick={prevPage} disabled={limit === 1}>
                                Previous Page
                            </button>
                            {/*<a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>*/}
                        </li>
                        <li className="page-item">
                            <a className="page-link page-number"> {limit} Brands</a>
                        </li>
                        <li className="page-item">
                            <button  className={`page-link ${!data?.metadata?.nextPage ? 'disabled' : ''}`} onClick={nextPage} disabled={!data?.metadata?.nextPage}>
                                Next Page
                            </button>
                            {/*<a className="page-link" href="#">Next</a>*/}
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Brands;
