"use client"
import Alert from '@/components/Ui/Alert';
import Loader from '@/components/Ui/Loader';
import { AuthServices } from '@/services/AuthServices';
import { registerSchema } from '@/services/Validation';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

export default function RegisterForm() {

    const router = useRouter(); 
    const [ error , setError] = useState<string | null>(null);
    const [ success , setSuccess] = useState<boolean | null>(null);
    const values = React.useMemo(() => ({ 
        name: "",
        email: "",
        password: "",
        rePassword:"",
        phone: ""}),
        []);
    const autoClear = useCallback(
            <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T, delay = 3000) => {
                setTimeout(() => setter(value), delay);
            },[]
        );

    const myFormik = useFormik({
        initialValues: values,
        validationSchema: registerSchema,
        onSubmit: async (values, {setSubmitting})=>{
            try {
                const response = await AuthServices.register(values);
                if (!response?.error) {
                    setSuccess(true);
                    setError(null);
                    myFormik.resetForm();
                    autoClear<boolean| null>(setSuccess,false);
                    setTimeout(() => {
                    router.push("/login");
                    }, 3000);
                    return;
                }
                setError("Register failed. Please try again.");
                setSuccess(false);
                autoClear<string| null>(setError,null)
            }catch(error:unknown){
                setSuccess(false);
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.message || "Unauthorized email or password.");
                } else if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred.");
                }
                autoClear<string| null>(setError,null);
            } finally {
                setSubmitting(false);
            }
        }

    })
    return (
            <form noValidate onSubmit={myFormik.handleSubmit}>
                <div aria-live='assertive'>
                    {success && <Alert error={false}>Successfull Register.</Alert>}
                    {error && <Alert error={true}>{error}</Alert>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleName" className="form-label">Name</label>
                    <input name='name' value={myFormik.values.name} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange}  type="text" className="form-control" id="exampleName" aria-describedby="emailHelp"/>
                </div>
                {myFormik.errors.name && myFormik.touched.name && <Alert error={true}>{myFormik.errors.name}</Alert>}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name='email' value={myFormik.values.email} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                {myFormik.errors.email && myFormik.touched.email && <Alert error={true}>{myFormik.errors.email}</Alert>}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name='password' value={myFormik.values.password} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                {myFormik.errors.password && myFormik.touched.password && <Alert error={true}>{myFormik.errors.password}</Alert>}
                <div className="mb-3">
                    <label htmlFor="exampleRePassword" className="form-label">RePassword</label>
                    <input name='rePassword' value={myFormik.values.rePassword} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="password" className="form-control" id="exampleRePassword" aria-describedby="emailHelp"/>
                </div>
                {myFormik.errors.rePassword && myFormik.touched.rePassword && <Alert error={true}>{myFormik.errors.rePassword}</Alert>}
                <div className="mb-3">
                    <label htmlFor="examplePhone" className="form-label">Phone</label>
                    <input name='phone' value={myFormik.values.phone} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" className="form-control" id="examplePhone" aria-describedby="emailHelp"/>
                </div>
                {myFormik.errors.phone && myFormik.touched.phone && <Alert error={true}>{myFormik.errors.phone}</Alert>}
                <button disabled={myFormik.isSubmitting} type="submit" className="btn btn-primary">{myFormik.isSubmitting?<Loader />:"Register"}</button>
            </form>
    )
}
