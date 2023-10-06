import React, {useState} from 'react';
import axios from "axios";
import formik, {useFormik} from "formik";
import * as Yup from 'yup'
import {useNavigate} from "react-router-dom";

const Register = () => {
    let navigate = useNavigate();
    let [errorMessage, setErrorMessage] = useState("");
    let [isLoading, setIsLoading] = useState(false);

    async function register (values) {
        setErrorMessage('')
        console.log(values)
        setIsLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err)=>{
            setErrorMessage(err.response.data.message)
            setIsLoading(false);
        })
        console.log(data);
        if (data.message === "success"){
            navigate('/login')
        }
        setIsLoading(false);
    }

    let validationSchema = Yup.object({
        name: Yup.string().required('Name Is Required').min(3,'Min Length must be greater than 3 letters').max(20,'Max Length must be less than 20 letters'),
        email: Yup.string().required('Email Is Required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
        password: Yup.string().min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                'Password must contain at least one letter, one number, and one special character'
            )
            .required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password'), null],'password not match').required('confirm Password is required'),
        phone: Yup.string()
            .matches(
                /^(01[0125])[0-9]{8}$/,
                'Invalid Egyptian phone number. Please use the format 01XXXXXXXXX with the second digit being 0, 1, 2, or 5.'
            )
            .required('Phone number is required'),
    })


    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:'',
        },
        onSubmit: register,
        validationSchema
    })
    return (
        <>
            <div className="w-75 m-auto my-5">
                <h1>Register Now: </h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input onChange={formik.handleChange}  value={formik.values.name} onBlur={formik.handleBlur}  className='form-control mb-3' type="text" id='name' name='name' />
                    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : null }


                    <label htmlFor="email">Email: </label>
                    <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className='form-control mb-3' type="email" id='email' name='email' />
                    {formik.errors.email && formik.touched.email ?  <div className="alert alert-danger">{formik.errors.email}</div> : null }



                    <label htmlFor="password">Password: </label>
                    <input onChange={formik.handleChange} value={formik.values.password}  onBlur={formik.handleBlur} className='form-control mb-3' type="password" id='password' name='password' />
                    {formik.errors.email && formik.touched.password ?  <div className="alert alert-danger">{formik.errors.password}</div> : null }

                    <label htmlFor="rePassword">RePassword: </label>
                    <input onChange={formik.handleChange} value={formik.values.rePassword}  onBlur={formik.handleBlur} className='form-control mb-3' type="password" id='rePassword' name='rePassword' />
                    {formik.errors.email && formik.touched.rePassword ?  <div className="alert alert-danger">{formik.errors.rePassword}</div> : null }

                    <label htmlFor="phone">Phone: </label>
                    <input onChange={formik.handleChange} value={formik.values.phone}  onBlur={formik.handleBlur}  className='form-control mb-3' type="tel" id='phone' name='phone' />
                    {formik.errors.email && formik.touched.phone ?  <div className="alert alert-danger">{formik.errors.phone}</div> : null }
                    {/*<div className="alert alert-danger"></div> */}
                    {errorMessage ? <div className="alert alert-danger">
                        {errorMessage}
                    </div> : null}


                    {isLoading ? <button disabled type='button' className='btn bg-main text-white ms-auto d-block'> <i className='fas fa-spinner fa-spin'></i> </button>
                        : <button type='submit' className='btn bg-main text-white ms-auto d-block'>Register</button>
                    }

                </form>
            </div>
        </>
    )
};

export default Register;
