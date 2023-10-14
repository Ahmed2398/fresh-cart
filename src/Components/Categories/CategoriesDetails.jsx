import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoriesDetails = () => {
    let { id } = useParams();
    let [categoryDetailsList, setCategoryDetails] = useState({});
    let [errorMessage, setErrorMessage] = useState('');
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCategoryDetails(id);
    }, []);

    async function getCategoryDetails(categoryId) {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
            );
            setCategoryDetails(response.data.data); // Set the subcategories array in state
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response?.data?.errors?.msg || 'An error occurred');
            setIsLoading(false);
        }
    }

    return (
        <div>

           hello
        </div>
    );
};

export default CategoriesDetails;
