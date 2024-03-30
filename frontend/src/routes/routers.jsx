import { createBrowserRouter } from "react-router-dom";
// import Login from "../pages/Login";
// import Home from "../pages/Home";
// import Overview from "../pages/Overview";
// import Reports from "../pages/Reports";
// import Logout from "../pages/Logout";
// import NotFoundPage from "../pages/NotFoundPage";
// // import AuthProvider from "../layout/AuthProvider";
// import Settings from "../pages/Settings";
// import AddQuestion from "../pages/questions/AddQuestion";
// import ShowQuestions from "../pages/questions/ShowQuestions";
// import CreateContest from "../pages/contest/CreateContest";
// import AllContest from "../pages/contest/AllContests";
// import Categories from "../pages/Categories";
import AuthProvider from "../../layout/AuthProvider";

const router = createBrowserRouter([
  {
    path: "login",
    element: <div>login page</div>,
  },
  {
    path: "signup",
    element: <div>signup page</div>,
  },
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <AuthProvider>
            <div>home page</div>
          </AuthProvider>
        ),
      },
      {
        path: "product",
        element: ( <div>product page</div>
          // <AuthProvider>
          //   <ShowQuestions />
          // </AuthProvider>
        ),
      },
      {
        path: "cart",
        element:<div>cart page</div>,
      },
      {
        path: "profile",
        element: <div>profile page</div>,
      },

    ],
  },
  {
    path: "*",
    element: <div> not found page</div>,
  },
]);

export default router;
