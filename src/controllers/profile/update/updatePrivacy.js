import { queryUpdatePrivacy } from '../../../queries/profile/update/queryUpdatePrivacy.js';

export async function updatePrivacy(req,res){
    try{
        let checkUsername= await queryUpdatePrivacy(req.body.privacySetting,res.locals.tojwt.id)

        res.status(200).send({msg:"Privacy updated."})

        
    } catch($e){
        console.log($e)
    }

}

