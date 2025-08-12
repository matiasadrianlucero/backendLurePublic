import {queryCheckEmailExists} from '../../../queries/profile/checks/queryCheckEmailExists.js'
import { queryUpdateEmail } from '../../../queries/profile/update/queryUpdateEmail.js';

export async function updateEmail(req,res){
    try{
        let checkEmail= await queryCheckEmailExists(req.body.updateEmail)

        if(checkEmail==false){
            queryUpdateEmail(req.body.updateEmail,res.locals.tojwt.email)
            return res.status(200).send({result:"success",updatedData:res.locals.tojwt.email,msg:"Email updated!"})
    
        } else {
            if(!validationErrors.isEmpty()){
                return res.status(200).send({msg:"Invalid email"})
            } else {
                return res.status(200).send({msg:"Email is occupied"})
            }
        }        
    } catch($e){
        console.log($e)
    }

        
}

