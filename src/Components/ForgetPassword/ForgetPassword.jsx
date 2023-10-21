import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
const ForgetPassword = () => {
    let navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState("")

    async function forgetPassword(values) {
        setIsLoading(true);
        const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`, values).catch((err) => {
            setErrorMessage(err.response.data.message);
            setIsLoading(false);
        });

        if (data.statusMsg === "success") {
            console.log("Response is success, navigating to '/verify'");
            // toast.success(data.message, { duration: 2000, className: "text-success px-4 fw-bolder" });
            navigate('/verify'); // Move this line here
        }

        setIsLoading(false);
    }

    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
    })


    let formik = useFormik({
        initialValues:{
            email: ""
        },
        onSubmit: forgetPassword,
        validationSchema
    })


    return (
            <>
            <form onSubmit={formik.handleSubmit}>
                <div className="container my-5 py-5">
                    <label className='mt-5 fw-bolder' name='email' htmlFor="email">Enter Your Email</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" type="email" placeholder='Enter Your Email' className='form-control my-2'  />
                    {formik.errors.email && formik.touched.email ?<div className='alert alert-danger text-center '>{ formik.errors.email }</div>:"" }
                    {/*{isLoading ? <button type='button' className='btn btn-outline-success mt-3 fw-bolder'>*/}
                    {/*    <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i>*/}
                    {/*</button> : <button disabled={!formik.isValid } type='submit' className='btn btn-outline-success mt-3 fw-bolder'>Send Code</button> }*/}
                    {isLoading ? <button disabled type='button' className='btn bg-main text-white ms-auto d-block'> <i className='fas fa-spinner fa-spin'></i> </button>
                        : <button type='submit' className='btn bg-main text-white ms-auto d-block'>Send Code</button>
                    }
                </div>
            </form>



        </>
)

};

export default ForgetPassword;