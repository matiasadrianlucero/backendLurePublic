import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryRetrieveFollowers(userToQuery) {
    try {
        const findResults = await prisma.followRequest.findMany({
            where: {
                response: 'accepted',
                sentToId: userToQuery
              },
            include:{
              sendingRelation: {
                select:{
                  id:true,
                  username:true,
                  profilePic:true,

                }
              }
            ,}
        });
        return findResults
        
      } catch (error) {
        console.error('Error finding users:', error);
        throw error;
      }
}
