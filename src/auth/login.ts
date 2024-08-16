'use server'

import prisma from "@/utils/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import generateToken from "@/utils/jwt/generateToken";
import { createSession } from "@/lib/session/manageSession";
import { User } from "@prisma/client";

/**
 * Sign in a user with the provided email and password.
 */
export default async function signIn(currentState: unknown, formData: FormData)
: Promise<{ token: string, user: { id: number, username: string, email: string } } | null | undefined> {
    try {
        const user = await loginUser(formData.get('username') as string, formData.get('password') as string);
        if (user) {
            const token = generateToken(user);
            if(token && typeof token === 'string') {
                const session = await createSession(user, token);
                return {
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                };
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Attempts to log in a user with the given email and password.
 */
async function loginUser(username : string, password : string) : Promise<User | null> {
    try{
        const user = await prisma.user.findUnique({
            where: {
                username
            },
            include: {
                password: true
            }
        });

        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password.HashedPassword);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    } catch(error) {
        console.error(error);
        return null;
    }
}

