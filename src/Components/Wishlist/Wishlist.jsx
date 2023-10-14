import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Wishlist = () => {
    const [numOfWishlist, setNumOfWishlist] = useState(0);
    const [wishlistProducts, setWishlistProducts] = useState([]);

    const getWishlist = async () => {
        try {
            const response = await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
                headers: { 'token': localStorage.getItem('token') }
            });
            const data = response.data;

            if (data.status === 'success') {
                setNumOfWishlist(data.count);
                setWishlistProducts(data.data);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const addToWishlist = async (id) => {
        try {
            const response = await axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist', {
                productId: id
            }, {
                headers: { 'token': localStorage.getItem('token') }
            });
            const data = response.data;

            if (data.status === 'success') {
                setNumOfWishlist(data.count);
                setWishlistProducts(data.data);
                getWishlist();
                toast.success(data.message, { duration: 3000, className: "text-success" });
            } else {
                toast.error(data.message, { duration: 3000, className: "bg-black text-white" });
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const removeFromWishlist = async (id) => {
        try {
            const response = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`, {
                headers: { 'token': localStorage.getItem('token') }
            });
            const data = response.data;

            if (data.status === 'success') {
                setNumOfWishlist(data.count);
                setWishlistProducts(data.data);
                toast.success(data.message, {
                    duration: 3000,
                    className: "text-danger",
                    iconTheme: {
                        primary: '#dc3545',
                        secondary: '#fff',
                    },
                });
            } else {
                toast.error(data.message, { duration: 3000, className: "bg-black text-white" });
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <div>
            <h3 className="mt-5 pt-5 text-success fw-bolder text-center text-muted">
                Welcome to your Wishlist <i className="fa-solid fa-heart text-danger"></i>
            </h3>
            <div className="container py-3">
                <div className="row g-5 my-2">
                    {wishlistProducts.map((pro, idx) => (
                        <div key={pro._id} className="col-md-3">
                            <div className="cart-customize item text-white h-100 rounded-5 position-relative shadow">
                                <i
                                    onClick={() => removeFromWishlist(pro._id)}
                                    className="fa-solid fa-heart fs-4 position-absolute top-0 end-0 m-3 text-danger"
                                ></i>
                                <img
                                    src={pro.imageCover}
                                    className="w-100 rounded-5"
                                    alt={pro.title}
                                    style={{ height: '350px' }}
                                />
                                <h6 className="px-3 text-success text-start pt-3">
                                    {pro.title?.slice(0, pro.title.indexOf(' ', 10))}
                                </h6>
                                <h6 className="px-3 text-main font-sm">{pro.category?.name}</h6>
                                <div className="px-3 my-2">
                                    <h6 className="text-muted py-1 d-flex justify-content-between">
                                        {pro.priceAfterDiscount ? (
                                            <>
                                                <span className="fw-bold"> Price:</span>
                                                <span className="text-decoration-line-through text-danger">
                           {pro.price} EGP
                        </span>
                                                <span className="fw-bold ps-2 text-success">
                          {pro.priceAfterDiscount} EGP
                        </span>
                                            </>
                                        ) : (
                                            <span className="fw-bold">Price: {pro.price} EGP</span>
                                        )}
                                    </h6>
                                    <span className="text-main  my-3"><i className="fas fa-star text-main"></i> {pro.ratingsAverage}</span>

                                </div>
                                <button
                                    onClick={() => addToWishlist(pro._id)}
                                    className="btn btn-success text-white w-100 mb-2 rounded-5 fw-bolder"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => removeFromWishlist(pro._id)}
                                    className="btn btn-danger text-white w-100 mb-2 rounded-5 fw-bolder"
                                >
                                    Remove from wishlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
