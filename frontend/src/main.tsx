import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";
import router from "./routes/routers";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <CookiesProvider>
  <RouterProvider router={router} />
</CookiesProvider>
)
