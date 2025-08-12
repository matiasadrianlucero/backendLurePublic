import { queryUpdateBio } from '../../../queries/profile/update/queryUpdateBio.js';

export async function updateBio(req,res){
    try{        
        await queryUpdateBio(req.body.bio,res.locals.tojwt.id,res.locals.tojwt.email);
        return res.status(200).send({result:"success",updatedData:req.body.bio,msg:[{msg:"Bio Updated!"}]})

    }catch(err){
        return res.status(200).send({err:err})
    }
} 