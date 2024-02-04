import {asyncHandller} from "../utils/asynchandller.js" 

const registerUser = asyncHandller(async (req, res)=>{
    res.status(200).json({
        message: "OK"
    })
})

export {registerUser}