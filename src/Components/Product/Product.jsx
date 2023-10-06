import React from 'react';
import {Link} from "react-router-dom";

const Product = ({product}) => {
    return (
        <div className="product p-3 overflow-hidden">
            <Link to={'/productDetails/' + product._id}>
                <img className='w-100' src={product.imageCover} alt="" />
                <h2>{product.title}</h2>
                <h5 className='text-main font-sm'>{product.category.name}</h5>
                <p className='d-flex justify-content-between'>
                    <span>Price: {product.price}EGP</span>
                    <span><i className='fas fa-star text-main'></i> {product.ratingsAverage}</span>
                </p>
            </Link>
            {/*<button onClick={() => addProductToCart(product._id)} className='btn bg-main text-white w-100 my-2'>Add to cart</button>*/}
        </div>
    );
};

export default Product;