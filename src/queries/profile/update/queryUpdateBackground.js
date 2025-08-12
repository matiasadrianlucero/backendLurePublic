import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export async function queryUpdateBackground(pic,jwtEmail) {
  try {
    const updateUser = await prisma.user.update({
        where: {
            email: jwtEmail,
        },
        data: {
            backgroundPic: pic,
        },
      })
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}