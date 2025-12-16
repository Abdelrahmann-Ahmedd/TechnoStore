"use client"
import Alert from '@/components/Ui/Alert';
import Loader from '@/components/Ui/Loader';
import { AuthServices } from '@/services/AuthServices';
import { ProductServices } from '@/services/ProductServices';
import { AddProductSchema, registerSchema } from '@/services/Validation';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

export default function AddProductForm() {

    const router = useRouter(); 
    const [ error , setError] = useState<string | null>(null);
    const [ success , setSuccess] = useState<boolean | null>(null);
    const values = React.useMemo(() => ({ 
        id: "",
        title: "",
        price: "",
        describtion:"",
        category: "",
        image: ""    
    }),
        []);
    const autoClear = useCallback(
            <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T, delay = 3000) => {
                setTimeout(() => setter(value), delay);
            },[]
        );

    const myFormik = useFormik({
        initialValues: values,
        validationSchema: AddProductSchema,
        onSubmit: async (values, {setSubmitting})=>{
            try {
                const response = await ProductServices.addProduct(values);
                if (!response?.error) {
                    setSuccess(true);
                    setError(null);
                    myFormik.resetForm();
                    autoClear<boolean| null>(setSuccess,false);
                    setTimeout(() => {
                    router.push("products");
                    }, 3000);
                    return;
                }
                setError("failed add. Please try again.");
                setSuccess(false);
                autoClear<string| null>(setError,null)
            }catch(error:unknown){
                setSuccess(false);
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.message);
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
            <form className='w-75 m-auto mt-3' noValidate onSubmit={myFormik.handleSubmit}>
                <div aria-live='assertive'>
                    {success && <Alert error={false}>Successfull Add.</Alert>}
                    {error && <Alert error={true}>{error}</Alert>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleId" className="form-label">id</label>
                    <input name='id' value={myFormik.values.id} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange}  type="text" className="form-control" id="exampleId" aria-describedby="emailHelp"/>
                </div>
                {myFormik.errors.id && myFormik.touched.id && <Alert error={true}>{myFormik.errors.id}</Alert>}
                <div className="mb-3">
                    <label htmlFor="exampleTitle" className="form-label">title</label>
                    <input name='title' value={myFormik.values.title} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" className="form-control" id="exampleTitle" aria-describedby="emailHelp"/>
                </div>
                {myFormik.errors.title && myFormik.touched.title && <Alert error={true}>{myFormik.errors.title}</Alert>}
                <div className="mb-3">
                    <label htmlFor="examplePrice" className="form-label">Price</label>
                    <input name='price' value={myFormik.values.price} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" className="form-control" id="examplePrice"/>
                </div>
                {myFormik.errors.price && myFormik.touched.price && <Alert error={true}>{myFormik.errors.price}</Alert>}
                <div className="mb-3">
                    <label htmlFor="exampleDis" className="form-label">Describtion</label>
                    <input name='describtion' value={myFormik.values.describtion} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" className="form-control" id="exampleDis" aria-describedby="emailHelp"/>
                </div>
                {myFormik.errors.describtion && myFormik.touched.describtion && <Alert error={true}>{myFormik.errors.describtion}</Alert>}
                <div className="mb-3">
                    <label htmlFor="exampleCategory" className="form-label">Category</label>
                    <input name='category' value={myFormik.values.category} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" className="form-control" id="exampleCategory" aria-describedby="emailHelp"/>
                </div>
                {myFormik.errors.category && myFormik.touched.category && <Alert error={true}>{myFormik.errors.category}</Alert>}
                <div className="mb-3">
                    <label htmlFor="exampleImage" className="form-label">Image</label>
                    <input name='image' value={myFormik.values.image} onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" className="form-control" id="exampleImage" aria-describedby="emailHelp"/>
                </div>
                {myFormik.errors.image && myFormik.touched.image && <Alert error={true}>{myFormik.errors.image}</Alert>}
                <button disabled={myFormik.isSubmitting} type="submit" className="btn btn-primary">{myFormik.isSubmitting?<Loader />:"Add"}</button>
            </form>
    )
}
