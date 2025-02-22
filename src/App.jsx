import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/common/Layout"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"

import LoginPage from "./pages/LoginPage"




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
    }
  ])

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
