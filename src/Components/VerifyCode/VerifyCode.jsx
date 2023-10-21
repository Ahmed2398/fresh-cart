import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const VerifyCode = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        resetCode: Yup.string().required('Reset Code is required')
    });

    let formik = useFormik({
        initialValues : {
            "resetCode" : ""
        },
        onSubmit: verifyCodeNumber,
        validationSchema
    });

    async function verifyCodeNumber(values){
        setLoading(true);
        try {
            const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,values)
            console.log(data);
            setLoading(false);
            if(data.status === 'Success'){
                toast.success('You can create a new Password',{duration:2000,className:"text-success px-4 fw-bolder"});
                navigate('/resetpassword');
            }
        } catch (error) {
            console.log('Error : ',error);
            setLoading(false);
            toast.error(error.response.data.message,{duration:2000,className:"text-danger px-4 fw-bolder"});
        }
    }

    return(
        <>


            <form onSubmit={formik.handleSubmit}>
                <div className="container my-5 py-5">


                    <label className='mt-5 fw-bolder' htmlFor="resetCode">Enter Reset Code</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id="resetCode" type="text" name='resetCode' placeholder='Enter Reset Code' className='form-control my-2'  />
                    {formik.errors.resetCode && formik.touched.resetCode ?<div className='alert alert-danger text-center '>{ formik.errors.resetCode }</div>:"" }

                    {loading ? <button type='button' className='btn btn-outline-success mt-3 fw-bolder'>
                        <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i>
                    </button> : <button disabled={!formik.isValid } type='submit' className='btn btn-outline-success mt-3 fw-bolder'>Verify Code</button> }
                </div>
            </form>
        </>
    )
};

export default VerifyCode;