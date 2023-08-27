import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";

import "react-toastify/dist/ReactToastify.css";

function App() {
  // console.log(import.meta.env.VITE_URL_DB);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
