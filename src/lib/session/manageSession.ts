import { User } from "@prisma/client";
import prisma from "@/utils/prisma/prisma";

export default async function authenticateSession(sessionData: string): Promise<boolean> {
    const { user, token } = JSON.parse(sessionData);

    const currentSession = await prisma.session.findFirst({
        where: {
            AND: [
                { user: user },
                { token: token }
            ]
        }
    });

    return !!currentSession;
}

export async function createSession(user: User, token: string) {
    const session = await prisma.session.findFirst({
        where:{
            userId: user.id
        }
    });

    if(session) {
        return prisma.session.update({
            where: {    
                userId: user.id
            },
            data: {
                token: token
            }
        });
    }
    return prisma.session.create({
        data: {
            userId: user.id,
            token: token
        }
    });
}

export function deleteSession(user: User) {
    return prisma.session.delete({
        where: {
            userId: user.id
        }
    });
}