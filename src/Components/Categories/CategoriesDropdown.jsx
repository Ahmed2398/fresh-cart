import axios from "axios";
import {useQuery} from "react-query";
import {useState} from "react";
import {Link} from "react-router-dom";

const CategoriesDropdown = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [categories, setCategories] = useState([]);

    const getAllCategories = async (page) => {
        try {
            const response = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/categories?limit=${limit}&page=${page}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const { data } = useQuery(
        ['categories', page],
        () => getAllCategories(page),
        {
            cacheTime: 5000,
            enabled: true,
            keepPreviousData: true,
        }
    );

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="categoriesDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Categories
            </button>
            <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                <li>
                    <Link className="nav-link" to={'/categories'} >All Categories</Link>

                </li>
                {data?.data.map((category) => (
                    <li key={category._id}>
                        <Link className="dropdown-item nav-link" to={'/categoriesDetails/' +category._id}>   {category.name} </Link>
                        {/*<a className="dropdown-item nav-link" href={`/categories/${category._id}`}>*/}
                        {/*    {category.name}*/}
                        {/*</a>*/}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default CategoriesDropdown