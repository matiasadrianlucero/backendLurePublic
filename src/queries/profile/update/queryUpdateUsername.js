import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export async function queryUpdateUsername(updateUsername,email) {
  try {
    const updateUser = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          username: updateUsername,
        },
      })
    return
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}