import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import PersonalDetails from "./components/PersonalDetails";
import GetYourVideo from "./components/Features/GetYourVideo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path:'/details',
    element: <PersonalDetails></PersonalDetails>
  },
  {
    path:'/get-your-video',
    element: <GetYourVideo></GetYourVideo>
  }
]);



function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
