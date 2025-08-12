
import {queryCheckEmailExists} from '../../queries/profile/checks/queryCheckEmailExists.js'

import { queryLogin } from '../../queries/landing/queryLogin.js';
export async function loginUser(req,res){
    const password = req.body.loginPassword;
    const email = req.body.loginEmail;

    let validationErrors=[]
    let checkEmail=await queryCheckEmailExists(email)
    let loginResult
    if (checkEmail==true) {
        loginResult =await queryLogin(email,password)

        res.status(200).json(loginResult)
        
    }  else {
        if(checkEmail==false){
            validationErrors.push({validationErrors:validationErrors})
        }
        loginResult=validationErrors
        res.status(200).json([loginResult])
    }
}


