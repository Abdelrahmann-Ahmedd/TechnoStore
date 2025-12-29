"use client";
import { loginSchema } from '@/services/Validation';
import { useFormik } from 'formik';
import Link from 'next/link';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { loginUser } from '@/store/slices/authSlice';
import Alert from '@/components/Ui/Alert';
import Loader from '@/components/Ui/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const router = useRouter(); 

  const values = React.useMemo(() => ({ email: "", password: "" }), []);

  const autoClear = useCallback(
    <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T, delay = 3000) => {
      setTimeout(() => setter(value), delay);
    }, []
  );

  const myFormik = useFormik({
    initialValues: values,
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(loginUser(values)).unwrap();
        setSuccess(true);
        setError(null);
        myFormik.resetForm();
        autoClear<boolean | null>(setSuccess, false);
        setTimeout(() => {
        router.push("/");
        }, 3000);
      } catch (err:unknown) {
        setSuccess(false);
        if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || "Unauthorized email or password.");
        } else if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unexpected error occurred.");
        }
        autoClear<string | null>(setError, null);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <form noValidate onSubmit={myFormik.handleSubmit}>
      {success && <Alert error={false}>Successful Login.</Alert>}
      {error && <Alert error={true}>{error}</Alert>}

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input
          value={myFormik.values.email}
          onBlur={myFormik.handleBlur}
          name='email'
          onChange={myFormik.handleChange}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      {myFormik.errors.email && myFormik.touched.email && (
        <Alert error={true}>{myFormik.errors.email}</Alert>
      )}

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input
          value={myFormik.values.password}
          onBlur={myFormik.handleBlur}
          name='password'
          onChange={myFormik.handleChange}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      {myFormik.errors.password && myFormik.touched.password && (
        <Alert error={true}>{myFormik.errors.password}</Alert>
      )}

      <button type="submit" className="btn btn-primary" disabled={myFormik.isSubmitting}>
        {myFormik.isSubmitting ? <Loader /> : "Login"}
      </button>

      <div className='text-center w-50 mt-2'>
        Forgot <Link href="/forgotpassword">Password</Link>?
      </div>
      <div className='text-center w-20'>
        Don&apos;t have an account? <Link href="/signup">Register</Link>
      </div>
    </form>
  );
}
