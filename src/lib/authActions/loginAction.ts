'use server'
 
import { cookies } from "next/headers"
import signIn from "@/auth/login"
import AuthError from "@/types/errors/authError"
import { validateCredentials } from "./validateCredentials"
import { sendMail } from "@/utils/smtp/mailer"
import Email from "@/types/email/email"
 
export async function authenticate(formData: FormData) {
  try {
    // if(!validateCredentials(formData.get('username') as string, formData.get('password') as string)) throw new AuthError('Invalid credentials', 'CredentialsSignin');
    const session =await signIn('credentials', formData)
    if (session && session.token) {
      cookies().set('user', JSON.stringify(session), {
        path: '/',
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
      });
      cookies().set('token', session.token, {
        path: '/',
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
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
          return 'Something went wrong.';
      }
    }
    throw error
  }
}
