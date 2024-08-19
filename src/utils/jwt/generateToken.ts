import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";


/**
 * Generates a JSON Web Token (JWT) for the given user.
 *
 * @param {User} user - The user object for which the token is generated.
 * @return {Promise<string>} - A promise that resolves to the generated JWT string.
 * @throws {Error} - If the JWT_SECRET environment variable is not defined.
 */
export default function generateToken(user: User) {
    try{
        const secret = process.env.JWT_SECRET;
        if(!secret){
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '24h' });
    }catch(error){
        console.error(error);
    }
}