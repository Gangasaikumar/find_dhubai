import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "login",
    element:  <div>login page</div>,
  },
  {
    path: "/",
    element: <div>home page</div>
  },
  {
    path: "*",
    element: <div>not found page</div>,
  },
]);

export default router;
