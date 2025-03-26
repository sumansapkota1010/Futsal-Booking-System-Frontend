import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../redux/slice/profile'
import accessDenied from '../assets/court/access-denied-stamp-png.png'
import { useNavigate } from 'react-router-dom'


const ProtectedRoute = ({ children, requiredRole }) => {

    const dispatch = useDispatch()
    const { profile, isLoading, error } = useSelector((state) => state.profile)
    console.log("🚀 ~ ProtectedRoute ~ profile:", profile.role)

    const navigate = useNavigate()



    useEffect(() => {

        dispatch(fetchProfile())


    }, [dispatch])

    useEffect(() => {
        if (error) {
            navigate("/login"); // Redirect to login page
        }
    }, [error, navigate]);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    const hasAccess = profile?.role === requiredRole;
    console.log(hasAccess)
    return (
        hasAccess ? children : (
            <div className="flex items-center justify-center h-screen overflow-hidden">
                <div className="h-full w-full">
                    <img
                        className="h-full w-full object-cover animate-fadeIn"
                        src={accessDenied}
                        alt="Access Denied" />
                </div>
            </div>
        )
    )
}

export default ProtectedRoute