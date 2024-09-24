'use client'
import Login from '@/components/Login/Login';
import { authenticate } from '@/lib/authActions/loginAction'
 
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
    <Login handleLogIn={handleLogIn} />
  )
}