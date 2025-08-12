import { queryRetrieveFollowList } from '../../queries/profile/queryRetrieveFollowList.js';
export async function retrieveUserFollowing(req,res){
    try{
        let results = await queryRetrieveFollowList(res.locals.tojwt.id)
        console.log("resultsList", results)
        res.status(200).json(results);  
    } catch(e){
        console.log(e)
    }

}