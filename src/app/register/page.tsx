'use server'
import React from 'react';
import { register } from '@/lib/authActions/registerAction';
import recaptchaKey from '@/utils/recaptcha/recaptchaKey';

async function page() {

  const handleRegister = async (formData: FormData) => {
    const result = await register(formData);
    if(typeof result === 'object' && 'token' in result){
      // sessionStorage.setItem('user', JSON.stringify(result.user));
      // sessionStorage.setItem('token', JSON.stringify(result.token));
      document.cookie = `user=${encodeURIComponent(JSON.stringify(result.user))}; path=/;`;
      document.cookie = `token=${result.token}; path=/;`;
      window.location.href = '/';
    }else {
      console.warn(result);
    } 
  }
  return (
    <div>
      <h1>Register Page</h1>
      <form className='flex flex-col gap-2 items-center justify-center py-10' action={register}>
        <input className='border border-gray-200 px-2 py-3' type="email" name="email" placeholder="Email" />
        <input className='border border-gray-200 px-2 py-3' type="text" name="username" placeholder="Username" />
        <input className='border border-gray-200 px-2 py-3' type="password" name="password" placeholder="Password" />
        {recaptchaKey && <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default page