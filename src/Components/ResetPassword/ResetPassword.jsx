import React, {useState} from 'react';
import axios from 'axios';
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const ResetPassword = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    let validationSchema = Yup.object({
        email: Yup.string().required('Email Is Required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
        newPassword: Yup.string().min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                'Password must contain at least one letter, one number, and one special character'
            )
            .required('Password is required'),

    })

    let formik = useFormik({
        initialValues : {
            "email":"",
            "newPassword": ""
        },
        onSubmit: resetChangePassword ,
        validationSchema
    });

    async function resetChangePassword(values){
        setIsLoading(true);
        try {
            const {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,values)
            console.log(data);
            setIsLoading(false);
            if(data.token != null){
                toast.success("Your Password Changed Successfully",{duration:2000,className:"text-success px-4 fw-bolder"});
                navigate('/login');
            }

        } catch (error) {
            console.log('Error : ',error);
            toast.error(error.response.data.message,{duration:2000,className:"text-danger px-4 fw-bolder"});
            setIsLoading(false);
        }
    }

    function showNewPassword(){
        let showNewPass = document.getElementById('newPassword');
        if(showNewPass.type === "password"){
            showNewPass.type = "text";
        }else{
            showNewPass.type = "password";
        }
    }

    return(
        <>

            <form onSubmit={formik.handleSubmit}>
                <div className="container my-5 py-5">

                    <label className='mt-5 fw-bolder' name='email' htmlFor="email">Email</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange}
                           value={formik.values.email} id="email" type="email" placeholder='Email'
                           className='form-control'/>
                    {formik.errors.email && formik.touched.email ?
                        <div className='alert alert-danger text-center '>{formik.errors.email}</div> : ''}

                    <label className='mt-3 fw-bolder' htmlFor="newPassword">New Password</label>
                    <div className="inputWithIcon position-relative">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur}
                               value={formik.values.newPassword} id="newPassword" type="password" name='newPassword'
                               placeholder='Enter New Password' className='form-control my-2'/>
                        {formik.errors.newPassword && formik.touched.newPassword ?
                            <div className='alert alert-danger text-center '>{formik.errors.newPassword}</div> : ''}
                        <i className="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2" onClick={showNewPassword}
                           id="togglePassword"></i>
                    </div>

                    {/*{loading ? <button type='button' className='btn btn-outline-success mt-3 fw-bolder'>*/}
                    {/*    <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i>*/}
                    {/*</button> : <button disabled={!formik.isValid} type='submit'*/}
                    {/*                    className='btn btn-outline-success mt-3 fw-bolder'>Confirmation</button>}*/}
                    {isLoading ? <button disabled type='button' className='btn bg-main text-white ms-auto d-block'> <i className='fas fa-spinner fa-spin'></i> </button>
                        : <button type='submit' className='btn bg-main text-white ms-auto d-block'>Confirm</button>
                    }
                </div>
            </form>
        </>
    )


};

export default ResetPassword;