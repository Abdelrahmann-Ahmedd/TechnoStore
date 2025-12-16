import * as Yup from "yup";


export const loginSchema = Yup.object({
    email: Yup.string()
    .email("Invalid Email Address.")
    .required("Email is Required."),
    password: Yup.string()
    .min(6,"Password must be at least 6 characters.")
    .required("Password is Required."),
})

export const AddProductSchema = Yup.object({
    id: Yup.number().required("Id is Required.") ,
    title: Yup.string()
    .required("Title is Required")
    .min(10,"title must be at least 10 characters."),
    price: Yup.number()
    .required("price is Required"),
    describtion: Yup.string()
    .min(24,"Description must be at least 24 characters.")
    .required("Description is Required."),
    category: Yup.string()
    .required("Category is Required."),
    image: Yup.string()
    .required("image url is Required.")
    .url("enter a valid URL."),
})

export const registerSchema = Yup.object({
    name: Yup.string()
    .min(3,"Name must be at least 3 characters.")
    .max(12,"Name must be at most 12 characters.")
    .required("Name is Required"),
    email: Yup.string()
    .email("Invalid Email Address.")
    .required("Email is Required."),
    password: Yup.string()
    .min(6,"Password must be at least 6 characters.")
    .required("Password is Required."),
    rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
    phone: Yup.string()
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number")
    .required("Phone is required"),
})

export const forgetPasswordSchema = Yup.object({
    email: Yup.string()
    .email("Invalid Email Address.")
    .required("Email is Required."),
    })