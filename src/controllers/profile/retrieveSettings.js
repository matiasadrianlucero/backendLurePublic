import { queryRetrieveSettings } from '../../queries/profile/queryRetrieveSettings.js';
export async function retrieveSettings(req,res){
    
    let lastDate=req.headers['lastdate']
    try{
        let postsList = await queryRetrieveSettings(res.locals.tojwt.id);
        
        res.status(200).send(postsList)
    } catch(e){
        console.log(e)
    }

}