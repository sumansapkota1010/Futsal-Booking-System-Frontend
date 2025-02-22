import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/common/Layout"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"




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
    }
  ])

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
