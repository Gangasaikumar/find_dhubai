import { createBrowserRouter } from "react-router-dom";
import AuthProvider from "../../layout/AuthProvider";
import Homepage from "../pages/homepage";
import { Login } from "../pages/loginpage";
import { SignUp } from "../pages/signupPage";
import { Product } from "../pages/productpage";
import { CartPage } from "../pages/cartpage";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/",
    children: [
      {
        path: "",
        element:<Homepage />,
      },
      {
        path: "product",
        element: <Product />
          // <AuthProvider>
          //   <ShowQuestions />
          // </AuthProvider>
      },
      {
        path: "cart",
        element:<CartPage />,
      }
    ],
  },
  {
    path: "*",
    element: <div> not found page</div>,
  },
]);

export default router;
