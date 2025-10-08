"use client"
import Alert from '@/components/Ui/Alert';
import Loader from '@/components/Ui/Loader';
import { AuthServices } from '@/services/AuthServices';
import { forgetPasswordSchema } from '@/services/Validation';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react'

export default function ForgetPassword() {

    const [ error , setError] = useState<string | null>(null);
    const [ success , setSuccess] = useState<boolean | null>(null);
    const values = React.useMemo(() => ({ email: "", }), []);

    const autoClear = useCallback(
            <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T, delay = 3000) => {
                setTimeout(() => setter(value), delay);
            },[]
    );

    const myFormik = useFormik({
        initialValues: values,
        validationSchema: forgetPasswordSchema,
        onSubmit: async (values, {setSubmitting})=>{
            try {
                const response = await AuthServices.forgetPassword(values);
                if (!response?.error) {
                    setSuccess(true);
                    setError(null);
                    myFormik.resetForm();
                    autoClear<boolean| null>(setSuccess,false);
                    return;
                }
                setError("Proccess Failed. Please try again.");
                setSuccess(false);
                autoClear<string| null>(setError,null);
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
                {success && <Alert error={false}>Successfull.</Alert>}
                {error && <Alert error={true}>{error}</Alert>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input name='email' value={myFormik.values.email} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            {myFormik.errors.email && myFormik.touched.email && <Alert error={true}>{myFormik.errors.email}</Alert>}
            <button disabled={myFormik.isSubmitting} type="submit" className="btn btn-primary">{myFormik.isSubmitting?<Loader />:"Submit"}</button>
        </form>
    )
}
