import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import placeholderImage from '../../Assets/images/placeholder.png';
import PlaceHolderImage from '../PlaceHolderImage/PlaceHolderImage';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';

const truncateText = (text, limit) => {
    const words = text.split(' ');

    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }

    return text;
};

const Product = ({ product, truncate = true }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    let navigate = useNavigate();
    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);
    const [isInWishlist, setIsInWishlist] = useState(false);

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

    const checkIfInWishlist = async () => {
        try {
            const response = await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
                headers: { 'token': localStorage.getItem('token') },
            });
            const data = response.data;

            if (data.status === 'success') {
                const productIdsInWishlist = data.data.map(item => item.productId);
                setIsInWishlist(productIdsInWishlist.includes(product._id));
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const toggleWishlist = async () => {
        if (isInWishlist) {
            // Remove from Wishlist
            try {
                await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${product._id}`, {
                    headers: { 'token': localStorage.getItem('token') },
                });
                setIsInWishlist(false);
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            // Add to Wishlist
            try {
                await axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist', {
                    productId: product._id,
                }, {
                    headers: { 'token': localStorage.getItem('token') },
                });
                setIsInWishlist(true);
            } catch (error) {
                console.log('Error:', error);
            }
        }
    };

    useEffect(() => {
        checkIfInWishlist();
    }, []);

    const title = truncate ? truncateText(product.title, 2) : product.title;

    return (
        <div className="product p-3 overflow-hidden">
            <Link to={'/productDetails/' + product._id}>
                {imageLoaded ? (
                    <img className="w-100" src={product.imageCover} alt={product.title} onLoad={handleImageLoad} />
                ) : (
                    <img className="w-100" src={placeholderImage} alt="Placeholder" onLoad={handleImageLoad} />
                )}
                <h2>{title}</h2>
                <h5 className="text-main font-sm">{product.category.name}</h5>
                <p className="d-flex justify-content-between">
                    {/*<span>Price:  {product.price}EGP</span>*/}
                    <span><i className="fas fa-star text-main"></i> {product.ratingsAverage}</span>
                </p>
                <h6 className="text-muted py-1 d-flex justify-content-between">
                    {product.priceAfterDiscount ? (
                        <>
                            <span className="fw-bold"> Price:</span>
                        <span className="text-decoration-line-through text-danger">
                           {product.price} EGP
                        </span>
                            <span className="fw-bold ps-2 text-success">
                          {product.priceAfterDiscount} EGP
                        </span>
                        </>
                    ) : (
                        <span className="fw-bold">Price: {product.price} EGP</span>
                    )}
                </h6>
            </Link>
            <button onClick={() => addProductToCart(product._id)} className='btn btn-success text-white w-100 my-2  rounded-5 fw-bolder'>Add to cart</button>

            <button
                onClick={toggleWishlist}
                className={`btn  text-white w-100 my-2 rounded-5 fw-bolder ${
                    isInWishlist ? 'btn-danger' : 'btn-success'
                }`}
            >
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
        </div>
    );
};

export default Product;
