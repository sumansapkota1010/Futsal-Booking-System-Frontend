import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/common/Layout"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"

import LoginPage from "./pages/LoginPage"
import BookingPage from "./pages/Bookingpage"
import CheckoutPage from "./pages/CheckOutPage"
import PaymentSuccess from "./pages/PaymentSuccess"




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
    }
  ])

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
