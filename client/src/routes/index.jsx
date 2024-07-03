import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CheckPasswordPage from "../pages/CheckPasswordPage"
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgotPassword";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";



const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "register",
                element : <AuthLayouts><RegisterPage/></AuthLayouts>
            },
            {
                path : "login",
                element : <AuthLayouts><CheckEmailPage/></AuthLayouts>
            },
            {
                path : "password",
                element : <AuthLayouts><CheckPasswordPage/></AuthLayouts>
            },
            {
                path : "forgot-password",
                element : <AuthLayouts><ForgotPassword/></AuthLayouts>
            },
            {
                path : "",
                element : <Home/>,
                children : [
                    {
                        path : ':userId',
                        element : <MessagePage/>                        
                    }
                ]
            }
        ]
    }
])

export default router
