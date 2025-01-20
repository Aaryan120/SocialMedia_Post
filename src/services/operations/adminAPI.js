import { setToken } from "../../slices/user";
import { apiconnector } from "../apiconnector";
import { adminEndpoints } from "../apis";
import toast from "react-hot-toast";

const {
    ADMIN_DASHBOARD_API,
    ADMIN_LOGIN_API,
} = adminEndpoints

export const login = async (data,navigate,dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
        // console.log("PRINTING LOGIN DATA",data);
        const response = await apiconnector("POST",ADMIN_LOGIN_API,data);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("printing login response",response);
        toast.success("Logged In");
        localStorage.setItem("token",JSON.stringify(response.data.token));
        dispatch(setToken(response.data.token));
        navigate("/adminDashboard")
    } catch (error) {
        console.log("ADMIN LOGIN API ERROR",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}
export const logOut = async (dispatch,navigate) =>{
    localStorage.removeItem("token");
    dispatch(setToken(null));
    toast.success("Logged Out")
    navigate("/")
}
export const getUserDetails = async (token) =>{
    console.log("CALLING USER DETAILS FETCHER");
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("GET",ADMIN_DASHBOARD_API,null,{
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("PRINTING RESULT DATA",response);
        toast.success("All user details fetched successfully");
        result = response.data;
    } catch (error) {
        console.log("GET USER DETAILS API ERROR",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}