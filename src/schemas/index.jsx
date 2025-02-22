import * as Yup from "yup"


export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password"),
    phoneNumber: Yup.number().min(10).required("Please enter your phone number")
})