
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from "./routes/routers";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "../src/store/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <CookiesProvider>
        <RouterProvider router={router} />
  </CookiesProvider>
  </Provider>
)
