'use server'
 
import { cookies } from "next/headers"
import signIn from "@/auth/login"
import AuthError from "@/types/errors/authError"
 
export async function authenticate(formData: FormData) {
  try {
    const session =await signIn('credentials', formData)
    if (session && session.token) {
      cookies().set('user', JSON.stringify(session), {
        path: '/',
        secure: true,
        httpOnly: true
      });
      cookies().set('token', session.token, {
        path: '/',
        secure: true,
        httpOnly: true
      });
      console.log('user successfully logged in');
      console.log(cookies().getAll());
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