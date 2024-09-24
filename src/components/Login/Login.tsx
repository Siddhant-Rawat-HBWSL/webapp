'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import recaptchaKey from '@/utils/recaptcha/recaptchaKey';
import Button from '../Button/Button';
import Link from 'next/link';

type Prop = {
  handleLogIn: (formData: FormData) => Promise<void>
};

function Login({handleLogIn}: Prop) {
  const router = useRouter();
  
  const registerRedirect = () => {
    router.push("/register");
  }

  return (
    <div className='text-center mt-36 mx-auto px-14 w-150'>
      <div>
        <h1 className='text-2xl font-semibold text-secondary-2 mb-1.5'>Login</h1>
        <p className='text-sm font-normal text-primary-5'>If you have an account, sign in with your email address</p>
      </div>

      <form className='flex flex-col gap-2 items-center justify-center pt-10 pb-3 w-full' action={handleLogIn}>
        <label className='w-full text-left text-primary-7 text-sm font-medium' htmlFor="username">Email Address</label>
        <input className='border border-gray-200 px-2 py-3 w-full text-primary-6 outline-none' type="text" name="username" placeholder="Email" required />

        <label className='w-full text-left text-primary-7 text-sm font-medium' htmlFor="password">Password</label>
        <input className='border border-gray-200 px-2 py-3 w-full outline-none' type="password" name="password" placeholder="Password" required />
        {recaptchaKey && <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>}

        <Link href="/forgot-password" className='w-full text-end'>
          <p className='text-primary-5 underline text-sm font-normal'>Forget Password?</p>
        </Link>
        <Button
          text="Login"
          variant="primary"
          styles="text-base font-semibold w-full mt-6"
        />
      </form>

      <Button
        text="Create an Account"
        variant="secondary"
        styles="text-base font-semibold w-full"
        onClick={registerRedirect}
      />
    </div>
  )
}

export default Login