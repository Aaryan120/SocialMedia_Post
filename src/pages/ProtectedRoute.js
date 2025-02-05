import react from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) =>{
    const {token} = useSelector((state) =>state.auth);

    if (token !== null){
        return children;
    }
    else{
        return <Navigate to={"/adminLogin"} />;
    }
}
export default ProtectedRoute;