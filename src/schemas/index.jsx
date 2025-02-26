import * as Yup from "yup"


export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password"),
    phoneNumber: Yup.number().min(10).required("Please enter your phone number")
})

export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password")
})





export const groundSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    pricePerHour: Yup.number().required("Price per hour is required").positive().integer(),
    capacity: Yup.number().required("Capacity is required").positive().integer(),
    size: Yup.string().required("Size is required"),
    operatingHours: Yup.string().required("Operating Hours is required")
})

export const slotSchema = Yup.object({
    ground: Yup.string().required("Ground ID is required"),
    startTime: Yup.string().required("Start Time is required"),
    endTime: Yup.string().required("End time is required"),
    price: Yup.number().required("Please provide price ")
})

