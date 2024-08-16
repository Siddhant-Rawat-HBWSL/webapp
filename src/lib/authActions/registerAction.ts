'use server'
import signUp from "@/auth/register";
import { cookies } from "next/headers";
import AuthError from "@/types/errors/authError";
import { validateCredentials } from "./validateCredentials";

/**
 * Handles the registration of a new user.
 *
 * @param {FormData} formData - The form data containing the user's credentials.
 * @return {Promise<session|error message>} - A promise that resolves with the user's session if registration is successful, or an error message if registration fails.
 */
export async function register(formData: FormData) {
  try {
      // if(!validateCredentials(formData.get('username') as string, formData.get('password') as string)) throw new AuthError('Invalid credentials', 'CredentialsSignin');
      const session = await signUp('credentials', formData);
      if (session && session.token) {
        cookies().set('user', JSON.stringify(session.user), {
          path: '/',
          secure: true,
          httpOnly: true
        });
        cookies().set('token', session.token, {
          path: '/',
          secure: true,
          httpOnly: true
        });
        return session;
      }else{
        throw new AuthError('Invalid credentials', 'CredentialsSignin');
      }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return error.message;
          default:
            return 'Something went wrong.'
        }
      }
      throw error
    }
  }

