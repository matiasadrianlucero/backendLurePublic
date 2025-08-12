import { PrismaClient } from '@prisma/client';
import { queryCheckIfFollowing } from './checks/queryCheckIfFollowing.js';
const prisma = new PrismaClient()

export async function queryRetrieveGallery(lastDate,username, myId, myUsername) {
  async function queryProfile(){
    const findResults = await prisma.post.findMany({
      where: {
        user:{
          is: {
            username: username
          }
        },
        img:{
            not:""
        },
        dateOfCreation: {
          lt: lastDate==0 ? new Date() : new Date(lastDate)
        }
      },
      orderBy: {
          dateOfCreation: 'desc',
      },
      take:15,
      include: {
        user: {
          select: {
            username: true,
            profilePic: true
          }
        },               
        LikesRel: {
          where:{
            userId: myId
          },
          select: {
            state: true,
          }
        },
        Favourites: {
          where:{
            userId: myId
          },
          select: {
            state: true,
          }
        },
        postedIn:{
          select:{
            response:true,
            commentRelation:{
              select:{
                username:true,
                profilePic:true
              }
            }
          },
          take: 3,
        }
      }
    });
    return findResults
  }
    try {
      if(myUsername==username){
        return await queryProfile()
      }
      const userPrivacy = await prisma.user.findUnique({
        where: {
              username: username
        },
        select:{
          private:true,
          id:true
        }
        
      });
      if(userPrivacy.private){
        let followingCheck= await queryCheckIfFollowing(myId,userPrivacy.id)
        if(followingCheck=="accepted") {
          return await queryProfile()
        } 
        return {error: "private profile"}
      } else {
        return await queryProfile()
      }

      } catch (error) {
        console.error('Error finding users:', error);
        throw error;
      }
}
