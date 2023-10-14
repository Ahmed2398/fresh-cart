import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import {useNavigate} from "react-router-dom";

import './ProductDetails.module.css'
import toast from "react-hot-toast";
import {AuthContext} from "../../Contexts/AuthContext";

function ProductDetails() {

    let { id } = useParams()
    let navigate = useNavigate();

    let [productDetails, setProductDetails] = useState()
    let [errorMessage, setErrorMessage] = useState("")
    let [isLoading, setIsLoading] = useState(false)

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    };



    useEffect(() => {
        getProductDetails(id)
    }, [])


    async function getProductDetails(productId) {
        setIsLoading(true)
        let res = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productId).catch((err) => {
            console.log(err);
            setErrorMessage(err.response.data.errors.msg)
            setIsLoading(false)

        })
        setIsLoading(false)

        console.log(res?.data.data);
        setProductDetails(res?.data.data)
    }

    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)
    async function addProductToCart(productId) {
        let res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
            localStorage.removeItem("token")
            setIsUserLoggedIn(false)
            navigate("/login")
        })

        console.log(res);
        if (res?.data.status == "success") {

            toast.success(res.data.message)
        }
    }



    console.log(id);
    return (
        <>
            {isLoading ? <div className='py-5 my-5 text-center'>
                    <i className='fas fa-spinner fa-spin fa-2x'></i>
                </div>
                :
                <>

                    {productDetails ?
                        <div className="row align-items-center  m-auto">
                            <div className="col-md-6">
                                <Slider {...settings}>

                                    {productDetails?.images.map((img) => {
                                        // return <img key={img} className='w-100 image-details' src={img} alt="" />
                                        return (
                                            <ReactImageMagnify
                                                key={img}
                                                className='w-100 image-details'
                                                {...{
                                                    smallImage: {
                                                        alt: '',
                                                        isFluidWidth: true,
                                                        src: img,

                                                    },
                                                    largeImage: {
                                                        src: img,
                                                        width: 1200,
                                                        height: 1800
                                                    },
                                                }}
                                            />
                                        );
                                    })}

                                </Slider>
                            </div>
                            <div className="col-md-6 productDetails">

                                <h2 className="my-3">{productDetails?.title}</h2>
                                <p className="my-3">{productDetails?.description}</p>
                                <h5 className='text-main font-sm my-3'><span>Brand:</span>{productDetails?.brand.name}</h5>
                                <h5 className='text-main font-sm my-3'><span>Category:</span> {productDetails?.category.name}</h5>
                                <h5 className='text-main font-sm my-3'><span>Price:</span> {productDetails?.price}EGP</h5>
                                <h5 className='text-main font-sm my-3'><span>Rating:</span> {productDetails?.ratingsAverage}<i className='fas fa-star'></i></h5>
                                <h5 className='text-main font-sm my-3'><span>Stock:</span> {productDetails?.quantity}</h5>
                                <button onClick={() => addProductToCart(productDetails._id)} className='btn bg-main text-white w-100 my-2'>Add to cart</button>
                            </div>
                        </div> :
                        <div className='alert alert-danger text-center py-3 my-5'>
                            <h3>{errorMessage}</h3>
                        </div>}
                </>
            }

        </>
    )
}

export default ProductDetails