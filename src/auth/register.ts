import prisma from "@/utils/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import generateToken from "@/utils/jwt/generateToken";
import { createSession } from "@/lib/session/manageSession";

/**
 * Registers a new user with the provided form data.
 */
export default async function signUp(
  currentState: unknown,
  formData: FormData
): Promise<{ token: string, user: { id: number, username: string } } | null | undefined> {
    console.log(formData);
    try {
        const user = await registerUser(formData.get('email') as string, formData.get('username') as string, formData.get('password') as string);
        if (user) {
            const token = generateToken(user);
            if(token && typeof token === 'string') {
                const session = await createSession(user, token);
                return {
                    token,
                    user: {
                        id: user.id,
                        username: user.username
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
 * Registers a new user with the given email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<User|null>} - A promise that resolves to the created user object if successful, or null if an error occurs.
 */
async function registerUser(email : string, username : string, password : string) {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: {
                    create: {
                        HashedPassword: hashedPassword  
                    }
                }
            }
        })
        return user
    } catch(error) {
        console.error(error);
        return null;
    }
}
