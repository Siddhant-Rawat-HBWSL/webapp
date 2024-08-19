'use client'
import { authenticate } from '@/lib/authActions/loginAction'
import recaptchaKey from '@/utils/recaptcha/recaptchaKey';
 
export default async function Page() {

  const handleLogIn = async (formData: FormData) => {
    const result = await authenticate(formData);
    if(typeof result === 'object' && 'token' in result){
      document.cookie = `user=${encodeURIComponent(JSON.stringify(result.user))}; path=/;`;
      document.cookie = `token=${result.token}; path=/;`;
      window.location.href = '/';
    }else {
      console.warn(result);
    } 
  }
   
  return (
    <form className='flex flex-col gap-2 items-center justify-center py-10' action={handleLogIn}>
      <input className='border border-gray-200 px-2 py-3' type="text" name="username" placeholder="Username" />
      <input className='border border-gray-200 px-2 py-3' type="password" name="password" placeholder="Password" required />
      {recaptchaKey && <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>}
      <button type="submit">Login</button>
    </form>
  )
}