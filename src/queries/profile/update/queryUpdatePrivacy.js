import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export async function queryUpdatePrivacy(currentPrivacySetting,myId) {
  try {
    const updateUser = await prisma.user.update({
        where: {
          id: myId,
        },
        data: {
          private: !currentPrivacySetting,
        },
      })
      return
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}