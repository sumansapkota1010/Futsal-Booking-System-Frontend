import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/common/Layout"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"

import LoginPage from "./pages/LoginPage"
import BookingPage from "./pages/Bookingpage"
import CheckoutPage from "./pages/CheckOutPage"
import PaymentSuccess from "./pages/PaymentSuccess"
import ProtectedRoute from "./pages/ProtectedRoute"
import AdminPanel from "./pages/Admin/AdminDashboard/AdminPanel"
import UpdateGround from "./pages/Admin/AdminDashboard/admin-ground/UpdateGround"
import ForgotPassword from "./pages/ForgotPassword"




function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "", element: <HomePage /> }]
    },
    {
      path: "/register",
      element: <SignUpPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />
    },
    {
      path: "/bookings",
      element: <BookingPage />
    },
    {
      path: "/checkout",
      element: <CheckoutPage />
    },
    {
      path: "/payment-success",
      element: <PaymentSuccess />
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/:id",
      element: (
        <ProtectedRoute>
          <UpdateGround />
        </ProtectedRoute>
      )
    }
  ])

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
