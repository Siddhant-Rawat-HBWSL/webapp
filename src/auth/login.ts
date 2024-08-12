'use server'

import prisma from "@/utils/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import generateToken from "@/utils/jwt/generateToken";
import { createSession } from "@/lib/session/manageSession";

/**
 * Handles the login request for a user.
 *
 * @param {NextApiRequest} req - The request object containing the email and password of the user.
 * @param {NextApiResponse} res - The response object to send the result of the login request.
 * @return {Promise<void>} - A promise that resolves when the login request is handled.
 */
// export default async function handler(req : NextApiRequest, res : NextApiResponse) {
//     if(req.method == 'POST'){
//         const {email, password} = req.body;
//         const user = await loginUser(email, password);
//         if (user) {
//             const token = generateToken(user);
//             res.status(200).json({ message: 'User logged in Successfully', user: { id: user.id, username: user.username}, token });
//         } else {
//             res.status(400).json({ message: 'Login failed' });  
//         }
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// }

/**
 * Sign in a user with the provided email and password.
 *
 * @param {unknown} currentState - The current state of the application.
 * @param {FormData} formData - The form data containing the email and password.
 * @return {Promise<{ token: string, user: { id: string, username: string } } | null>} - The signed in user's token and user information, or null if the sign in fails.
 */
export default async function signIn(currentState: unknown, formData: FormData) {
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
 * Attempts to log in a user with the given email and password.
 *
 * @param {string} username - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<User|null>} - A promise that resolves to the user object if login is successful, or null if login fails.
 */
async function loginUser(username : string, password : string) {
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

