import { queryUpdateAvatar } from '../../../queries/profile/update/queryUpdateAvatar.js';

export async function updateAvatar(req,res){
    try{
        queryUpdateAvatar(req.filenames[0],res.locals.tojwt.email)
            
        return res.status(200).send({msg:[{msg:"Avatar Updated! Reloading..."}],result:"success",updatedData:req.filenames[0]})

    } catch (err){
        console.log(err)
    }

}