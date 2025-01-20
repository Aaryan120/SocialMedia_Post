import { apiconnector } from "../apiconnector"
import { userEndpoints } from "../apis"
import toast from "react-hot-toast"

export const addImages = async (data) =>{
    try {
        console.log("PRINTING DATA",data);
        const response = await apiconnector("POST",userEndpoints.USER_SUBMISSION_API,data,{
            "Content-Type": "multipart/form-data",
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("PRINTING ADD IMAGES RESPONSE",response);
        toast.success("All details posted");
    } catch (error) {
        console.log("ADD IMAGES API ERROR",error);
        toast.error(error.response.data.message)
    }
}